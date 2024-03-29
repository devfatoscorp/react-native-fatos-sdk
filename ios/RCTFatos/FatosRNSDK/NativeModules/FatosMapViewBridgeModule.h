//
//  FatosMapViewModule.h
//  FatosRNApp
//
//  Created by 심규빈 on 16/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef FatosMapViewModule_h
#define FatosMapViewModule_h

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTLog.h>

@interface FatosMapViewBridgeModule : RCTEventEmitter <RCTBridgeModule> {
  BOOL isListener;
}

- (void) MapLevelUpdateListener:(int)nLevel;
- (void) PosWorldLocationUpdateListener:(NSString *)strLocation;
- (void) TouchMoveModeListener:(int)nMode;
- (void) MapLongTouchListener:(int)x y:(int)y;
- (void) UpdatePickerInfo:(NSString *)strID nLong:(int)nLong nLat:(int)nLat;
- (void) MapReadyListener;

@end

#endif /* FatosMapViewModule_h */
