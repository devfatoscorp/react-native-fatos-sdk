//
//  FatosMapControlView.h
//  Fatos
//
//  Created by 심규빈 on 2020/01/30.
//  Copyright © 2020 유춘성. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class FatosMapView;

@interface FatosMapControlView : UIView
    
@property (weak, nonatomic) IBOutlet UIButton   *compass;
@property (weak, nonatomic) IBOutlet UIButton   *aero;
@property (weak, nonatomic) IBOutlet UIButton   *zoomup;
@property (weak, nonatomic) IBOutlet UILabel    *zoomlevel;
@property (weak, nonatomic) IBOutlet UIButton   *zoomdown;
@property (weak, nonatomic) IBOutlet UIButton   *currpos;
@property (weak, nonatomic) IBOutlet UIImageView *zoomLevelback;
@property (weak, nonatomic) IBOutlet UIImageView *currposImg;
@property (weak, nonatomic) IBOutlet UIImageView *compassImg;
@property (weak, nonatomic) IBOutlet UIImageView *aeroImg;

- (void)initMapControlView:(FatosMapView *)pMapView;
- (void)mapLevelUpdate:(int)nLevel;
- (void)touchMoveMode:(int)nMode;
- (void)currposButtonVisible:(BOOL)visible;

- (IBAction)compassClick:(id)sender;
- (IBAction)aeroClick:(id)sender;
- (IBAction)zoomupBegin:(id)sender;
- (IBAction)zoomupEnd:(id)sender;
- (IBAction)zoomdownBegin:(id)sender;
- (IBAction)zoomdownEnd:(id)sender;
- (IBAction)currposClick:(id)sender;

@end

NS_ASSUME_NONNULL_END
