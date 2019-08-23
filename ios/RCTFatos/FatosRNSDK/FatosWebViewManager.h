//
//  FatosWebViewManager.h
//  FatosRNApp
//
//  Created by 심규빈 on 29/03/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef FatosWebViewManager_h
#define FatosWebViewManager_h

#import <React/Views/RCTViewManager.h>
#import <WebKit/WebKit.h>
#import "FatosMapView.h"
#import "FatosWebView.h"

NS_ASSUME_NONNULL_BEGIN

typedef struct {
  const char *userID;
  const char *tID;
  const char *companyID;
} UserInfo;

typedef struct {
  const char *shipid;
  const char *barcodenum;
  const char *tagginginfo;
  int goalindx;
  double barX;
  double barY;
} barcodedata;

typedef struct {
  const char *updatetime;
  std::vector<barcodedata> barcodedatas;
} BarcodeInfo;

@interface FatosWebViewManager : RCTViewManager <WKUIDelegate, WKNavigationDelegate, WKScriptMessageHandler> {

  FatosWebView *fatosWebView;
  WKWebViewConfiguration *config;
  WKUserContentController *jsctrl;
  
  UserInfo mUserInfo;
  bool mbln_BarcodeEnable;
  BarcodeInfo mBarcodeInfo;
}

- (void)setWebViewVisible:(BOOL)bVisible;
- (void)onGoTask;

@end

NS_ASSUME_NONNULL_END

#endif /* FatosWebViewManager_h */
