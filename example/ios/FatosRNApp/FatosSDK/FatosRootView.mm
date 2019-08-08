//
//  FatosRootView.m
//  FatosRNApp
//
//  Created by 심규빈 on 27/03/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "FatosRootView.h"
#import "AppDelegate.h"
#import <NMEAData.hpp>
#import <GPSService.h>

@interface FatosRootView () <CLLocationManagerDelegate>

@property (nonatomic, strong) GPSService *gpsService;

@end

@implementation FatosRootView

- (instancetype)initWithBundleURL:(NSURL *)bundleURL
                       moduleName:(NSString *)moduleName
                initialProperties:(NSDictionary *)initialProperties
                    launchOptions:(NSDictionary *)launchOptions
{
  _gpsService = [[GPSService alloc] init];

  return [super initWithBundleURL:bundleURL moduleName:moduleName initialProperties:initialProperties launchOptions:launchOptions];
}

@end

