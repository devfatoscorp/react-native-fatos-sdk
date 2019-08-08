//
//  FatosBuildConfig.h
//  FatosRNApp
//
//  Created by 유춘성 on 25/03/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef FatosBuildConfig_h
#define FatosBuildConfig_h

#import <UIKit/UIKit.h>
  
typedef NS_ENUM(int, eCommercialMode) {
  Develop,
  Inside,
  Commercial,
};

typedef NS_ENUM(int, eOnOffLineMode) {
  OFF_LINE_MODE,
  ON_LINE_MODE,
};

@interface FatosBuildConfig : NSObject

+ (int) getBuildSearchResultMode;
+ (void) setBuildSearchResultMode:(int)mode;
+ (void) setFatosAppVersion:(const char *)pszAppVersion;
+ (const char *) getFatosAppVersion;
+ (void) setFatosAppBuildNo:(const int)buildNo;
+ (const int) getFatosAppBuildNo;
+ (bool) getSimulGPSMode;
+ (bool) getSaveGPSLog;
+ (bool) isCommercialBuild;
+ (bool) isDevBuild;
+ (const char *) getFatos_Uri;
+ (const char *) getFatos_Auth_Uri;

@end  

static eCommercialMode const build_AppType          = Develop;
static eCommercialMode const build_RouteServerType  = Commercial;
static eOnOffLineMode const build_OnOffLineMode     = ON_LINE_MODE;
static eCommercialMode const buildRouteServerType   = build_AppType;

static bool const build_SimulationGPSMode      = false; // 파일 GPS 사용여부
static bool const build_NewCertification       = true;
static bool const build_mgl_location_update    = true;
static bool const build_release_path           = false; // 릴리즈시 경로 분기처리
static bool const build_documents_map_data     = false; // 도큐먼트 맵 데이터 저장

static int const FATOS_SITE_IS_FATOS           = 1;
static int const FATOS_SITE_IS_NAVER           = 5;
static int const FATOS_SITE_IS_GOOGLE          = 7;
static int const FATOS_SITE_IS_TMAP            = 11;
static int const FATOS_SITE_IS_LOHIMLOCAL      = 12;
static int const FATOS_SITE_IS_LOHIMSEMIHYBRID = 13;
static int const FATOS_SITE_IS_SANJI1          = 21;
static int const FATOS_SITE_IS_SANJI2          = 22;
static int const FATOS_SITE_IS_EX              = 23;
static int const FATOS_SITE_IS_LGD             = 24;
static int const FATOS_SITE_IS_KYUNGNAM_FIREFIGHTING = 25;
static int const FATOS_SITE_IS_JYCUSTOM        = 26;
static int const FATOS_SITE_IS_HMNS            = 27;
static int const FATOS_SITE_IS_HYNIX           = 28;
static int const FATOS_SITE_IS_DigiLow         = 29;
static int const FATOS_SITE_IS_Digi            = 30;
static int const FATOS_SITE_IS_CNSLINK         = 31;
static int const FATOS_SITE_IS_RSMEV           = 32;
static int const FATOS_SITE_IS_CNSLINKLow      = 33;
static int const FATOS_SITE_IS_LogisAll        = 34;
static int const FATOS_SITE_IS_FireAgency      = 35;
static int const FATOS_SITE_IS_TMSDG           = 36;
static int const FATOS_SITE_IS_MAPIT           = 37;
static int const FATOS_SITE_IS_TNAVI           = 38;
static int const FATOS_SITE_IS_TRUCK           = 39;
static int const FATOS_SITE_IS_INFINITY        = 40;
static int const FATOS_SITE_IS_MAPFLEET        = 41;
static int const FATOS_SITE_IS_CDG             = 42; // CDG
static int const FATOS_SITE_IS_SLA             = 43; // SLA
static int const FATOS_SITE_IS_DEMO            = 999;

//static int const build_Site = FATOS_SITE_IS_FATOS;   // 사이트 설정
static bool const bbuild_NewTile                = true;
static bool const build_TwoBeOneDemo           = false;
static bool const build_ApplyIntroSnd          = false;
static bool const build_DrawFontTBT            = false;
static bool const build_Debug                  = false;
static bool const build_TTS2WAVE               = false;
static bool const build_onMapReady             = false;
static bool const build_CallGetAddress         = true;
static bool const build_ShowLog                = false;
static bool const build_GoogleTest             = false;
static bool const build_DemoVersion            = false;
static bool const build_EnableNaverRoute       = false;

static bool const bbuild_DirTmapMode           = false;
static bool const build_BirdViewMapCenterMode  = true;
static bool const build_DrawMapScaleBar        = false;
static bool const build_EnableInfoSeed         = false;

static bool const build_FATOSAuto              = false;
static bool const build_ContinueRoute          = true;
static bool const build_LaneView               = true;

/**
 * 단말 특성멸 build option
 */

static bool const build_LohimHybridMode        = false;
static bool const build_Lohim                  = false;
static bool const build_Ex                     = false;
static bool const build_Digiparts              = false;
static bool const build_JYCustom               = false;
static bool const build_CNSLink                = false;
static bool const build_TimeLock               = false;
static bool const build_DBUpdateAuthCheck      = false;

static bool const bbuild_China                 = false;
static bool const bbuild_Vietnam               = false;
static bool const build_HMNS_HEARMAP           = false;
static bool const build_FixGoVol2              = true;

static bool const build_SmartTabMode           = false;
static bool const build_FatosCenter            = true;
static int const build_RoutePath               = 1;    // 0:naver, 1:tmap, 2:fatos, 3:google, 4:tmap(Fatos다국어버전)

/**
 * 외국 언어 빌드
 */

static bool buildChina = false;
static bool buildVietnam = false;
static bool buildHMNS_HEREMAP = false;
static const bool buildFixGoVol2 = true;

static bool buildSmartTabMode = false;
static const bool buildFatosCenter = true;
static const int buildRoutePath = 1; // 0: naver 1: tmap 2: Fatos 3:Google 4: tmap(Fatos 다국어버전)
static const int defaultLanguage = 0;   // 0 한국 , 1 영어, 2 Deutsch, 3 Français, 4 Nederlands, 5 简体中文, 6 日本語, 7 Tiếng Việt, 8 태국,

#endif /* FatosBuildConfig_h */
