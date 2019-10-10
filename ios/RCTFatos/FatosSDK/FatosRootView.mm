//
//  FatosRootView.m
//  FatosRNApp
//
//  Created by 심규빈 on 27/03/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "FatosRootView.h"
#import <NMEAData.hpp>

@implementation FatosRootView

- (instancetype)initWithBundleURL:(NSURL *)bundleURL
                       moduleName:(NSString *)moduleName
                initialProperties:(NSDictionary *)initialProperties
                    launchOptions:(NSDictionary *)launchOptions
{
  return [super initWithBundleURL:bundleURL moduleName:moduleName initialProperties:initialProperties launchOptions:launchOptions];
}

@end

