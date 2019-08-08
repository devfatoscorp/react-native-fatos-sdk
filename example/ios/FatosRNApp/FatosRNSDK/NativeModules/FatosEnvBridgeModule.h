//
//  FatosEnvBridgeModule.h
//  FatosRNApp
//
//  Created by 심규빈 on 25/06/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef FatosEnvBridgeModule_h
#define FatosEnvBridgeModule_h

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTLog.h>

@interface FatosEnvBridgeModule : RCTEventEmitter <RCTBridgeModule> 
+ (void) setEnvironmentSDIInfo;
+ (void) updateSDIInfo;
+ (void) UseGuideDB:(int)val;
+ (void) setRouteAutoTime:(int)val;
@end

#endif /* FatosEnvBridgeModule_h */
