//
//  FatosRouteModule.m
//  FatosRNApp
//
//  Created by 심규빈 on 17/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "FatosNaviBridgeModule.h"
#import "FatosAppDelegate.h"
#import "FatosWebViewManager.h"
#import "FatosEnvironment.h"
#import "FatoseSettingManager.h"
#import <FatosNaviModule.h>

@implementation FatosNaviBridgeModule

// The React Native bridge needs to know our module
RCT_EXPORT_MODULE()

-(id)init{
  
  self = [super init];
  if(self) {
    isListener = NO;
    isIndicator = NO;
    [FatosAppDelegate sharedAppDelegate].fatosNaviBridgeModule = self;
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
  return @[@"UpdateRGListener", @"RouteResultListener", @"ShowIndicatorListener", @"HideIndicatorListener",
           @"PermissionCompleteListener", @"ShowWebViewListener", @"HideWebViewListener", @"SearchResultListener"];
}

/** js -> ios **/
RCT_EXPORT_METHOD(setListener:(NSString *)value)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    if([value isEqualToString:@"1"])
    {
      self->isListener = YES;
    }
    
  });
}

RCT_EXPORT_METHOD(Rescan)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
    
    if(module)
    {
      [module ReRoute];
    }
    
//    if(FatosNavi::IsRoute())
//    {
//      FatosNavi::StartSimulation(0);      // 0 번째 경로 모의주행 시작
//      //       FatosNavi::RepeatSimulation(true);  // 모의주행 반복
//    }
    
  });
}



RCT_EXPORT_METHOD(Route:(NSString *)startLat startLon:(NSString *)startLon
                  goalLat:(NSString *)goalLat goalLon:(NSString *)goalLon)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
    
    if(module)
    {
      
      // 기본경로 탐색 셋팅
      NSArray *arr = [[FatosEnvironment sharedObject] getNavigationOptions];
      std::string strFeeOption;
      for(int i = 0; i < [arr count]; ++i)
      {
        bool val = ([[arr objectAtIndex: i] boolValue] == YES) ? true : false;
        if(val)
        {
          strFeeOption.append([[FatoseSettingManager sharedObject] getFeeOption:i]);
        }
      }
      
      [module Route:startLat startLon:startLon goalLat:goalLat goalLon:goalLon strFeeOption:[NSString stringWithUTF8String:strFeeOption.c_str()]];
    }
    
  });
}

/************** 테스트 버튼 처리 ******************/

RCT_EXPORT_METHOD(RouteTest1)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
    
    if(module)
    {
      [module RouteTest1];
    }
    
  });
}

RCT_EXPORT_METHOD(RouteTest2)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
    
    if(module)
    {
      [module RouteTest2];
    }
    
  });
}

RCT_EXPORT_METHOD(RouteTest3)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
    
    if(module)
    {
      [module RouteTest3];
    }
    
  });
}

/**************************************************/


RCT_EXPORT_METHOD(CancelRoute)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
    
    if(module)
    {
      [module CancelRoute];
    }
    
  });
}

RCT_EXPORT_METHOD(CancelDriving)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosWebViewManager *webViewManager = [FatosAppDelegate sharedAppDelegate].webViewManager;
    
    if(webViewManager != nil)
    {
      [webViewManager setWebViewVisible:true];
    }
    
  });
}

RCT_EXPORT_METHOD(GoTask)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosWebViewManager *webViewManager = [FatosAppDelegate sharedAppDelegate].webViewManager;
    
    if(webViewManager != nil)
    {
      [webViewManager onGoTask];
      [webViewManager setWebViewVisible:true];
    }
   
  });
}

RCT_EXPORT_METHOD(StartSimulation)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
    
    if(module)
    {
      [module StartSimulation:0];
    }
    
  });
}

RCT_EXPORT_METHOD(DriveControl:(int)value)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
    
    if(module)
    {
      [module DriveControl:value];
    }

  });
}

RCT_EXPORT_METHOD(DriveSpeed:(int)value)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
    
    if(module)
    {
      [module DriveSpeed:value];
    }
    
  });
}

RCT_EXPORT_METHOD(DriveClose)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
    
    if(module)
    {
      [module DriveClose];
    }
    
    // 0번이 초기재탐색
    [self RouteResultListener:0];
  });
}

RCT_EXPORT_METHOD(Search:(NSString *)searchText)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
    
    if(module)
    {
      [self ShowIndicatorListener];
     
      dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_LOW, 0), ^{
      
        NSString *strResult = [module RequestFtsSearchService:searchText];
        [self SearchResultListener:[strResult UTF8String]];
        [self HideIndicatorListener];
      });
    }

  });
}

RCT_EXPORT_METHOD(StartRouteGuidance:(int)index)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
    
    if(module)
    {
      [module StartRouteGuidance:index];
    }
    
  });
}

RCT_EXPORT_METHOD(StartSimulation:(int)index)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
    
    if(module)
    {
      [module StartSimulation:index];
    }
    
  });
}

/** callback **/

RCT_EXPORT_METHOD(GetRouteSummaryJson:(RCTResponseSenderBlock)callback)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
    
    if(module)
    {
      NSString *strResult = [module GetRouteSummaryJson];
      callback(@[[NSNull null], strResult]);
    }
  });
}

/** ios -> js **/

- (void) UpdateRGListener:(NSString *)strJson
{
  if(isListener)
  {
    [self sendEventWithName:@"UpdateRGListener" body:strJson];
  }
}

- (void) RouteResultListener:(int)nTypeRoute
{
  if(isListener)
  {
    NSString *strResult = [NSString stringWithFormat:@"%d", nTypeRoute];
    [self sendEventWithName:@"RouteResultListener" body:strResult];
  }
}

-(void) ShowIndicatorListener
{
  if(isListener)
  {
    isIndicator = YES;
    [self sendEventWithName:@"ShowIndicatorListener" body:@""];
  }
}

-(void) HideIndicatorListener
{
  if(isListener)
  {
    isIndicator = NO;
    [self sendEventWithName:@"HideIndicatorListener" body:@""];
  }
}

- (BOOL) IsIndicator
{
  return isIndicator;
}

-(void) ShowWebViewListener
{
  if(isListener)
  {
    [self sendEventWithName:@"ShowWebViewListener" body:@""];
  }
}

-(void) HideWebViewListener
{
  if(isListener)
  {
    [self sendEventWithName:@"HideWebViewListener" body:@""];
  }
}

- (void) PermissionCompleteListener
{
  if(isListener)
  {
    [self sendEventWithName:@"PermissionCompleteListener" body:@""];
  }
}

- (void) SearchResultListener:(const char *)strResult;
{
  if(isListener)
  {
    [self sendEventWithName:@"SearchResultListener" body:[NSString stringWithUTF8String:strResult]];
  }
}

@end

