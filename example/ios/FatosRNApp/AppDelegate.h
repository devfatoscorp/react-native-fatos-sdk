/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>
#import <FatosNaviModule.h>

@class FatosMapViewBridgeModule;
@class FatosNaviBridgeModule;
@class FatosWebViewManager;

@interface AppDelegate : UIResponder <UIApplicationDelegate, FatosNaviModuleDelegate> {
  
}

@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, retain) FatosWebViewManager *webViewManager;
@property (nonatomic, retain) FatosNaviModule *fatosNaviModule;
@property (nonatomic, retain) FatosMapViewBridgeModule *fatosMapViewBridgeModule;
@property (nonatomic, retain) FatosNaviBridgeModule *fatosNaviBridgeModule;
@property (nonatomic, retain) UIViewController *rootViewController;

+ (AppDelegate *)sharedAppDelegate;

@end
