//
//  FatosNativeBridgeModule.m
//  RCTFatos
//
//  Created by 심규빈 on 2019/10/15.
//  Copyright © 2019 fatos. All rights reserved.
//

#import "FatosNativeBridgeModule.h"

@implementation FatosNativeBridgeModule

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
  // RCTBridgeModule 오버라이드 함수
  return @{@"greeting": @"Welcome to the DevDactic\n React Native (iOS) Tutorial, right?!"};
}

- (NSArray<NSString *> *)supportedEvents
{
  //RCTEventEmitter 오버라이드 함수
  //RCTEventEmitter 사용하는 이벤트 명을 등록해줘야 한다
  return @[@""];
}

RCT_EXPORT_METHOD(SetUserDefaults:(NSString *)strKey value:(NSString *)strValue)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    [[NSUserDefaults standardUserDefaults] setObject:strValue forKey:strKey];

  });
}

RCT_EXPORT_METHOD(GetUserDefaults:(NSString *)strKey callback:(RCTResponseSenderBlock)callback)
{
  NSString *strResult = [[NSUserDefaults standardUserDefaults] stringForKey:strKey];
  
  if(strResult == nil)
  {
    strResult = @"";
  }
  
  callback(@[[NSNull null], strResult]);
}

@end
