//
//  FatosUtil.h
//  FatosRNApp
//
//  Created by 유춘성 on 04/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface FatosUtil : NSObject {
  
}

- (NSString*) getLibPath;
- (NSString*) getDocumentsPath;
- (NSString*) getLibCachePath;
- (NSString*) getGPSLogPath;
- (NSString*) getGPSLogPlayPath;
+ (NSString *)getAssetsPath;
+ (NSMutableDictionary *) getJsonDictionary:(NSString *)jsonString;
+ (NSString *)getStringValue:(NSObject *)value;
+ (void) setKeepScreenOn:(BOOL)value;

@end

NS_ASSUME_NONNULL_END
