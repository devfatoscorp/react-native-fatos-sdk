//
//  FatosRouteModule.m
//  FatosRNApp
//
//  Created by 심규빈 on 17/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "FatosNaviBridgeModule.h"
#import "../../FatosAppDelegate.h"
#import "../../FatosRNSDK/FatosWebViewManager.h"
#import "../../FatosSDK/FatoseSettingManager.h"
#import "FatosEnvironment.h"
#import "FatoseSettingManager.h"
#import <FatosNaviModule.h>
#import <GPSService.h>

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
    return @{@"greeting": @"Welcome to the DevDactic\n React Native (iOS) Tutorial, right?!"};
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"UpdateRGListener", @"RouteResultListener", @"ShowIndicatorListener", @"HideIndicatorListener",
    @"PermissionCompleteListener", @"ShowWebViewListener", @"HideWebViewListener", @"SearchResultListener", @"RouteCompleteListener", @"RequestPermissionsListener", @"InitializeStatusListener", @"ViaCompleteListener"];
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
    });
}

RCT_EXPORT_METHOD(Route:(NSString *)startLat startLon:(NSString *)startLon
                  goalLat:(NSString *)goalLat goalLon:(NSString *)goalLon)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        
        FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
        
        if(module)
        {
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

RCT_EXPORT_METHOD(RouteViapoints:(NSString *)strJson)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        
        FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
        
        if(module)
        {
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
            
            NSError *error;
            NSData *data = [strJson dataUsingEncoding:NSUTF8StringEncoding];
            NSDictionary *jsonDictionary = [NSJSONSerialization JSONObjectWithData:data
                                                                           options:NSJSONReadingMutableContainers
                                                                             error:&error];
            
            [module routeExternal:jsonDictionary strFeeOption:[NSString stringWithUTF8String:strFeeOption.c_str()] bRequest:YES];
            
        }
        
    });
}

RCT_EXPORT_METHOD(UpdateRouteParam:(NSString *)strJson)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        
        FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
        
        if(module)
        {
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
            
            NSError *error;
            NSData *data = [strJson dataUsingEncoding:NSUTF8StringEncoding];
            NSDictionary *jsonDictionary = [NSJSONSerialization JSONObjectWithData:data
                                                                           options:NSJSONReadingMutableContainers
                                                                             error:&error];
            
            [module routeExternal:jsonDictionary strFeeOption:[NSString stringWithUTF8String:strFeeOption.c_str()] bRequest:NO];
            
        }
        
    });
}


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
        [self RouteResultListener:0 ierror:0];
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
                
                NSString *strResult = [module RequestFtsSearchService:searchText option:0];
                [self SearchResultListener:[strResult UTF8String]];
                [self HideIndicatorListener];
            });
        }
        
    });
}


RCT_EXPORT_METHOD(SearchSort:(NSString *)searchText option:(int)option)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        
        FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
        
        if(module)
        {
            [self ShowIndicatorListener];
            
            dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_LOW, 0), ^{
                
                NSString *strResult = [module RequestFtsSearchService:searchText option:option];
                [self SearchResultListener:[strResult UTF8String]];
                [self HideIndicatorListener];
            });
        }
        
    });
}


RCT_EXPORT_METHOD(SearchParam:(NSString *)strParam)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        
        FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
        
        if(module)
        {
            [self ShowIndicatorListener];
            
            dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_LOW, 0), ^{
                
                NSString *strResult = [module RequestFtsSearchService:strParam];
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

RCT_EXPORT_METHOD(SpeakUtterance:(NSString *)strSpeech)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        
        FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
        
        if(module)
        {
            [module SpeakUtterance:strSpeech];
        }
        
    });
}

RCT_EXPORT_METHOD(RequestPermissionsListener)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        
        [[FatosAppDelegate sharedAppDelegate] initFatosNaviEngine:true];
        
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

RCT_EXPORT_METHOD(GetIsPermission:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        
        BOOL mbln_Permission = [[FatosAppDelegate sharedAppDelegate] checkLocationStatus];
        NSString *strResult = (mbln_Permission == YES) ? @"1" : @"0";
        callback(@[[NSNull null], strResult]);
        
    });
}

RCT_EXPORT_METHOD(GetLastLocation:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        
        FatosMapView *fatosMapView = [FatosMapView sharedMapView];
        
        if(fatosMapView != nil)
        {
            int lon = (int)[[NSUserDefaults standardUserDefaults] integerForKey:@"lon"];
            int lat = (int)[[NSUserDefaults standardUserDefaults] integerForKey:@"lat"];
            double xlon = 0;
            double ylat = 0;
            
            if(lon > 0 && lat > 0)
            {
                [fatosMapView ConvWorldtoWGS84:lon y:lat xlon:&xlon ylat:&ylat];
            }
            
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

RCT_EXPORT_METHOD(GetCurrentPosition:(RCTResponseSenderBlock)callback)
{
    GPSService *gpsService = [FatosAppDelegate sharedAppDelegate].gpsService;
    
    if(gpsService)
    {
        NSDictionary *lastLocationEvent = gpsService.getLastLocationEvent;
        callback(@[[NSNull null], lastLocationEvent]);
    }
}

/** ios -> js **/

- (void) UpdateRGListener:(NSString *)strJson
{
    if(isListener)
    {
        [self sendEventWithName:@"UpdateRGListener" body:strJson];
    }
}

- (void) RouteResultListener:(int)nTypeRoute ierror:(int)ierror
{
    if(isListener)
    {
        NSString *msg = @"";
        if(ierror != 0)
        {
            FatosNaviModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
            
            if(module)
            {
                msg = [module GetErrorString:ierror];
            }
        }
        
        [self sendEventWithName:@"RouteResultListener" body:@{@"type": [NSString stringWithFormat:@"%d", nTypeRoute],@"error" : [NSString stringWithFormat:@"%d", ierror], @"msg" : msg}];
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

- (void) RouteCompleteListener
{
    if(isListener)
    {
        [self sendEventWithName:@"RouteCompleteListener" body:@""];
    }
}

- (void) ViaCompleteListener:(NSString *)strJson
{
    if(isListener)
    {
        [self sendEventWithName:@"ViaCompleteListener" body:strJson];
    }
}

- (void) InitializeStatusListener:(int)status value:(NSString *)value
{
    if(isListener)
    {
        [self sendEventWithName:@"InitializeStatusListener" body:@{@"status": [NSNumber numberWithInt:status],@"value" : value}];
    }
}

@end

