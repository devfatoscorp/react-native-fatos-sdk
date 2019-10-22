//
//  FatosMapView.h
//  FatosRNApp
//
//  Created by 유춘성 on 13/03/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <GLKit/GLKit.h>
#import <QuartzCore/QuartzCore.h>
#import <OpenGLES/ES2/gl.h>
#import <OpenGLES/ES2/glext.h>

NS_ASSUME_NONNULL_BEGIN

@protocol FatosMapViewDelegate <NSObject>
- (void) MapLevelUpdateListener:(int)nLevel;
- (void) PosWorldLocationUpdateListener:(NSString *)strLocation;
- (void) TouchMoveModeListener:(int)nMode;
- (void) MapLongTouchListener:(int)x y:(int)y;
@end

@interface FatosMapView : GLKView {
  
};

- (void) viewSizeUpdate;
- (void) panGesture:(UIPanGestureRecognizer *)gestureRecognizer inView:(UIView*)view;
- (void) setViewMode:(NSNumber *)mode;
- (void) setAirlineMode:(NSDictionary *) baseLayerType bVisible:(NSDictionary *)bVisible;
- (void) setMapLevelIn:(int)nType;
- (void) setMapLevelOut:(int)nType;
- (float) getMapLevel;
- (void) setMapAuto:(double)fLonX fLatY:(double)fLatY;
- (float) GetViewAngle;
- (int) getTouchState;
- (BOOL) IsFling;
- (void) SummaryMapSetting:(NSDictionary *)lineColor xScale:(float)xScale yScale:(float)yScale
                   hCenter:(float)hCenter vCenter:(float)vCenter blnViewMode:(BOOL)blnViewMode;
- (void) DefaultMapSetting;
- (BOOL) isSummaryMode;


- (void) onAutoScale:(float)tilt level:(float)level;

- (void) MapSelectRouteLine:(int)nSelected;
- (void) ApplySelectRouteLine:(int)nSelected;
- (void) SetFlagName:(int)ObjType pszName:(const char *)pszName viaIndex:(int)viaIndex;
- (void) SetFlagPosWorld:(int)ObjType wpX:(int)wpX wpY:(int)wpY viaIndex:(int)viaIndex;
- (void) SetPosWGS84:(double)xlon ylat:(double)ylat;
- (void) GetPosWorldFromScreen:(float)fCenterX fCenterY:(float)fCenterY nMapCurPosX:(int*)nMapCurPosX nMapCurPosY:(int*)nMapCurPosY;
- (void) ConvWorldtoWGS84:(int)x y:(int)y xlon:(double*)xlon ylat:(double*)ylat;

- (void) onStartGoalSet:(int)sx sy:(int)sy sname:(const char*)sname gx:(int)gx gy:(int)gy gname:(const char*)gname;
- (void) SetEnvRouteLineColor:(int)nIndex;
- (void) SetRouteLineColor:(int)nContextIndex strActive:(NSString *)strActive strDeactive:(NSString *)strDeactive;
- (void) SetCarvata:(int)nIndex;
- (void) SetDem:(bool)val;

- (int) InitMarkerImage:(NSString *)strJsonFileName strFilaPath:(NSString *)strFileName;
- (BOOL) SetVisibleMarkerGroup:(NSString *)strJsonFileName;
- (BOOL) AddMarker:(NSString *)strJsonFileName;
- (BOOL) SetMarker:(NSString *)strJsonFileName;
- (BOOL) DelMarker:(NSString *)strJsonFileName;
- (BOOL) DelMarkerGroup:(NSString *)strJsonFileName;
- (void) ClearMarker;
- (void) SetMapCenter:(float)hCenter vCenter:(float)vCenter;


@property(strong, nonatomic) CADisplayLink* displayLink;
@property(strong, nonatomic) id<FatosMapViewDelegate> delegate;
@property(nonatomic, assign) BOOL isRender;

+ (FatosMapView *)sharedMapView;

@end

NS_ASSUME_NONNULL_END
