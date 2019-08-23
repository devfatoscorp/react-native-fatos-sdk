//
//  FatoseSettingManager.h
//  FatosRNApp
//
//  Created by 심규빈 on 05/08/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef FatoseSettingManager_h
#define FatoseSettingManager_h

#import <Foundation/Foundation.h>

@interface FatoseSettingManager : NSObject {
  
}

+ (instancetype)sharedObject;

- (bool)getSDIEnable:(int)index;
- (void)setSDIEnable:(int)index val:(bool)val;
- (bool)getAndoService:(int)index;
- (void)setAndoService:(int)index val:(bool)val;
- (int)getSDIType:(int)index;
- (void)setSDIType:(int)index val:(int)val;
- (int)getRouteOption:(int)index;
- (const char*)getFeeOption:(int)index;
- (void)setFeeOption:(int)index val:(const char*)val;

- (void)updateSDIInfo;

@end

#endif /* FatoseSettingManager_h */
