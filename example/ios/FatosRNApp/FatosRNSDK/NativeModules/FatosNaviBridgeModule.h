//
//  FatosRouteModule.h
//  FatosRNApp
//
//  Created by 심규빈 on 17/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef FatosRouteModule_h
#define FatosRouteModule_h

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTLog.h>

@interface FatosNaviBridgeModule : RCTEventEmitter <RCTBridgeModule> {
  BOOL isListener;
  BOOL isIndicator;
}

- (void) UpdateRGListener:(NSString *)strJson;
- (void) RouteResultListener:(int)nTypeRoute;
- (void) ShowIndicatorListener;
- (void) HideIndicatorListener;
- (BOOL) IsIndicator;
- (void) SearchResultListener:(const char *)strResult;

@end


#endif /* FatosRouteModule_h */
