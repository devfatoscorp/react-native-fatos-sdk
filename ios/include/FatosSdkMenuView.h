//
//  FatosSdkMenuView.h
//  Fatos
//
//  Created by 심규빈 on 2020/01/30.
//  Copyright © 2020 유춘성. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface FatosSdkMenuView : UIView<UITextFieldDelegate>

@property (weak, nonatomic) IBOutlet UIButton *routeSummary;
@property (weak, nonatomic) IBOutlet UIButton *selectRouteIndex;
@property (weak, nonatomic) IBOutlet UIButton *cancelRoute;
@property (weak, nonatomic) IBOutlet UIButton *startRoute;
@property (weak, nonatomic) IBOutlet UIButton *reRoute;
@property (weak, nonatomic) IBOutlet UIButton *moveMapLocation;
@property (weak, nonatomic) IBOutlet UITextField *searchTextField;

- (void)initSdkMenuView;
- (IBAction)routeSummaryClick:(id)sender;
- (IBAction)selectRouteIndexClick:(id)sender;
- (IBAction)cancelRouteClick:(id)sender;
- (IBAction)startRouteClick:(id)sender;
- (IBAction)reRouteClick:(id)sender;
- (IBAction)moveMapLocationClick:(id)sender;

@end

NS_ASSUME_NONNULL_END
