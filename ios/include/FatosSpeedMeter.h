//
//  FatosSpeedMeter.h
//  Fatos
//
//  Created by 심규빈 on 2020/02/17.
//  Copyright © 2020 유춘성. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface FatosSpeedMeter : UIView
@property (weak, nonatomic) IBOutlet UILabel *speed;

- (void)initSpeedMeter;

@end

NS_ASSUME_NONNULL_END
