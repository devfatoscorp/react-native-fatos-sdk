/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  BOOL ret = [super application:application didFinishLaunchingWithOptions:launchOptions];
  [super setLaunchScreen];
  [super initFatosNaviEngine:YES];
  return ret;
}

- (void)applicationWillResignActive:(UIApplication *)application {
  
  [super applicationWillResignActive:application];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  
  [super applicationDidBecomeActive:application];
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
  
  [super applicationDidEnterBackground:application];
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
  
  [super applicationWillEnterForeground:application];
}

- (void)applicationWillTerminate:(UIApplication *)application {
  
  [super applicationWillTerminate:application];
}

- (void)applicationDidReceiveMemoryWarning:(UIApplication *)application {
  
  [super applicationDidReceiveMemoryWarning:application];
}

@end

