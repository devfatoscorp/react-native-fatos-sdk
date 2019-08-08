//
//  FatosMapUtil.h
//  FatosRNApp
//
//  Created by 심규빈 on 21/03/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

#ifndef FatosMapUtil_h
#define FatosMapUtil_h

@interface FatosMapUtil : NSObject
+ (const char*)getMapFontData;
+ (BOOL)createDirectory:(NSString *)currentPath directoryName:(NSString *)directoryName;
+ (BOOL)copyAssetMapResourc:(NSString *)assetFileName targetFileName:(NSString *)targetFileName;
+ (int)getDPI;
@end

#endif /* FatosMapUtil_h */
