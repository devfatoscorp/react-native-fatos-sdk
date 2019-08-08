//
//  FatosMapViewManager.h
//  FatosRNApp
//
//  Created by 유춘성 on 13/03/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <React/Views/RCTViewManager.h>
//#import <React/RCTBridgeModule.h>
//#import <React/RCTEventEmitter.h>
//#import <React/RCTEventDispatcher.h>
#import <React/RCTLog.h>
#import <FatosMapView.h>

NS_ASSUME_NONNULL_BEGIN

@interface FatosMapViewManager : RCTViewManager <FatosMapViewDelegate> {
  FatosMapView *fatosMapView;
}

@end

NS_ASSUME_NONNULL_END
