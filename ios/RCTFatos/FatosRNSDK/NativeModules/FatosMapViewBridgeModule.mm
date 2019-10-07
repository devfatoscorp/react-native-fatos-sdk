//
//  FatosMapViewModule.m
//  FatosRNApp
//
//  Created by 심규빈 on 16/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "FatosMapViewBridgeModule.h"
#import "FatosAppDelegate.h"
#import <FatosNaviModule.h>
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
  return @[@"MapLevelUpdateListener", @"PosWorldLocationUpdateListener",
    @"TouchMoveModeListener", @"MapLongTouchListener"];
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

RCT_EXPORT_METHOD(MapLevelIn:(nonnull NSNumber *)type)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
        [fatosMapView setMapLevelIn:[type intValue]];
    }
    
  });
}

RCT_EXPORT_METHOD(MapLevelOut:(nonnull NSNumber *)type)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
        [fatosMapView setMapLevelOut:[type intValue]];
    }
    
  });
}

RCT_EXPORT_METHOD(MapAuto)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
        double fLonX = [FatosNaviModule getCurrentLonX];
        double fLatY = [FatosNaviModule getCurrentLatY];
        
        [fatosMapView setMapAuto:fLonX fLatY:fLatY];
    }
    
    // 터치 이동 모드 초기화 전송
    [self TouchMoveModeListener:0];
    
  });
}

RCT_EXPORT_METHOD(OnMapSetRoutelineColor:(int)index color_active:(NSString *)color_active color_deactive:(NSString *)color_deactive)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
        double fLonX = [FatosNaviModule getCurrentLonX];
        double fLatY = [FatosNaviModule getCurrentLatY];
        
        [fatosMapView setMapAuto:fLonX fLatY:fLatY];
    }
    
    // 터치 이동 모드 초기화 전송
    [self TouchMoveModeListener:0];
    
  });
}

RCT_EXPORT_METHOD(SummaryMapSetting:(NSDictionary *)lineColor
                  xScale:(float)xScale yScale:(float)yScale
                  hCenter:(float)hCenter vCenter:(float)vCenter blnViewMode:(BOOL)blnViewMode)
{

  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
        [fatosMapView SummaryMapSetting:lineColor xScale:xScale yScale:yScale hCenter:hCenter vCenter:vCenter blnViewMode:blnViewMode];
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

RCT_EXPORT_METHOD(InitMarkerImage:(NSString*)strJsonFileName strFileName:(NSString*)strFileName)
{
    dispatch_sync(dispatch_get_main_queue(), ^{
      
      FatosMapView *fatosMapView = [FatosMapView sharedMapView];
      
      if(fatosMapView != nil)
      {
        [fatosMapView InitMarkerImage:strJsonFileName strFilaPath:strFileName];
      }
      
    });
}

RCT_EXPORT_METHOD(SetVisibleMarkerGroup:(NSString*)strJsonFileName)
{
    dispatch_sync(dispatch_get_main_queue(), ^{
      
      FatosMapView *fatosMapView = [FatosMapView sharedMapView];
      
      if(fatosMapView != nil)
      {
        [fatosMapView SetVisibleMarkerGroup:strJsonFileName];
      }
      
    });
}

RCT_EXPORT_METHOD(AddMarker:(NSString*)strJsonFileName)
{
    dispatch_sync(dispatch_get_main_queue(), ^{
      
      FatosMapView *fatosMapView = [FatosMapView sharedMapView];
      
      if(fatosMapView != nil)
      {
        [fatosMapView AddMarker:strJsonFileName];
      }
      
    });
}

RCT_EXPORT_METHOD(SetMarker:(NSString*)strJsonFileName)
{
    dispatch_sync(dispatch_get_main_queue(), ^{
      
      FatosMapView *fatosMapView = [FatosMapView sharedMapView];
      
      if(fatosMapView != nil)
      {
        [fatosMapView SetMarker:strJsonFileName];
      }
      
    });
}

RCT_EXPORT_METHOD(DelMarker:(NSString*)strJsonFileName)
{
    dispatch_sync(dispatch_get_main_queue(), ^{
      
      FatosMapView *fatosMapView = [FatosMapView sharedMapView];
      
      if(fatosMapView != nil)
      {
        [fatosMapView DelMarker:strJsonFileName];
      }
      
    });
}

RCT_EXPORT_METHOD(DelMarkerGroup:(NSString*)strJsonFileName)
{
    dispatch_sync(dispatch_get_main_queue(), ^{
      
      FatosMapView *fatosMapView = [FatosMapView sharedMapView];
      
      if(fatosMapView != nil)
      {
        [fatosMapView DelMarkerGroup:strJsonFileName];
      }
      
    });
}

RCT_EXPORT_METHOD(ClearMarker)
{
    dispatch_sync(dispatch_get_main_queue(), ^{
      
      FatosMapView *fatosMapView = [FatosMapView sharedMapView];
      
      if(fatosMapView != nil)
      {
        [fatosMapView ClearMarker];
      }
      
    });
}
/** callback **/

RCT_EXPORT_METHOD(GetPosWorldFromScreen:(float)fCenterX fCenterY:(float)fCenterY callback:(RCTResponseSenderBlock)callback)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
        int nMapCurPosX = 0;
        int nMapCurPosY = 0;
        
        [fatosMapView GetPosWorldFromScreen:fCenterX fCenterY:fCenterY nMapCurPosX:&nMapCurPosX nMapCurPosY:&nMapCurPosY];
        
        NSNumber *numberX = [NSNumber numberWithInt:nMapCurPosX];
        NSNumber *numberY = [NSNumber numberWithInt:nMapCurPosY];

        NSMutableDictionary *jsonDic = [NSMutableDictionary new];
        [jsonDic setValue:numberX forKey:@"x"];
        [jsonDic setValue:numberY forKey:@"y"];
        
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonDic options:NSJSONWritingPrettyPrinted error:nil];
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    
        NSString *strResult = jsonString;
        callback(@[[NSNull null], strResult]);
    }
  });
}

RCT_EXPORT_METHOD(ConvWorldtoWGS84:(int)x y:(int)y callback:(RCTResponseSenderBlock)callback)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
        double xlon = 0;
        double ylat = 0;
        
        [fatosMapView ConvWorldtoWGS84:x y:y xlon:&xlon ylat:&ylat];
        
        NSNumber *numberX = [NSNumber numberWithDouble:xlon];
        NSNumber *numberY = [NSNumber numberWithDouble:ylat];

        NSMutableDictionary *jsonDic = [NSMutableDictionary new];
        [jsonDic setValue:numberX forKey:@"xlon"];
        [jsonDic setValue:numberY forKey:@"ylat"];
        
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonDic options:NSJSONWritingPrettyPrinted error:nil];
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    
        NSString *strResult = jsonString;
        callback(@[[NSNull null], strResult]);
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

-(void) MapLongTouchListener:(int)x y:(int)y
{
  if(isListener)
  {
    [self sendEventWithName:@"MapLongTouchListener" body:@{@"x": @(x), @"y": @(y)}];
  }
}

@end
