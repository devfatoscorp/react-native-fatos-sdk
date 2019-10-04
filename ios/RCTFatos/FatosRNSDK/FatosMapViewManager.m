//
//  FatosMapViewManager.m
//  FatosRNApp
//
//  Created by 유춘성 on 13/03/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//
#import "FatosMapViewManager.h"
#import "FatosAppDelegate.h"
#import <UIKit/UIKit.h>
#import "FatosMapViewBridgeModule.h"

@implementation FatosMapViewManager

RCT_EXPORT_MODULE(FatosMapView);

- (UIView *)view
{
  fatosMapView = [[FatosMapView alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
  fatosMapView.delegate = self;
  
  return fatosMapView;
}

- (void) MapLevelUpdateListener:(int)nLevel
{
  FatosMapViewBridgeModule *module = [FatosAppDelegate sharedAppDelegate].fatosMapViewBridgeModule;
  
  if(module)
  {
    [module MapLevelUpdateListener:nLevel];
  }
}

- (void) PosWorldLocationUpdateListener:(NSString *)strLocation
{
  FatosMapViewBridgeModule *module = [FatosAppDelegate sharedAppDelegate].fatosMapViewBridgeModule;
  
  if(module)
  {
    [module PosWorldLocationUpdateListener:strLocation];
  }
}

- (void) TouchMoveModeListener:(int)nMode
{
  FatosMapViewBridgeModule *module = [FatosAppDelegate sharedAppDelegate].fatosMapViewBridgeModule;
  
  if(module)
  {
    [module TouchMoveModeListener:nMode];
  }
}

- (void) MapLongTouchListener:(int)x y:(int)y
{
    FatosMapViewBridgeModule *module = [FatosAppDelegate sharedAppDelegate].fatosMapViewBridgeModule;
    
    if(module)
    {
      [module MapLongTouchListener:x y:y];
    }
}

@end
