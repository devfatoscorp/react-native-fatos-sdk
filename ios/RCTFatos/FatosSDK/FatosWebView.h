//
//  FatosWebView.h
//  FatosRNApp
//
//  Created by 심규빈 on 24/05/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef FatosWebView_h
#define FatosWebView_h

#import <WebKit/WebKit.h>

@interface FatosWebView : WKWebView  {
  
}

- (void)setWebViewVisible:(BOOL)bVisible;
- (void)setWebviewZoomDisable;

@end

#endif /* FatosWebView_h */
