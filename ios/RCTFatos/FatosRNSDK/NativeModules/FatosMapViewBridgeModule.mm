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
    @"TouchMoveModeListener", @"MapLongTouchListener", @"UpdatePickerInfoListener",
    @"MapReadyListener"];
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

RCT_EXPORT_METHOD(setMapLevel:(float)fLevel type:(nonnull NSNumber *)type)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
        [fatosMapView setMapLevel:fLevel nType:[type intValue]];
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


RCT_EXPORT_METHOD(MapMove:(float)fLonX fLatY:(float)fLatY)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
        [fatosMapView setMapMove:fLonX fLatY:fLatY];
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

RCT_EXPORT_METHOD(SetVisibleMarkerGroup:(NSString*)strJson)
{
    dispatch_sync(dispatch_get_main_queue(), ^{
      
      FatosMapView *fatosMapView = [FatosMapView sharedMapView];
      
      if(fatosMapView != nil)
      {
        [fatosMapView SetVisibleMarkerGroup:strJson];
      }
      
    });
}

RCT_EXPORT_METHOD(AddMarker:(NSString*)strJson)
{
    dispatch_sync(dispatch_get_main_queue(), ^{
      
      FatosMapView *fatosMapView = [FatosMapView sharedMapView];
      
      if(fatosMapView != nil)
      {
        [fatosMapView AddMarker:strJson];
      }
      
    });
}

RCT_EXPORT_METHOD(SetMarker:(NSString*)strJson)
{
    dispatch_sync(dispatch_get_main_queue(), ^{
      
      FatosMapView *fatosMapView = [FatosMapView sharedMapView];
      
      if(fatosMapView != nil)
      {
        [fatosMapView SetMarker:strJson];
      }
      
    });
}

RCT_EXPORT_METHOD(DelMarker:(NSString*)strJson)
{
    dispatch_sync(dispatch_get_main_queue(), ^{
      
      FatosMapView *fatosMapView = [FatosMapView sharedMapView];
      
      if(fatosMapView != nil)
      {
        [fatosMapView DelMarker:strJson];
      }
      
    });
}

RCT_EXPORT_METHOD(DelMarkerGroup:(NSString*)strJson)
{
    dispatch_sync(dispatch_get_main_queue(), ^{
      
      FatosMapView *fatosMapView = [FatosMapView sharedMapView];
      
      if(fatosMapView != nil)
      {
        [fatosMapView DelMarkerGroup:strJson];
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

RCT_EXPORT_METHOD(SetUserLine:(NSString*)strJson)
{
    dispatch_sync(dispatch_get_main_queue(), ^{
      
      FatosMapView *fatosMapView = [FatosMapView sharedMapView];
      
      if(fatosMapView != nil)
      {
        [fatosMapView SetUserLine:strJson];
      }
      
    });
}

RCT_EXPORT_METHOD(SetMapCenter:(float)hCenter vCenter:(float)vCenter)
{
    dispatch_sync(dispatch_get_main_queue(), ^{
      
      FatosMapView *fatosMapView = [FatosMapView sharedMapView];
      
      if(fatosMapView != nil)
      {
        [fatosMapView SetMapCenter:hCenter vCenter:vCenter];
      }
      
    });
}


RCT_EXPORT_METHOD(SetMapShiftCenter:(float)hCenter vCenter:(float)vCenter)
{
    dispatch_sync(dispatch_get_main_queue(), ^{
      
      FatosMapView *fatosMapView = [FatosMapView sharedMapView];
      
      if(fatosMapView != nil)
      {
        [fatosMapView SetMapShiftCenter:hCenter vCenter:vCenter];
      }
      
    });
}

RCT_EXPORT_METHOD(SetTouchState:(int)state)
{
    dispatch_sync(dispatch_get_main_queue(), ^{
      
      FatosMapView *fatosMapView = [FatosMapView sharedMapView];
      
      if(fatosMapView != nil)
      {
        [fatosMapView SetTouchState:state];
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
        
        NSMutableDictionary *jsonDic = [NSMutableDictionary new];
        [jsonDic setValue:[NSString stringWithFormat:@"%f", xlon] forKey:@"xlon"];
        [jsonDic setValue:[NSString stringWithFormat:@"%f", ylat] forKey:@"ylat"];
        
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonDic options:NSJSONWritingPrettyPrinted error:nil];
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    
        NSString *strResult = jsonString;
        callback(@[[NSNull null], strResult]);
    }
  });
}

RCT_EXPORT_METHOD(GetMapCenter:(RCTResponseSenderBlock)callback)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
        float hCenter;
        float vCenter;
        
        [fatosMapView GetMapCenter:&hCenter vCenter:&vCenter];
        
        NSMutableDictionary *jsonDic = [NSMutableDictionary new];
        [jsonDic setValue:[NSString stringWithFormat:@"%f", hCenter] forKey:@"hCenter"];
        [jsonDic setValue:[NSString stringWithFormat:@"%f", vCenter] forKey:@"vCenter"];
        
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonDic options:NSJSONWritingPrettyPrinted error:nil];
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    
        NSString *strResult = jsonString;
        callback(@[[NSNull null], strResult]);
    }
  });
}

RCT_EXPORT_METHOD(GetMapShiftCenter:(RCTResponseSenderBlock)callback)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
        float hCenter = 0;
        float vCenter = 0;
        double xlon = 0;
        double ylat = 0;
        
        [fatosMapView GetMapShiftCenter:&hCenter vCenter:&vCenter];
        [fatosMapView ConvWorldtoWGS84:hCenter y:vCenter xlon:&xlon ylat:&ylat];
        
        NSMutableDictionary *jsonDic = [NSMutableDictionary new];
        [jsonDic setValue:[NSString stringWithFormat:@"%f", xlon] forKey:@"xlon"];
        [jsonDic setValue:[NSString stringWithFormat:@"%f", ylat] forKey:@"ylat"];
        
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonDic options:NSJSONWritingPrettyPrinted error:nil];
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    
        NSString *strResult = jsonString;
        callback(@[[NSNull null], strResult]);
    }
  });
}

RCT_EXPORT_METHOD(GetPosWorldtoWGS84FromScreen:(float)fCenterX fCenterY:(float)fCenterY callback:(RCTResponseSenderBlock)callback)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    FatosMapView *fatosMapView = [FatosMapView sharedMapView];
    
    if(fatosMapView != nil)
    {
        int nMapCurPosX = 0;
        int nMapCurPosY = 0;
        double xlon = 0;
        double ylat = 0;
        
        [fatosMapView GetPosWorldFromScreen:fCenterX fCenterY:fCenterY nMapCurPosX:&nMapCurPosX nMapCurPosY:&nMapCurPosY];
        [fatosMapView ConvWorldtoWGS84:nMapCurPosX y:nMapCurPosY xlon:&xlon ylat:&ylat];
    
        NSMutableDictionary *jsonDic = [NSMutableDictionary new];
        [jsonDic setValue:[NSString stringWithFormat:@"%f", xlon] forKey:@"xlon"];
        [jsonDic setValue:[NSString stringWithFormat:@"%f", ylat] forKey:@"ylat"];
    
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonDic options:NSJSONWritingPrettyPrinted error:nil];
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    
        NSString *strResult = jsonString;
        callback(@[[NSNull null], strResult]);
    }
  });
}

RCT_EXPORT_METHOD(GetFitLevelMBR_wgs84:(NSDictionary *)dmin dmax:(NSDictionary *)dmax callback:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
      FatosMapView *fatosMapView = [FatosMapView sharedMapView];
      
      if(fatosMapView != nil)
      {
          CGPoint min;
          CGPoint max;
          
          min.x = [[dmin objectForKey:@"x"] floatValue];
          min.y = [[dmin objectForKey:@"y"] floatValue];
          max.x = [[dmax objectForKey:@"x"] floatValue];
          max.y = [[dmax objectForKey:@"y"] floatValue];
          
          float fLevel = 0.0f;
          [fatosMapView GetFitLevelMBR_wgs84:min dmax:max fLevel:&fLevel];
          NSNumber *number = [NSNumber numberWithFloat:fLevel];
          
          NSMutableDictionary *jsonDic = [NSMutableDictionary new];
          [jsonDic setValue:number forKey:@"level"];
          NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonDic options:NSJSONWritingPrettyPrinted error:nil];
          NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
      
          NSString *strResult = jsonString;
          callback(@[[NSNull null], strResult]);
      }
    });
}

RCT_EXPORT_METHOD(GetFitLevelPosArray:(NSDictionary *)vscaleScreen wgs84Array:(NSArray *)wgs84Array callback:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        FatosMapView *fatosMapView = [FatosMapView sharedMapView];

        if(fatosMapView != nil)
        {
            CGPoint vscale;

            vscale.x = [[vscaleScreen objectForKey:@"x"] floatValue];
            vscale.y = [[vscaleScreen objectForKey:@"y"] floatValue];

            float fLevel = 0.0f;
            CGPoint wgs84Center;
            [fatosMapView GetFitLevelPosArray:vscale fLevel:&fLevel wgs84Center:&wgs84Center wgs84Array:wgs84Array];

            NSNumber *level = [NSNumber numberWithFloat:fLevel];
            NSNumber *centerX = [NSNumber numberWithFloat:wgs84Center.x];
            NSNumber *centerY = [NSNumber numberWithFloat:wgs84Center.y];

            NSMutableDictionary *jsonDic = [NSMutableDictionary new];
            [jsonDic setValue:level forKey:@"level"];
            [jsonDic setValue:centerX forKey:@"x"];
            [jsonDic setValue:centerY forKey:@"y"];
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

- (void) UpdatePickerInfo:(NSString *)strID nLong:(int)nLong nLat:(int)nLat
{
    if(isListener)
    {        
        NSMutableDictionary *pickerInfo = [FatosUtil getJsonDictionary:strID];
        
        NSString *nsID = [FatosUtil getStringValue:[pickerInfo objectForKey:@"id"]];
        NSString *nsType = [FatosUtil getStringValue:[pickerInfo objectForKey:@"type"]];
        NSString *nsName = [FatosUtil getStringValue:[pickerInfo objectForKey:@"name"]];
      
        NSNumber *nsLong = [NSNumber numberWithInt:nLong];
        NSNumber *nsLat = [NSNumber numberWithInt:nLat];
        
        NSMutableDictionary *jsonDic = [NSMutableDictionary new];
        [jsonDic setValue:nsID forKey:@"id"];
        [jsonDic setValue:nsType forKey:@"type"];
        [jsonDic setValue:nsName forKey:@"name"];
        [jsonDic setValue:nsLong forKey:@"nLong"];
        [jsonDic setValue:nsLat forKey:@"nLat"];
      
        [self sendEventWithName:@"UpdatePickerInfoListener" body:jsonDic];
    }
}

- (void) MapReadyListener
{
  [self sendEventWithName:@"MapReadyListener" body:@""];
}

@end
