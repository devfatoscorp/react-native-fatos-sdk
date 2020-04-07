//
//  FatosNavi.h
//  FatosRNApp
//
//  Created by 유춘성 on 04/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol FatosNaviModuleDelegate <NSObject>

- (void) onUpdateRG:(NSString *)rgJson;
- (void) onRouteStart:(int)nType ierror:(int)ierror;
- (void) onRouteResult:(int)nType ierror:(int)ierror;
- (void) onRouteCancel;
- (void) onRouteComplete;
- (void) onRouteViaComplete:(NSString *)viaJson;
- (void) onMapAuto;
- (void) onInitializeStatus:(int)status value:(NSString *)value;

@end

@interface FatosNaviModule : NSObject {

  NSDictionary *routeDic;
  bool mbln_MapMoveCurrentEvent;
}
- (id)initNaviModule:(NSString *)sdkKey;
- (void) initFatosNaviEngine;

- (void) OnUpdateRG:(BOOL)isSimulation;
- (void) OnRouteResult:(int)itype ierr:(int)ierr pCtx:(void*)pCtx isLocal:(BOOL)isLocal;

- (BOOL) InitFolder;
- (BOOL) InitServiceURL;
- (BOOL) InitResource;

- (BOOL) InitNavi;
- (void) ReleaseNavi;

- (void) routeExternal:(NSDictionary *)jsonDic strFeeOption:(NSString *)strFeeOption bRequest:(BOOL)bRequest;
- (void) ReRoute;
- (void) Route:(NSString *)startLat startLon:(NSString *)startLon goalLat:(NSString *)goalLat goalLon:(NSString *)goalLon strFeeOption:(NSString *)strFeeOption;
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
- (NSString *)RequestFtsSearchService:(NSString *)strParam;
- (void) SpeakUtterance:(NSString *)strSpeech;
- (NSString *)GetVersion;
- (void) SetAutoCurrentPos:(bool)val;
- (void) StartDrawGpsLog:(bool)bAddNmea bAddMatched:(bool)bAddMatched;
- (void) StopDrawGpsLog;
- (NSString *) GetErrorString:(int)err_code;
- (NSString *) GetGeoCodeString:(double)lon lat:(double)lat;
- (BOOL) IsRoute;
+ (void) SetSDIFilter:(int *)pcodes pbuses:(bool*)pbuses nArray:(int)nArray;
+ (void) OnMapMoveCurrentTimer;
+ (double) getCurrentLonX;
+ (double) getCurrentLatY;
+ (int) getClientSite;
+ (BOOL) IsInitNaviEngine;

@property(strong, nonatomic) id<FatosNaviModuleDelegate> delegate;

@end

NS_ASSUME_NONNULL_END
