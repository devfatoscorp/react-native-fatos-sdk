//
//  FatosUtil.h
//  FatosRNApp
//
//  Created by 유춘성 on 04/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface FatosUtil : NSObject {
  
}

- (NSString*) getLibraryPath;
- (NSString*) getDocumentsPath;
- (NSString*) getLibCachePath;
- (NSString*) getGPSLogPath;
- (NSString*) getGPSLogPlayPath;
+ (NSString *)getAssetsPath;
+ (NSString *)getMarkerPath;
+ (NSMutableDictionary *) getJsonDictionary:(NSString *)jsonString;
+ (NSString *)getStringValue:(NSObject *)value;
+ (void) setKeepScreenOn:(BOOL)value;
+ (NSBundle *) getResourcebundle;
+ (NSString *) getResourceLocalizedString:(nullable NSString *)key comment:(nullable NSString *)comment;
+ (UIImage *) getResourceImage:(nullable NSString *)path filename:(nullable NSString *)filename;
+ (UIImage *) resizeImage:(nullable UIImage *)image imageSize:(CGSize)size;
+ (UIColor *) getUIColor:(CGFloat)red green:(CGFloat)green blue:(CGFloat)blue alpha:(CGFloat)alpha;

@end

NS_ASSUME_NONNULL_END
