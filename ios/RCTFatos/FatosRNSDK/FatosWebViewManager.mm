//
//  FatosWebViewManager.m
//  FatosRNApp
//
//  Created by 심규빈 on 29/03/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//
#import "FatosWebViewManager.h"
#import "FatosAppDelegate.h"
#import "FatosNaviBridgeModule.h"
#import <FatosBuildConfig.h>
#import <FatosNaviModule.h>

static NSString *strAutologKey = @"autolog";
static NSString *strFleetUrl = @"http://example";

@implementation FatosWebViewManager

RCT_EXPORT_MODULE(FatosWebView);

- (instancetype)init
{
  
  if (self = [super init]) {
    fatosWebView = nil;
    
    [FatosAppDelegate sharedAppDelegate].webViewManager = self;
    
    memset(&mUserInfo, 0, sizeof(UserInfo));
    mbln_BarcodeEnable = false;
    memset(&mBarcodeInfo, 0, sizeof(BarcodeInfo));
  }
  
  return self;
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (UIView *)view
{
  config = [[WKWebViewConfiguration alloc] init];
  jsctrl = [[WKUserContentController alloc] init];
  
  [jsctrl addScriptMessageHandler:self name:@"OnFatosJSSetUserInfo"];
  [jsctrl addScriptMessageHandler:self name:@"OnFatosJSRoute"];
  [jsctrl addScriptMessageHandler:self name:@"OnFatosJSBarcodeEnable"];
  [jsctrl addScriptMessageHandler:self name:@"OnFatosJSGetBarcodeList"];
  [jsctrl addScriptMessageHandler:self name:@"OnFatosJSAutoLogin"];
  
  [config setUserContentController:jsctrl];
  
  CGRect frame = [[UIScreen mainScreen]bounds];
  fatosWebView = [[FatosWebView alloc] initWithFrame:frame configuration:config];
  NSURL *url = [NSURL URLWithString:strFleetUrl];
  
  NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
  [fatosWebView loadRequest:request];
  
  [fatosWebView setUIDelegate:self];
  [fatosWebView setNavigationDelegate:self];
  
  [fatosWebView setWebviewZoomDisable];
  
  FatosNaviBridgeModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviBridgeModule;
  
  if(module)
  {
    [module ShowIndicatorListener];
  }
  
  return fatosWebView;
}

- (void)setWebViewVisible:(BOOL)bVisible
{
  if(fatosWebView != nil)
  {
    [fatosWebView setWebViewVisible:bVisible];
  }
}

- (void)onGoTask
{
  [self taskWindowOpen];
}

- (void)setWebviewZoomDisable
{
  if(fatosWebView != nil)
  {
    [fatosWebView setWebviewZoomDisable];
  }
}

#pragma mark - WKNavigationDelegate

- (void)webView:(WKWebView *)webView didCommitNavigation:(null_unspecified WKNavigation *)navigation {
  [self setWebviewZoomDisable];
}

- (void)webView:(WKWebView *)webView didFinishNavigation:(null_unspecified WKNavigation *)navigation {
  
  [self taskAutoLogin];
  
  FatosNaviBridgeModule *module = [FatosAppDelegate sharedAppDelegate].fatosNaviBridgeModule;
  
  if(module)
  {
    [module HideIndicatorListener];
  }
}

- (void)webView:(WKWebView *)webView didFailNavigation:(null_unspecified WKNavigation *)navigation withError:(NSError *)error {
  
}

#pragma mark - WKScriptMessageHandler
- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message {
  
  if([message.name isEqualToString:@"OnFatosJSSetUserInfo"])
  {
    [self OnFatosJSSetUserInfo:message.body];
  }
  else if([message.name isEqualToString:@"OnFatosJSRoute"])
  {    
    [self OnFatosJSRoute:[FatosUtil getJsonDictionary:message.body]];
  }
  else if([message.name isEqualToString:@"OnFatosJSBarcodeEnable"])
  {
    [self OnFatosJSBarcodeEnable:message.body];
  }
  else if([message.name isEqualToString:@"OnFatosJSGetBarcodeList"])
  {
    [self OnFatosJSGetBarcodeList:[FatosUtil getJsonDictionary:message.body]];
  }
  else if([message.name isEqualToString:@"OnFatosJSAutoLogin"])
  {
    // 오토 로그인 쿠키값 저장
    [self OnFatosJSAutoLogin:message.body];
  }
}

- (void) OnFatosJSSetUserInfo:(NSDictionary *)dic
{
  mUserInfo.userID = [[FatosUtil getStringValue:[dic objectForKey:@"userID"]] UTF8String];
  mUserInfo.tID = [[FatosUtil getStringValue:[dic objectForKey:@"tID"]] UTF8String];
  mUserInfo.companyID = [[FatosUtil getStringValue:[dic objectForKey:@"companyID"]] UTF8String];
}

- (void) OnFatosJSRoute:(NSDictionary *)jsonDic
{
  FatosNaviModule *fatosNaviModule = [FatosAppDelegate sharedAppDelegate].fatosNaviModule;
  
  if(fatosNaviModule == nil)
    return;
  
  [fatosNaviModule routeExternal:jsonDic strFeeOption:nil];
  
  [self setWebViewVisible:NO];
}

#pragma mark - javascript -> ios
- (void) OnFatosJSBarcodeEnable:(NSString *)value
{
  mbln_BarcodeEnable = (bool)[[FatosUtil getStringValue:value] boolValue];;
}

- (void) OnFatosJSGetBarcodeList:(NSDictionary *)jsonDic
{
  if(jsonDic)
  {
    mBarcodeInfo.updatetime = [[FatosUtil getStringValue:[jsonDic objectForKey:@"updatetime"]] UTF8String];
    
    NSArray *jsonArr = [jsonDic objectForKey:@"barcodedatas"];
    
    if(jsonArr)
    {
      mBarcodeInfo.barcodedatas.clear();
      
      for(NSDictionary *node in jsonArr)
      {
        barcodedata info;
        info.shipid = [[FatosUtil getStringValue:[node objectForKey:@"shipid"]] UTF8String];
        info.barcodenum = [[FatosUtil getStringValue:[node objectForKey:@"barcodenum"]] UTF8String];
        info.tagginginfo = [[FatosUtil getStringValue:[node objectForKey:@"tagginginfo"]] UTF8String];
        info.goalindx = [[FatosUtil getStringValue:[node objectForKey:@"goalindx"]] intValue];
        info.barX = [[FatosUtil getStringValue:[node objectForKey:@"barX"]] doubleValue];
        info.barY = [[FatosUtil getStringValue:[node objectForKey:@"barY"]] doubleValue];
        
        mBarcodeInfo.barcodedatas.push_back(info);
      }
    }
  }
}

- (void) OnFatosJSAutoLogin:(NSDictionary *)dic
{
  NSString *strKey = [FatosUtil getStringValue:[dic objectForKey:@"key"]];
  NSString *strValue = [FatosUtil getStringValue:[dic objectForKey:@"value"]];
  
  if(strValue == nil)
  {
    strValue = @"";
  }
  
  [[NSUserDefaults standardUserDefaults] setObject:strValue forKey:strAutologKey];
}

#pragma mark - ios -> javascript

- (void) taskWindowOpen
{
  NSString *gbn = @"1";
  NSString *js = [NSString stringWithFormat:@"taskWindowOpen(%@)", gbn];
 
  [fatosWebView evaluateJavaScript:js completionHandler:^(id result, NSError *error) {
    if (error == nil)
    {
      if (result != nil)
      {
        
      }
    }
    else
    {
      NSLog(@"evaluateJavaScript error : %@", error.localizedDescription);
    }
  }];
}

- (void) taskBarcodeTagging
{
  NSString *BarCode = @"1";
  NSString *deliveryId = @"2";
  NSString *js = [NSString stringWithFormat:@"taskBarcodeTagging(%@,%@)", BarCode, deliveryId];
  
  [fatosWebView evaluateJavaScript:js completionHandler:^(id result, NSError *error) {
    if (error == nil)
    {
      if (result != nil)
      {
        
      }
    }
    else
    {
      NSLog(@"evaluateJavaScript error : %@", error.localizedDescription);
    }
  }];
}

- (void) taskAutoLogin
{
  NSString *strAutolog = [[NSUserDefaults standardUserDefaults] stringForKey:strAutologKey];

  if(strAutolog != nil && [strAutolog length] > 0)
  {
    NSString *js = [NSString stringWithFormat:@"taskAutoLogin(\"%@\")", strAutolog];

    [fatosWebView evaluateJavaScript:js completionHandler:^(id result, NSError *error) {
      if (error == nil)
      {
        if (result != nil)
        {
          
        }
      }
      else
      {
        NSLog(@"evaluateJavaScript error : %@", error.localizedDescription);
      }
    }];
  }
}

@end
