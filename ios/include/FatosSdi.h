//
//  FatosSdi.h
//  Fatos
//
//  Created by 심규빈 on 2020/02/17.
//  Copyright © 2020 유춘성. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface FatosSdi : UIView

@property (weak, nonatomic) IBOutlet UIImageView *img1;
@property (weak, nonatomic) IBOutlet UIImageView *img2;
@property (weak, nonatomic) IBOutlet UIImageView *traffic;
@property (weak, nonatomic) IBOutlet UIImageView *movecamera;
@property (weak, nonatomic) IBOutlet UIImageView *andoround;
@property (weak, nonatomic) IBOutlet UILabel *dist;
@property (weak, nonatomic) IBOutlet UILabel *cameraSpeedText1;
@property (weak, nonatomic) IBOutlet UILabel *cameraSpeedText2;
@property (weak, nonatomic) IBOutlet UILabel *cameraSpeedText3;
@property (weak, nonatomic) IBOutlet UILabel *cameraSpeedText4;
@property (weak, nonatomic) IBOutlet UIView *crackdown;
@property (weak, nonatomic) IBOutlet UILabel *crackdown_text1;
@property (weak, nonatomic) IBOutlet UILabel *crackdown_text2;
@property (weak, nonatomic) IBOutlet UILabel *crackdown_text3;

- (void)initSdi;

@end

NS_ASSUME_NONNULL_END
