//
//  FatosNaviBridge.h
//  Fatos
//
//  Created by 심규빈 on 2020/02/06.
//  Copyright © 2020 유춘성. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface FatosNaviBridge : NSObject

+ (void) ReRoute;
+ (void) Route:(NSString *)startLat startLon:(NSString *)startLon
       goalLat:(NSString *)goalLat goalLon:(NSString *)goalLon;
+ (void) RouteViapoints:(NSString *)strJson;
+ (void) UpdateRouteParam:(NSString *)strJson;
+ (void) CancelRoute;
+ (void) DriveControl:(int)value;
+ (void) DriveSpeed:(int)value;
+ (void) DriveClose;
+ (void) Search:(id)target selector:(SEL)selector searchText:(NSString *)searchText;
+ (void) SearchSort:(id)target selector:(SEL)selector searchText:(NSString *)searchText option:(int)option;
+ (void) SearchParam:(id)target selector:(SEL)selector strParam:(NSString *)strParam;
+ (void) StartRouteGuidance:(int)index;
+ (void) StartSimulation:(int)index;
+ (void) SpeakUtterance:(NSString *)strSpeech;

+ (BOOL) IsRoute;
+ (NSString *) GetRouteSummaryJson;
+ (NSString *) GetLastLocation;
+ (NSDictionary *) GetCurrentPosition;
+ (NSString *) GetGeoCodeString:(double)lon lat:(double)lat;

@end

NS_ASSUME_NONNULL_END
