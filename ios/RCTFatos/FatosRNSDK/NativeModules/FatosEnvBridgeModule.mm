//
//  FatosEnvBridgeModule.mm
//  FatosRNApp
//
//  Created by 심규빈 on 25/06/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "FatosEnvBridgeModule.h"
#import "FatosEnvironment.h"
#import "FatosAppDelegate.h"
#import <FatosMapView.h>
#import <FatosNaviModule.h>
#import "../../FatosSDK/FatoseSettingManager.h"
#import <FatosNaviModule.h>

@implementation FatosEnvBridgeModule

// The React Native bridge needs to know our module
RCT_EXPORT_MODULE()

-(id)init{
  
  self = [super init];
  if(self) {
    
  }
  return self;
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (NSDictionary *)constantsToExport
{
  return @{@"greeting": @"Welcome to the DevDactic\n React Native (iOS) Tutorial, right?!"};
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[];
}

/** js -> ios **/
RCT_EXPORT_METHOD(SetLanguage:(NSString *)value)
{
  dispatch_async(dispatch_get_main_queue(), ^{

    int nLanguage = [value intValue];
    [[FatosEnvironment sharedObject] setLanguage:nLanguage];
    [[FatosEnvironment sharedObject] saveEnvironment];
      
    FatosNaviModule *fatosNaviModule = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
  
    if(fatosNaviModule != nil)
    {
       [fatosNaviModule SetLanguage:nLanguage];
    }
  });
}

RCT_EXPORT_METHOD(SetPathLineColor:(NSString *)value)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    int nType = [value intValue];
    [[FatosEnvironment sharedObject] setPathLineColor:nType];
    [[FatosEnvironment sharedObject] saveEnvironment];
    
    FatosMapView *mapview = [FatosMapView sharedMapView];
    
    if(mapview != nil)
    {
      [mapview SetEnvRouteLineColor:nType];
    }
  });
}

RCT_EXPORT_METHOD(SetNavigationOptions:(NSArray *) array)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    [[FatosEnvironment sharedObject] setNavigationOptions:array];
    [[FatosEnvironment sharedObject] saveEnvironment];
  });
}

RCT_EXPORT_METHOD(SetMapColor:(NSString *) value)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    int val = [value intValue];
    [[FatosEnvironment sharedObject] setMapColor:val];
    [[FatosEnvironment sharedObject] saveEnvironment];
    
    FatosNaviModule *fatosNaviModule = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
    
    if(fatosNaviModule != nil)
    {
      [fatosNaviModule SetNightMode:val];
    }
  });
}

RCT_EXPORT_METHOD(SetSmartDrivingMode:(NSString *) value)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    int nMode = [value intValue];
    [[FatosEnvironment sharedObject] setSmartDrivingMode:nMode];
    [[FatosEnvironment sharedObject] saveEnvironment];
  });
}

RCT_EXPORT_METHOD(SetCamreaOptions:(NSArray *) array)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    [[FatosEnvironment sharedObject] setCamera:array];
    [[FatosEnvironment sharedObject] saveEnvironment];
    
    int start = 0;
    for(int i = 0; i < [array count]; ++i)
    {
      bool val = ([[array objectAtIndex: i] boolValue] == YES) ? true : false;
      [[FatoseSettingManager sharedObject] setAndoService:(start + i) val:val];
    }
    
    [FatosEnvBridgeModule updateSDIInfo];
  });
}

RCT_EXPORT_METHOD(SetOperationState:(NSArray *) array)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    [[FatosEnvironment sharedObject] setOperationState:array];
    [[FatosEnvironment sharedObject] saveEnvironment];
    
    int start = 6;
    for(int i = 0; i < [array count]; ++i)
    {
      bool val = ([[array objectAtIndex: i] boolValue] == YES) ? true : false;
      [[FatoseSettingManager sharedObject] setAndoService:(start + i) val:val];
    }
    
    [FatosEnvBridgeModule updateSDIInfo];
  });
}

RCT_EXPORT_METHOD(SetFacility:(NSArray *) array)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    [[FatosEnvironment sharedObject] setFacility:array];
    [[FatosEnvironment sharedObject] saveEnvironment];
    
    int start = 10;
    for(int i = 0; i < [array count]; ++i)
    {
      bool val = ([[array objectAtIndex: i] boolValue] == YES) ? true : false;
      [[FatoseSettingManager sharedObject] setAndoService:(start + i) val:val];
    }
    
    [FatosEnvBridgeModule updateSDIInfo];
  });
}

RCT_EXPORT_METHOD(SetGuidevoice:(NSString *) value)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    int val = [value intValue];
    [[FatosEnvironment sharedObject] setGuidevoice:val];
    [[FatosEnvironment sharedObject] saveEnvironment];
    
    [FatosEnvBridgeModule UseGuideDB:val];
  });
}

RCT_EXPORT_METHOD(SetRediscover:(NSString *) value)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    int val = [value intValue];
    [[FatosEnvironment sharedObject] setRediscover:val];
    [[FatosEnvironment sharedObject] saveEnvironment];
    
    
    
    [FatosEnvBridgeModule setRouteAutoTime:val];
  });
}

RCT_EXPORT_METHOD(SetWayPoint:(NSString *) value)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    int val = [value intValue];
    [[FatosEnvironment sharedObject] setWayPoint:val];
    [[FatosEnvironment sharedObject] saveEnvironment];
  });
}

RCT_EXPORT_METHOD(SetHiPass:(NSString *) value)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    bool val = [value boolValue] == YES ? true : false;
    [[FatosEnvironment sharedObject] setHipass:val];
    [[FatosEnvironment sharedObject] saveEnvironment];
  });
}

RCT_EXPORT_METHOD(SetCarType:(NSString *) value)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    int val = [value intValue];
    [[FatosEnvironment sharedObject] setCarType:val];
    [[FatosEnvironment sharedObject] saveEnvironment];
  });
}

RCT_EXPORT_METHOD(SetFuel:(NSString *) value)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    int val = [value intValue];
    [[FatosEnvironment sharedObject] setFuel:val];
    [[FatosEnvironment sharedObject] saveEnvironment];
  });
}

RCT_EXPORT_METHOD(SetSeatPosition:(NSString *) value)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    int val = [value intValue];
    [[FatosEnvironment sharedObject] setSeatPosition:val];
    [[FatosEnvironment sharedObject] saveEnvironment];
  });
}

RCT_EXPORT_METHOD(SetCarvata:(NSString *) value)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    int val = [value intValue];
    [[FatosEnvironment sharedObject] setCarvata:val];
    [[FatosEnvironment sharedObject] saveEnvironment];
    
    FatosMapView *mapview = [FatosMapView sharedMapView];
   
    if(mapview != nil)
    {
      [mapview SetCarvata:val];
    }
  });
}

RCT_EXPORT_METHOD(SetDem:(NSString *) value)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    bool val = [value boolValue] == YES ? true : false;
    [[FatosEnvironment sharedObject] setDem:val];
    [[FatosEnvironment sharedObject] saveEnvironment];
    
    FatosMapView *mapview = [FatosMapView sharedMapView];
    
    if(mapview != nil)
    {
      [mapview SetDem:val];
    }

  });
}

RCT_EXPORT_METHOD(SetSimulGps:(NSString *) value)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    bool val = [value boolValue] == YES ? true : false;
    [[FatosEnvironment sharedObject] setSimulGps:val];
    [[FatosEnvironment sharedObject] saveEnvironment];
  });
}

/** callback **/

RCT_EXPORT_METHOD(GetPathLineColor:(RCTResponseSenderBlock)callback)
{
  int nType = [[FatosEnvironment sharedObject] getPathLineColor];
  NSString *strResult = [NSString stringWithFormat:@"%d",nType];
  callback(@[[NSNull null], strResult]);
}

RCT_EXPORT_METHOD(GetLanguage:(RCTResponseSenderBlock)callback)
{
  int nLanguage = [[FatosEnvironment sharedObject] getLanguage];
  NSString *strResult = [NSString stringWithFormat:@"%d",nLanguage];
  callback(@[[NSNull null], strResult]);
}

RCT_EXPORT_METHOD(GetNavigationOptions:(RCTResponseSenderBlock)callback)
{
  NSArray *arr = [[FatosEnvironment sharedObject] getNavigationOptions];
  
  NSString *strResult = nil;
  NSError *error = nil;
  NSData  *data = [NSJSONSerialization dataWithJSONObject:arr options:NSJSONWritingPrettyPrinted error:&error];
  strResult = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
  
  callback(@[[NSNull null], strResult]);
}

RCT_EXPORT_METHOD(GetMapColor:(RCTResponseSenderBlock)callback)
{
  int val = [[FatosEnvironment sharedObject] getMapColor];
  NSString *strResult = [NSString stringWithFormat:@"%d",val];
  callback(@[[NSNull null], strResult]);
}

RCT_EXPORT_METHOD(GetSmartDrivingMode:(RCTResponseSenderBlock)callback)
{
  int nMode = [[FatosEnvironment sharedObject] getSmartDrivingMode];
  NSString *strResult = [NSString stringWithFormat:@"%d",nMode];
  callback(@[[NSNull null], strResult]);
}

RCT_EXPORT_METHOD(GetCamreaOptions:(RCTResponseSenderBlock)callback)
{
  NSArray *arr = [[FatosEnvironment sharedObject] getCamera];
  
  NSString *strResult = nil;
  NSError *error = nil;
  NSData  *data = [NSJSONSerialization dataWithJSONObject:arr options:NSJSONWritingPrettyPrinted error:&error];
  strResult = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
  
  callback(@[[NSNull null], strResult]);
}

RCT_EXPORT_METHOD(GetOperationState:(RCTResponseSenderBlock)callback)
{
  NSArray *arr = [[FatosEnvironment sharedObject] getOperationState];
  
  NSString *strResult = nil;
  NSError *error = nil;
  NSData  *data = [NSJSONSerialization dataWithJSONObject:arr options:NSJSONWritingPrettyPrinted error:&error];
  strResult = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
  
  callback(@[[NSNull null], strResult]);
}

RCT_EXPORT_METHOD(GetFacility:(RCTResponseSenderBlock)callback)
{
  NSArray *arr = [[FatosEnvironment sharedObject] getFacility];
  
  NSString *strResult = nil;
  NSError *error = nil;
  NSData  *data = [NSJSONSerialization dataWithJSONObject:arr options:NSJSONWritingPrettyPrinted error:&error];
  strResult = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
  
  callback(@[[NSNull null], strResult]);
}

RCT_EXPORT_METHOD(GetGuidevoice:(RCTResponseSenderBlock)callback)
{
  int val = [[FatosEnvironment sharedObject] getGuidevoice];
  NSString *strResult = [NSString stringWithFormat:@"%d",val];
  callback(@[[NSNull null], strResult]);
}

RCT_EXPORT_METHOD(GetRediscover:(RCTResponseSenderBlock)callback)
{
  int val = [[FatosEnvironment sharedObject] getRediscover];
  NSString *strResult = [NSString stringWithFormat:@"%d",val];
  callback(@[[NSNull null], strResult]);
}

RCT_EXPORT_METHOD(GetWayPoint:(RCTResponseSenderBlock)callback)
{
  int val = [[FatosEnvironment sharedObject] getWayPoint];
  NSString *strResult = [NSString stringWithFormat:@"%d",val];
  callback(@[[NSNull null], strResult]);
}

RCT_EXPORT_METHOD(GetHiPass:(RCTResponseSenderBlock)callback)
{
  bool val = [[FatosEnvironment sharedObject] getHipass];
  NSString *strResult = val == true ? @"true" : @"false";
  callback(@[[NSNull null], strResult]);
}

RCT_EXPORT_METHOD(GetCarType:(RCTResponseSenderBlock)callback)
{
  int val = [[FatosEnvironment sharedObject] getCarType];
  NSString *strResult = [NSString stringWithFormat:@"%d",val];
  callback(@[[NSNull null], strResult]);
}

RCT_EXPORT_METHOD(GetFuel:(RCTResponseSenderBlock)callback)
{
  int val = [[FatosEnvironment sharedObject] getFuel];
  NSString *strResult = [NSString stringWithFormat:@"%d",val];
  callback(@[[NSNull null], strResult]);
}

RCT_EXPORT_METHOD(GetSeatPosition:(RCTResponseSenderBlock)callback)
{
  int val = [[FatosEnvironment sharedObject] getSeatPosition];
  NSString *strResult = [NSString stringWithFormat:@"%d",val];
  callback(@[[NSNull null], strResult]);
}

RCT_EXPORT_METHOD(GetCarvata:(RCTResponseSenderBlock)callback)
{
  int val = [[FatosEnvironment sharedObject] getCarvata];
  NSString *strResult = [NSString stringWithFormat:@"%d",val];
  callback(@[[NSNull null], strResult]);
}

RCT_EXPORT_METHOD(GetDem:(RCTResponseSenderBlock)callback)
{
  bool val = [[FatosEnvironment sharedObject] getDem];
  NSString *strResult = val == true ? @"true" : @"false";
  callback(@[[NSNull null], strResult]);
}

RCT_EXPORT_METHOD(GetUUID:(RCTResponseSenderBlock)callback)
{
  NSString *strResult = [[[UIDevice currentDevice] identifierForVendor] UUIDString];
  callback(@[[NSNull null], strResult]);
}

RCT_EXPORT_METHOD(GetSimulGps:(RCTResponseSenderBlock)callback)
{
  bool val = [[FatosEnvironment sharedObject] getSimulGps];
  NSString *strResult = val == true ? @"true" : @"false";
  callback(@[[NSNull null], strResult]);
}


/** native api call **/

+ (void) setEnvironmentSDIInfo
{
  int start = 0;
  NSArray *arr = [[FatosEnvironment sharedObject] getCamera];
  
  for(int i = 0; i < [arr count]; ++i)
  {
    bool val = ([[arr objectAtIndex: i] boolValue] == YES) ? true : false;
    [[FatoseSettingManager sharedObject] setAndoService:(start + i) val:val];
  }
  start = 6;
  arr = [[FatosEnvironment sharedObject] getOperationState];
  
  for(int i = 0; i < [arr count]; ++i)
  {
    bool val = ([[arr objectAtIndex: i] boolValue] == YES) ? true : false;
    [[FatoseSettingManager sharedObject] setAndoService:(start + i) val:val];
  }
  
  start = 10;
  arr = [[FatosEnvironment sharedObject] getFacility];
  
  for(int i = 0; i < [arr count]; ++i)
  {
    bool val = ([[arr objectAtIndex: i] boolValue] == YES) ? true : false;
    [[FatoseSettingManager sharedObject] setAndoService:(start + i) val:val];
  }
  
  [FatosEnvBridgeModule updateSDIInfo];
}

+ (void) updateSDIInfo
{
  [[FatoseSettingManager sharedObject] updateSDIInfo];
}

+ (void) UseGuideDB:(int)val
{
  // false - 구글TTS, true - 파토스가이드

  FatosNaviModule *fatosNaviModule = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
  
  if(fatosNaviModule != nil)
  {
    bool blnFatosGuide = false;
    
    if(val == 1)
    {
      blnFatosGuide = true;
    }
    
    [fatosNaviModule SetEnableFATOSGuideWDB:blnFatosGuide];
  }
}

+ (void) setRouteAutoTime:(int)val
{
  FatosNaviModule *fatosNaviModule = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
  
  if(fatosNaviModule != nil)
  {
    int nMin = 5;
    if(val == 1)
    {
      nMin = 10;
    }
    
    [fatosNaviModule SetRouteAutoTime:nMin];
  }
}
@end
