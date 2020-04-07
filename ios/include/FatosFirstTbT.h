//
//  FatosFirstTbT.h
//  Fatos
//
//  Created by 심규빈 on 2020/02/14.
//  Copyright © 2020 유춘성. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface FatosFirstTbT : UIView
@property (weak, nonatomic) IBOutlet UIImageView *background;
@property (weak, nonatomic) IBOutlet UIImageView *tbtImg;
@property (weak, nonatomic) IBOutlet UILabel *comment;

- (void)initFirstTbT;

@end

NS_ASSUME_NONNULL_END
