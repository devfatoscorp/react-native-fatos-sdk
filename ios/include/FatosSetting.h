//
//  FatosSetting.h
//  Fatos
//
//  Created by 심규빈 on 2020/02/07.
//  Copyright © 2020 유춘성. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface FatosSetting : NSObject

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

NS_ASSUME_NONNULL_END
