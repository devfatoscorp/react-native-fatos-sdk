//
//  FatoseSettingManager.m
//  FatosRNApp
//
//  Created by 심규빈 on 05/08/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "FatoseSettingManager.h"
#import <FatosNaviModule.h>
#import <FatosEnvironment.h>

#define sizeof_array(x)                 (sizeof(x) / sizeof(x[0]))

@implementation FatoseSettingManager

static bool m_arSDIEnable[] = {
  true, // 0
  true, // 1
  true, // 2
  true, // 3
  true, // 4
  true, // 5
  true, // 6
  true,   // 고정식 // 7
  true, // 버스 전용 차선  8
  false, //이동식 //9
  false,  // 끼어들기 // 10
  true,  // 신호위반  // 14
  true,  // 신호위반 모형  // 15
  false,  // 급커브 // 31
  false,  // 어린이 보호 시작 // 33
  false,  // 어린이 보호 종료 // 34
  false,  // 사고 다발 // 30
  true,  // 교통 정보 // 13
  false,  // 트럭 높이제한(39) // 18
  false,  // 트럭 중량제한(40) // 19
  false   // 트럭 높이,중량제한(41) 20
};

static bool m_arAndoService[] = {
  true, // 고정식 // 0
  true, // 이동식
  true, // 신호단속
  false, // 끼어들기
  false, // 주차
  false, // 버스전용 // 5
  false, // 급커브 구간
  false, // 어린이보호구역
  false, // 사고다발
  false, // 과속방지턱
  true, // 교통정보 수집 // 10
  false, // 톨게이트
  false, // 졸음쉼터 // 12
};

static int m_arSDIType[] = {
  sdk::SDI_CODE_RESERVED_0, // 1부터 시작해서 넣어준다
  sdk::SDI_CAM_FIXED_SPEED,
  sdk::SDI_CAM_FIXED_BUSSPEED,
  sdk::SDI_CAM_FIXED_360,
  sdk::SDI_CAM_FIXED_SECTION,
  sdk::SDI_CAM_FIXED_SECTION_OR_LANE,
  sdk::SDI_CAM_FIXED_LOAD_BAD,
  sdk::SDI_CAM_FIXED_SIGN_UNATTACHED,   // 고정식(7)
  sdk::SDI_CAM_FIXED_BUS_LANE, // 버스 전용 차선(8)
  sdk::SDI_CAM_MOVE_ABLE, // 이동식 (9)
  sdk::SDI_CAM_CUT_IN,  // 끼어들기 (10)
  sdk::SDI_CAM_VIOLATION_SIGNAL,  // 신호위반 (11)
  sdk::SDI_CAM_VIOLATION_SIGNAL_MOCKUP,  // 신호위반 모형(12)
  sdk::SDI_POINT_SHARP_CURVE,  // 급커브(13)
  sdk::SDI_POINT_START_PROTECTED_CHILD,  // 어린이 보호 시작(14)
  sdk::SDI_POINT_END_PROTECTED_CHILD,  // 어린이 보호 종료(15)
  sdk::SDI_POINT_ACCIDENT,  // 사고 다발 (16)
  sdk::SDI_DVC_COLLECT_TRAFFIC,  // 교통 정보 (17)
  sdk::SDI_TRUCK_HEIGHT_LIMIT,  // 트럭 높이제한(39)
  sdk::SDI_TRUCK_WEIGHT_LIMIT,  // 트럭 중량제한(40)
  sdk::SDI_TRUCK_BOTH_LIMIT  // 트럭 높이,중량제한(41)
};

// ui상 추천2 사용 안함
static int const m_arRouteOption[] = {
  sdk::ROUTE_OPTION1, // 추천1
  sdk::ROUTE_OPTION3, // 고속도로 우선
  sdk::ROUTE_OPTION4, // 일반도로 우선
  sdk::ROUTE_OPTION5, // 최단거리
  sdk::ROUTE_OPTION6 // 무료 도로
};

static const char* m_arFeeOption[] = {
  "2", // 추천1
  "1", // 고속도로 우선
  "1", // 일반도로 우선
  "1", // 최단거리
  "3" // 무료 도로
};

- (instancetype)init
{
  @throw [NSException exceptionWithName:@"FatoseSettingManager is singleton" reason:@"" userInfo:nil];
}

+ (instancetype)sharedObject
{
  static FatoseSettingManager* instance = nil;
  static dispatch_once_t onceToken;
  
  dispatch_once(&onceToken, ^{   // dispatch_once를 통해 객체를 획득하는 부분의 상호배제
    if (!instance) {
      instance = [[FatoseSettingManager alloc] initWithSetting];
    }
  });
  return instance;
}

- (instancetype)initWithSetting {
  self = [super init];
  
  if (self)
  {
    
  }
  
  return self;
}

- (bool)getSDIEnable:(int)index
{
  return m_arSDIEnable[index];
}

- (void)setSDIEnable:(int)index val:(bool)val
{
  m_arSDIEnable[index] = val;
}

- (bool)getAndoService:(int)index
{
  return m_arAndoService[index];
}

- (void)setAndoService:(int)index val:(bool)val
{
  m_arAndoService[index] = val;
}

- (int)getSDIType:(int)index
{
  return m_arSDIType[index];
}

- (void)setSDIType:(int)index val:(int)val
{
  m_arSDIType[index] = val;
}

- (int)getRouteOption:(int)index
{
  return m_arRouteOption[index];
}

- (const char*)getFeeOption:(int)index
{
  return m_arFeeOption[index];
}

- (void)setFeeOption:(int)index val:(const char*)val
{
  m_arFeeOption[index] = val;
}

- (void)updateSDIInfo
{
  for(int i = 0 ; i < 8 ; i++)
  {
    m_arSDIEnable[i] = m_arAndoService[0];
  }
  // 버스 정보
  m_arSDIEnable[8] = m_arAndoService[5];
  
  // 이동식
  m_arSDIEnable[9] = m_arAndoService[1];
  
  // 끼어들기
  m_arSDIEnable[10] = m_arAndoService[3];
  
  // 신호위반
  m_arSDIEnable[11] = m_arAndoService[2];
  m_arSDIEnable[12] = m_arAndoService[2];
  
  // 급커브
  m_arSDIEnable[13] = m_arAndoService[6];
  
  // 어린이 보호 구역
  m_arSDIEnable[14] = m_arAndoService[7];
  m_arSDIEnable[15] = m_arAndoService[7];
  
  // 사고 다발
  m_arSDIEnable[16] = m_arAndoService[8];
  // 교통 정보
  m_arSDIEnable[17] = m_arAndoService[10];
  
  // 높이,중량 안내
  m_arSDIEnable[18] = false;
  m_arSDIEnable[19] = false;
  m_arSDIEnable[20] = false;
  
  // 트럭은 안쓰니 일단 주석
  //        // 위험물 추가
  //        if(ANaviApplication.getRoutePathInfo().m_nServiceType == FatosBuildConfig.FATOS_SITE_IS_TRUCK ||
  //                ANaviApplication.getRoutePathInfo().m_nServiceType == FatosBuildConfig.FATOS_SITE_IS_TMSDG)
  //        {
  //            m_arSDIEnable[18] = true;
  //            m_arSDIEnable[19] = true;
  //            m_arSDIEnable[20] = true;
  //        }
  
  int size1 = sizeof_array(m_arSDIType);
  int size2 = sizeof_array(m_arSDIEnable);
  
  sdk::SDI_CODE   codes_arr[sdk::SDI_CODE_COUNT];
  bool       buses_arr[sdk::SDI_CODE_COUNT];
  
  if(size1 <= 0)
    return;
  if(size1 != size2)
    return;
  
  do{--size1;
    if(m_arSDIType[size1] >= 0 && m_arSDIType[size1] < sdk::SDI_CODE_COUNT){
      codes_arr[size1] = (sdk::SDI_CODE)m_arSDIType[size1];
      buses_arr[size1] = m_arSDIEnable[size1];
    }
  }while(size1);
  
//  FatosNavi::SetSDIFilter(codes_arr, buses_arr, size2);

}

@end
