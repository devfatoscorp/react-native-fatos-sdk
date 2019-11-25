//
//  FatosNavi.h
//  FatosRNApp
//
//  Created by 유춘성 on 04/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#include <FatosUtil.h>

NS_ASSUME_NONNULL_BEGIN

@protocol FatosNaviModuleDelegate <NSObject>

- (void) onUpdateRG:(NSString *)rgJson;
- (void) onRouteStart:(int)nType ierror:(int)ierror;
- (void) onRouteResult:(int)nType ierror:(int)ierror;
- (void) onRouteCancel;
- (void) onRouteComplete;
- (void) onRouteViaComplete:(NSString *)viaJson;
- (BOOL) isIndicator;
- (void) onMapAuto;
- (void) onInitializeStatus:(int)status value:(NSString *)value;

@end

@interface FatosNaviModule : NSObject {

  NSDictionary *routeDic;
  bool mbln_MapMoveCurrentEvent;
}
- (id)initNaviModule:(NSString *)sdkKey;

- (void) OnUpdateRG:(BOOL)isSimulation;
- (void) OnRouteResult:(int)itype ierr:(int)ierr pCtx:(void*)pCtx isLocal:(BOOL)isLocal;

- (BOOL) InitFolder;
- (BOOL) InitServiceURL;
- (BOOL) InitResource;

- (BOOL) InitNavi;
- (void) ReleaseNavi;

- (void) routeExternal:(NSDictionary *)jsonDic strFeeOption:(NSString *)strFeeOption;
- (void) updateRouteParam:(NSDictionary *)jsonDic strFeeOption:(NSString *)strFeeOption;
- (void) ReRoute;
- (void) Route:(NSString *)startLat startLon:(NSString *)startLon goalLat:(NSString *)goalLat goalLon:(NSString *)goalLon strFeeOption:(NSString *)strFeeOption;
- (void) RouteTest1;
- (void) RouteTest2;
- (void) RouteTest3;
- (void) CancelRoute;
- (void) StartSimulation:(int)index;
- (void) StartRouteGuidance:(int)index;
- (void) DriveControl:(int)value;
- (void) DriveSpeed:(int)value;
- (void) DriveClose;
- (void) SetNightMode:(int)value;
- (NSString *)GetRouteSummaryJson;
- (void) SetEnableFATOSGuideWDB:(bool)val;
- (void) SetRouteAutoTime:(int)val;
- (void) SetLanguage:(int)index;
- (NSString *)RequestTmapSearchService:(NSString *)keywordName;
- (NSString *)RequestFtsSearchService:(NSString *)keywordName option:(int)option;
- (void) SpeakUtterance:(NSString *)strSpeech;
- (NSString *)GetVersion;
- (void) SetAutoCurrentPos:(bool)val;
- (void) StartDrawGpsLog:(bool)bAddNmea bAddMatched:(bool)bAddMatched;
- (void) StopDrawGpsLog;
- (NSString *) GetErrorString:(int)err_code;
+ (void) SetSDIFilter:(int *)pcodes pbuses:(bool*)pbuses nArray:(int)nArray;
+ (void) OnMapMoveCurrentTimer;
+ (double) getCurrentLonX;
+ (double) getCurrentLatY;
+ (int) getClientSite;

@property(strong, nonatomic) id<FatosNaviModuleDelegate> delegate;

@end

NS_ASSUME_NONNULL_END
