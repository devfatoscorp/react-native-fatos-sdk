//
//  FatosRootView.h
//  FatosRNApp
//
//  Created by 심규빈 on 27/03/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef FatosRootView_h
#define FatosRootView_h

#import <React/Base/RCTRootView.h>

@class GPSService;

@interface FatosRootView : RCTRootView {
  
}

@property (nonatomic, strong) GPSService *gpsService;

@end

#endif /* FatosRootView_h */