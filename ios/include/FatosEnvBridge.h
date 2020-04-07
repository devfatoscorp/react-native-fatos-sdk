//
//  FatosEnvBridge.h
//  Fatos
//
//  Created by 심규빈 on 2020/02/06.
//  Copyright © 2020 유춘성. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface FatosEnvBridge : NSObject

+ (void) SetLanguage:(nonnull NSNumber *)value;
+ (void) SetPathLineColor:(nonnull NSNumber *)value;
+ (void) SetNavigationOptions:(NSArray *)array;
+ (void) SetMapColor:(nonnull NSNumber *)value;
+ (void) SetSmartDrivingMode:(nonnull NSNumber *)value;
+ (void) SetCamreaOptions:(NSArray *)array;
+ (void) SetOperationState:(NSArray *)array;
+ (void) SetFacility:(NSArray *)array;
+ (void) SetGuidevoice:(nonnull NSNumber *)value;
+ (void) SetRediscover:(nonnull NSNumber *)value;
+ (void) SetWayPoint:(nonnull NSNumber *)value;
+ (void) SetHiPass:(BOOL)value;
+ (void) SetCarType:(nonnull NSNumber *)value;
+ (void) SetFuel:(nonnull NSNumber *)value;
+ (void) SetSeatPosition:(nonnull NSNumber *)value;
+ (void) SetCarvata:(nonnull NSNumber *)value;
+ (void) SetDem:(BOOL)value;
+ (void) SetAutoCurrentPos:(BOOL)value;

+ (NSString *) GetPathLineColor;
+ (NSString *) GetLanguage;
+ (NSString *) GetNavigationOptions;
+ (NSString *) GetMapColor;
+ (NSString *) GetSmartDrivingMode;
+ (NSString *) GetCamreaOptions;
+ (NSString *) GetOperationState;
+ (NSString *) GetFacility;
+ (NSString *) GetGuidevoice;
+ (NSString *) GetRediscover;
+ (NSString *) GetWayPoint;
+ (NSString *) GetHiPass;
+ (NSString *) GetCarType;
+ (NSString *) GetFuel;
+ (NSString *) GetSeatPosition;
+ (NSString *) GetCarvata;
+ (NSString *) GetDem;
+ (NSString *) GetUUID;
+ (NSString *) GetVersionJson;
+ (NSString *) GetVersionName;
+ (NSString *) GetVersionCode;
+ (NSString *) GetAutoCurrentPos;

@end

NS_ASSUME_NONNULL_END
