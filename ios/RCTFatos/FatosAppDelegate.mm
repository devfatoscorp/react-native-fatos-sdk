/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "FatosAppDelegate.h"
#import <React/Base/RCTBundleURLProvider.h>
#import <React/Base/RCTRootView.h>
#import "FatosSDK/FatosRootView.h"
#import <FatosUtil.h>
#import <FatosEnvironment.h>
#import <CoreTelephony/CTCallCenter.h>
#import <CoreTelephony/CTCall.h>
#import <FatosMapView.h>
#import <CoreLocation/CoreLocation.h>
#import "FatosNaviBridgeModule.h"
#import "FatosEnvBridgeModule.h"
#import <FatosNaviModule.h>
#import <GPSService.h>


@interface FatosAppDelegate ()<FatosNaviModuleDelegate>
@end

@implementation FatosAppDelegate

+ (FatosAppDelegate*)sharedAppDelegate
{
  return (FatosAppDelegate*)[[UIApplication sharedApplication] delegate];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.webViewManager = nil;
  self.fatosMapViewBridgeModule = nil;
  self.fatosNaviBridgeModule = nil;
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  _rootViewController = [UIViewController new];
  self.window.rootViewController = _rootViewController;
  [self.window makeKeyAndVisible];
  
  [FatosEnvironment sharedObject];
  
  self.fatosNaviModule = [[FatosNaviModule alloc] initNaviModule:[[[NSBundle mainBundle] infoDictionary] valueForKey:@"sdk_key"]];
  self.fatosNaviModule.delegate = self;
  
  [self.fatosNaviModule InitFolder];
  [self.fatosNaviModule InitServiceURL];
  [self.fatosNaviModule InitResource];
  [self.fatosNaviModule InitNavi];
    
  [FatosEnvBridgeModule setEnvironmentSDIInfo];
  
  NSURL *jsCodeLocation;
  
#if TARGET_IPHONE_SIMULATOR
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
  
  _rootView = [[FatosRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"FatosHi"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  
  
  _rootView.backgroundColor = [UIColor colorWithPatternImage:[self getLaunchScreen]];
  _rootViewController.view = _rootView;
  
  [FatosUtil setKeepScreenOn:YES];
  
//  CTCallCenter *gclsCallCenter = [[CTCallCenter alloc] init];
//  gclsCallCenter.callEventHandler=^(CTCall* call){
//
//    if ( call.callState == CTCallStateIncoming ) { //전화가 걸려옴.
//      NSLog(@"CTCallStateIncoming");
//    }
//
//    if ( call.callState == CTCallStateDialing ) {
//      NSLog(@"CTCallStateDialing");
//    }
//    if ( call.callState == CTCallStateConnected ) { //통화중
//      NSLog(@"CTCallStateConnected");
//    }
//
//    if ( call.callState == CTCallStateDisconnected ) { //전화가 끊어짐.
//      NSLog(@"CTCallStateDisconnected");
//    }
//  };
  return YES;
}

- (UIImage *) getLaunchScreen
{
  UIImageView *view = [[UIImageView alloc] initWithFrame:[[UIScreen mainScreen] bounds]];

  UIColor *color = [UIColor colorWithRed:44.0f/255.0f green:187.0f/255.0f blue:182.0f/255.0f alpha:1.0f];
  view.backgroundColor = color;

  view.image = [UIImage imageNamed:@"hi_splash.png"];
  [view setContentMode:UIViewContentModeScaleAspectFit];
 
  UIGraphicsBeginImageContextWithOptions(view.bounds.size, view.opaque, 0.0);
  [view.layer renderInContext:UIGraphicsGetCurrentContext()];
  
  UIImage *img = UIGraphicsGetImageFromCurrentImageContext();
  
  UIGraphicsEndImageContext();
  
  return img;
}

- (void) checkLocationStatus
{
  CLAuthorizationStatus status = [CLLocationManager authorizationStatus];
  
  if(status == kCLAuthorizationStatusDenied)
  {
    NSString *strTitle = NSLocalizedString(@"location_status_denied_title", @"");
    NSString *strMessage = NSLocalizedString(@"location_status_denied_message", @"");
    NSString *strOk = NSLocalizedString(@"location_status_denied_ok", @"");
    
    UIAlertController * alert = [UIAlertController
                                 alertControllerWithTitle:strTitle
                                 message:strMessage
                                 preferredStyle:UIAlertControllerStyleAlert];
    
    UIAlertAction *ok = [UIAlertAction actionWithTitle:strOk style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
      
      [alert dismissViewControllerAnimated:YES completion:nil];
      
      
      [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]];
    }];
    
    [alert addAction:ok];
    [_rootViewController presentViewController:alert animated:YES completion:nil];
  }
}

- (void)applicationWillResignActive:(UIApplication *)application {
  
  FatosMapView *mapview = [FatosMapView sharedMapView];
  
  if(mapview != nil)
  {
    mapview.isRender = NO;
  }
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  
  FatosMapView *mapview = [FatosMapView sharedMapView];
  
  if(mapview != nil)
  {
    mapview.isRender = YES;
  }
  
  [self checkLocationStatus];
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
  
  FatosMapView *mapview = [FatosMapView sharedMapView];
  
  if(mapview != nil)
  {
    mapview.isRender = NO;
  }
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
  
  FatosMapView *mapview = [FatosMapView sharedMapView];
  
  if(mapview != nil)
  {
    mapview.isRender = YES;
  }
  
  
  [self checkLocationStatus];
}

- (void)applicationWillTerminate:(UIApplication *)application {
 
  
  [self.fatosNaviModule ReleaseNavi];

  [[_rootView gpsService] saveUserDefaultsLocation];
}

- (void)applicationDidReceiveMemoryWarning:(UIApplication *)application {
  
  NSLog(@"applicationDidReceiveMemoryWarning");
}

#pragma mark - FatosNaviModuleDelegate

- (void) onUpdateRG:(NSString *)rgJson
{
  FatosNaviBridgeModule *module = self.fatosNaviBridgeModule;
  
  if(module != nil)
  {
    [module UpdateRGListener:rgJson];
  }
}

- (void) onRouteStart:(int)nType
{
  FatosNaviBridgeModule *module = self.fatosNaviBridgeModule;
  
  if(module != nil)
  {
    switch (nType) {
      case 0:
        [module ShowIndicatorListener];
        break;
      case 1:
        [module ShowIndicatorListener];
        break;
      case 2:
        break;
      default:
        break;
    }
  }
}

- (void) onRouteResult:(int)nType
{
  FatosNaviBridgeModule *module = self.fatosNaviBridgeModule;
  
  if(module != nil)
  {
    [module HideIndicatorListener];
    [module RouteResultListener:nType];
  }
}

- (void) onRouteCancel
{
  
}

- (void) onRouteComplete
{
  
}

- (void) onRouteViaComplete
{
  
}

- (BOOL) isIndicator
{
  FatosNaviBridgeModule *module = self.fatosNaviBridgeModule;
  
  if(module != nil)
  {
    return [module IsIndicator];
  }
  
  return NO;
}

@end
