//
//  FatosEnvironment.h
//  FatosRNApp
//
//  Created by 심규빈 on 22/05/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef FatosEnvironment_h
#define FatosEnvironment_h

#import <Foundation/Foundation.h>

namespace sdk {
    enum SDI_CODE{
        SDI_CODE_RESERVED_0  = 0,    // 사용안함
        SDI_CAM_FIXED_SPEED,      // 1  = 고정식 카메라 (과속단속)
        SDI_CAM_FIXED_BUSSPEED,      // 2  = 고정식 카메라 (과속및버스전용단속)
        SDI_CAM_FIXED_360,        // 3  = 고정식 카메라 (360도카메라)
        SDI_CAM_FIXED_SECTION,      // 4  = 고정식 카메라 (구간단속 sp)
        SDI_CAM_FIXED_SECTION_OR_LANE,  // 5  = 고정식 카메라 (구간 or 차로 단속 ep)
        SDI_CAM_FIXED_LOAD_BAD,      // 6  = 고정식 카메라 (적재불량단속)
        SDI_CAM_FIXED_SIGN_UNATTACHED,  // 7  = 고정식 카메라 (표지판미부착카메라)
        SDI_CAM_FIXED_BUS_LANE,      // 8  = 버스전용차로단속카메라 (전용차로단속)
        SDI_CAM_MOVE_ABLE,        // 9  = 이동식 카메라 (안내포인트)
        
        SDI_CAM_LOAD_OVER,        // 10  = 과적위반단속카메라 (계근측정불응도주카메라)
        SDI_DVC_LOAD_OVER_SCALE,    // 11  = 과적위반단속카메라 (중량측정장치)
        SDI_DVC_RECOGNITION_CAR_NUMBER,  // 12  = 차량번호인식장치 (차량번호인식장치)
        SDI_DVC_COLLECT_TRAFFIC,    // 13  = 교통정보수집장치 (통행시간산정카메라)
        
        SDI_CAM_VIOLATION_SIGNAL,    // 14  = 신호위반(다기능)카메라 (신호위반(다기능)카메라)
        SDI_CAM_VIOLATION_SIGNAL_MOCKUP,// 15  = 신호위반(다기능)카메라 (모형 카메라)
        SDI_CAM_PARKING_STOP,      // 16  = 주정차단속 카메라
        SDI_CAM_SIDE_OF_ROAD,      // 17  = 갓길감시 카메라
        SDI_CAM_CUT_IN,          // 18  = 끼어들기단속 카메라
        SDI_CAM_VARIABLE_LANE,      // 19  = 가변차로단속 카메라
        SDI_CAM_TAIL,          // 20  = 꼬리물기단속카메라
        
        SDI_CODE_RESERVED_21,      // 사용안함
        SDI_CODE_RESERVED_22,      // 사용안함
        SDI_CODE_RESERVED_23,      // 사용안함
        SDI_CODE_RESERVED_24,      // 사용안함
        SDI_CODE_RESERVED_25,      // 사용안함
        SDI_CODE_RESERVED_26,      // 사용안함
        SDI_CODE_RESERVED_27,      // 사용안함
        
        SDI_POINT_CCTV,          // 28  = 방범용CCTV
        SDI_POINT_SLEEPYDRIVER,      // 29  = 졸음쉼터
        SDI_POINT_ACCIDENT,        // 30  = 사고다발지역
        SDI_POINT_SHARP_CURVE,      // 31  = 급커브지역
        SDI_POINT_FOG_AREA,        // 32  = 안개지역
        SDI_POINT_START_PROTECTED_CHILD,// 33  = 어린이보호구역 시점
        SDI_POINT_END_PROTECTED_CHILD,  // 34  = 어린이보호구역 종점
        SDI_POINT_CROSS_RAILROAD,    // 35  = 철길건널목
        SDI_POINT_SPEED_HUMP,      // 36  = 과속방지턱
        
        SDI_WATER_DANGER_ENTER,      // 37  = 위수지역(관제용) 진입링크
        SDI_WATER_DANGER_AREA,      // 38  = 위수지역(관제용) 실제링크
        
        SDI_TRUCK_HEIGHT_LIMIT,      // 39  = 트럭 높이제한
        SDI_TRUCK_WEIGHT_LIMIT,      // 40  = 트럭 중량제한
        SDI_TRUCK_BOTH_LIMIT,      // 41  = 트럭 높이,중량제한
        
        SDI_CODE_COUNT          // SDI 코드 개수
    };
    
    static const int ROUTE_OPTION1 = 0x01; // 추천1
    static const int ROUTE_OPTION2 = 0x02; // 추천2
    static const int ROUTE_OPTION3 = 0x04; // 고속도로 우선
    static const int ROUTE_OPTION4 = 0x08; // 일반도로 우선
    static const int ROUTE_OPTION5 = 0x0F; // 최단거리
    static const int ROUTE_OPTION6 = 0x20; // 무료도로
    
    static const int MAX_ROUTE_OPTION = 3;
    static const int ROUTE_OPTION[MAX_ROUTE_OPTION] = {
        ROUTE_OPTION1,
        ROUTE_OPTION4,
        ROUTE_OPTION6
    };
}

@interface FatosEnvironment : NSObject {
  NSMutableDictionary *jsonDic;
}

+ (instancetype)sharedObject;
- (void)saveEnvironment;
//언어선택
- (void)setLanguage:(int)var;
- (int)getLanguage;
// 거리단위
- (void)setDistance:(int)var;
- (int)getDistance;
// 속도단위
- (void)setSpeed:(int)var;
- (int)getSpeed;
// 입력방식
- (void)setKeyboardType:(int)var;
- (int)getKeyboardType;
// 지도색상
- (void)setMapColor:(int)var;
- (int)getMapColor;
// 경로선색상
- (void)setPathLineColor:(int)var;
- (int)getPathLineColor;
// 스마트주행모드
- (void)setSmartDrivingMode:(bool)var;
- (bool)getSmartDrivingMode;
// 현위치아이콘
- (void)setCarvata:(int)var;
- (int)getCarvata;
// 카메라
- (void)setCamera:(NSArray *)arr;
- (NSArray *)getCamera;
// 주의운행구간
- (void)setOperationState:(NSArray *)arr;
- (NSArray *)getOperationState;
// 시설
- (void)setFacility:(NSArray *)arr;
- (NSArray *)getFacility;
// 안내음성
- (void)setGuidevoice:(int)var;
- (int)getGuidevoice;
// 기본경로탐색옵션
- (void)setNavigationOptions:(NSArray *)arr;
- (NSArray *)getNavigationOptions;
// 주기적재탐색
- (void)setRediscover:(int)var;
- (int)getRediscover;
// 경유지방향성
- (void)setWayPoint:(int)var;
- (int)getWayPoint;
// 차종
- (void)setCarType:(int)var;
- (int)getCarType;
// 하이패스
- (void)setHipass:(bool)var;
- (bool)getHipass;
// 유종
- (void)setFuel:(int)var;
- (int)getFuel;
// 운전석위치
- (void)setSeatPosition:(int)var;
- (int)getSeatPosition;
// dem
- (void)setDem:(bool)var;
- (bool)getDem;
// SimulGps
- (void)setSimulGps:(bool)var;
- (bool)getSimulGps;
// Draw GPS Point
- (void)setDrawGpsPoint:(bool)var;
- (bool)getDrawGpsPoint;
// Auto Current Pos
- (void)setAutoCurrentPos:(bool)var;
- (bool)getAutoCurrentPos;

@end

#endif /* FatosEnvironment_h */
