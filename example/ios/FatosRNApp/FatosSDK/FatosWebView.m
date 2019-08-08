//
//  FatosWebView.m
//  FatosRNApp
//
//  Created by 심규빈 on 24/05/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "FatosWebView.h"

@implementation FatosWebView

- (void)layoutSubviews
{
  [super layoutSubviews];
  
  // Ensure webview takes the position and dimensions of RCTWKWebView
  self.frame = self.bounds;
}

- (void)setHidden:(BOOL)hidden
{
  // react 에서 화면 전환시 강제로 hidden YES 값 셋팅
  // setWebViewVisible 사용할것
  return;
}

- (void)setWebViewVisible:(BOOL)bVisible
{
  [super setHidden:!bVisible];
}

- (void)setWebviewZoomDisable
{
  //  [[webView scrollView] setScrollEnabled:NO];
  //  [[webView scrollView] setBounces:NO];
  //  [[[webView scrollView] panGestureRecognizer]setEnabled:NO];
  
  NSString *javascript = @"var meta = document.createElement('meta');meta.setAttribute('name', 'viewport');meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');document.getElementsByTagName('head')[0].appendChild(meta);";
  
  [self evaluateJavaScript:javascript completionHandler:nil];
}

@end
