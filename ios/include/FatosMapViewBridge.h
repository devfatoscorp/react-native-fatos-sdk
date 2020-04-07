//
//  FatosMapViewBridge.h
//  Fatos
//
//  Created by 심규빈 on 2020/02/06.
//  Copyright © 2020 유춘성. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface FatosMapViewBridge : NSObject

+ (void) setViewMode:(nonnull NSNumber *)mode;
+ (void) setLayer:(NSDictionary *) baseLayerType bVisible:(NSDictionary *)bVisible;
+ (void) MapLevelIn:(nonnull NSNumber *)type;
+ (void) MapLevelOut:(nonnull NSNumber *)type;
+ (void) setMapLevel:(float)fLevel type:(nonnull NSNumber *)type;
+ (void) MapAuto;
+ (void) MapMove:(float)fLonX fLatY:(float)fLatY;
+ (void) MapSelectRouteLine:(int)nIndex;
+ (void) SummaryMapSetting:(NSDictionary *)lineColor
xScale:(float)xScale yScale:(float)yScale
                   hCenter:(float)hCenter vCenter:(float)vCenter blnViewMode:(BOOL)blnViewMode;
+ (void) DefaultMapSetting;
+ (void) SelectRouteLine:(int)index;
+ (void) ApplySelectRouteLine:(int)index;
+ (void) InitMarkerImage:(NSString*)strJsonFileName strFileName:(NSString*)strFileName;
+ (void) SetVisibleMarkerGroup:(NSString*)strJson;
+ (void) AddMarker:(NSString*)strJson;
+ (void) SetMarker:(NSString*)strJson;
+ (void) DelMarker:(NSString*)strJson;
+ (void) DelMarkerGroup:(NSString*)strJson;
+ (void) ClearMarker;
+ (void) SetUserLine:(NSString*)strJson;
+ (void) SetMapCenter:(float)hCenter vCenter:(float)vCenter;
+ (void) SetMapShiftCenter:(float)hCenter vCenter:(float)vCenter;
+ (void) SetTouchState:(int)state;
+ (void) SetPosWGS84:(double)xlon ylat:(double)ylat;

+ (NSMutableDictionary *) GetPosWorldFromScreen:(float)fCenterX fCenterY:(float)fCenterY;
+ (NSMutableDictionary *) ConvWorldtoWGS84:(int)x y:(int)y;
+ (NSMutableDictionary *) GetMapCenter;
+ (NSMutableDictionary *) GetMapShiftCenter;
+ (NSMutableDictionary *) GetPosWorldtoWGS84FromScreen:(float)fCenterX fCenterY:(float)fCenterY;
+ (NSMutableDictionary *) GetFitLevelMBR_wgs84:(NSDictionary *)dmin dmax:(NSDictionary *)dmax;
+ (NSMutableDictionary *) GetFitLevelPosArray:(NSDictionary *)vscaleScreen wgs84Array:(NSArray *)wgs84Array;

@end

NS_ASSUME_NONNULL_END
