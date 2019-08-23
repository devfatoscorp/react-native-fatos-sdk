//
//  FatosMapViewModule.m
//  FatosRNApp
//
//  Created by 심규빈 on 16/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "FatosMapViewBridgeModule.h"
#import "FatosAppDelegate.h"
#import <FatosMapView.h>

@implementation FatosMapViewBridgeModule

// The React Native bridge needs to know our module
RCT_EXPORT_MODULE()

-(id)init{
  
  self = [super init];
  if(self) {
    isListener = NO;
    [FatosAppDelegate sharedAppDelegate].fatosMapViewBridgeModule = self;
  }
  return self;
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (NSDictionary *)constantsToExport
{
  // RCTBridgeModule 오버라이드 함수
  return @{@"greeting": @"Welcome to the DevDactic\n React Native (iOS) Tutorial, right?!"};
}

- (NSArray<NSString *> *)supportedEvents
{
  //RCTEventEmitter 오버라이드 함수
  //RCTEventEmitter 사용하는 이벤트 명을 등록해줘야 한다
  return @[@"MapLevelUpdateListener", @"PosWorldLocationUpdateListener", @"TouchMoveModeListener"];
}

// js -> Native
RCT_EXPORT_METHOD(setListener:(NSString *)value)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    if([value isEqualToString:@"1"])
    {
      self->isListener = YES;
    }
    
  });
}

RCT_EXPORT_METHOD(setViewMode:(nonnull NSNumber *)mode)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
      [fatosMapView setViewMode:mode];
    }
    
  });
}

RCT_EXPORT_METHOD(setLayer:(NSDictionary *) baseLayerType bVisible:(NSDictionary *)bVisible)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
      [fatosMapView setAirlineMode:baseLayerType bVisible:bVisible];
    }
    
  });
}

RCT_EXPORT_METHOD(MapLevelIn)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
      [fatosMapView setMapLevelIn];
    }
    
  });
}

RCT_EXPORT_METHOD(MapLevelOut)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
      [fatosMapView setMapLevelOut];
    }
    
  });
}

RCT_EXPORT_METHOD(MapAuto)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
      [fatosMapView setMapAuto];
    }
    
    // 터치 이동 모드 초기화 전송
    [self TouchMoveModeListener:0];
    
  });
}

/** callback **/
RCT_EXPORT_METHOD(nativeJsViewModeCallBack:(RCTResponseSenderBlock)callback)
{
  FatosMapView *fatosMapView = [FatosMapView sharedMapView];
  
  if(fatosMapView != nil)
  {
    NSString *strResult = [NSString stringWithFormat:@"%d", 1];
    callback(@[[NSNull null], strResult]);
  }
  else
  {
    callback(@[[NSNull null], @"-1"]);
  }
}

RCT_EXPORT_METHOD(nativeJsAirlineModeCallBack:(RCTResponseSenderBlock)callback)
{
  FatosMapView *fatosMapView = [FatosMapView sharedMapView];
  
  if(fatosMapView != nil)
  {
    NSString *strResult = [NSString stringWithFormat:@"%d", 1];
    callback(@[[NSNull null], strResult]);
  }
  else
  {
    callback(@[[NSNull null], @"-1"]);
  }
}

RCT_EXPORT_METHOD(nativeJsMapLevelCallBack:(RCTResponseSenderBlock)callback)
{
  FatosMapView *fatosMapView = [FatosMapView sharedMapView];
  
  if(fatosMapView != nil)
  {
    float fLevel = [fatosMapView getMapLevel];
    int nUIViewLevel = (int)ceil((double) fLevel);
    
    NSString *strResult = [NSString stringWithFormat:@"%d", (nUIViewLevel - 1)];
    callback(@[[NSNull null], strResult]);
  }
  else
  {
    callback(@[[NSNull null], @"17"]);
  }
}

RCT_EXPORT_METHOD(OnMapSetRoutelineColor:(int)index color_active:(NSString *)color_active color_deactive:(NSString *)color_deactive)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
      [fatosMapView setMapAuto];
    }
    
    // 터치 이동 모드 초기화 전송
    [self TouchMoveModeListener:0];
    
  });
}

RCT_EXPORT_METHOD(SummaryMapSetting:(NSDictionary *)lineColor
                  xScale:(float)xScale yScale:(float)yScale
                  hCenter:(float)hCenter vCenter:(float)vCenter)
{

  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
      [fatosMapView SummaryMapSetting:lineColor xScale:xScale yScale:yScale hCenter:hCenter vCenter:vCenter];
    }
    
  });
}

RCT_EXPORT_METHOD(DefaultMapSetting)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
      [fatosMapView DefaultMapSetting];
    }
    
  });
}

RCT_EXPORT_METHOD(SelectRouteLine:(int)index)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
       [fatosMapView MapSelectRouteLine:index];
    }
    
  });
}

RCT_EXPORT_METHOD(ApplySelectRouteLine:(int)index)
{
  dispatch_sync(dispatch_get_main_queue(), ^{
    
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
      [fatosMapView ApplySelectRouteLine:index];
    }
    
  });
}
/** ios -> js **/
- (void) MapLevelUpdateListener:(int)nLevel;
{
  if(isListener)
  {
    NSString *strResult = [NSString stringWithFormat:@"%d", nLevel];
    [self sendEventWithName:@"MapLevelUpdateListener" body:strResult];
  }
}

- (void) PosWorldLocationUpdateListener:(NSString *)strLocation;
{
  if(isListener)
  {
    [self sendEventWithName:@"PosWorldLocationUpdateListener" body:strLocation];
  }
}

- (void) TouchMoveModeListener:(int)nMode
{
  if(isListener)
  {
    NSString *strResult = [NSString stringWithFormat:@"%d", nMode];
    [self sendEventWithName:@"TouchMoveModeListener" body:strResult];
  }
}

@end
