//
//  GPSService.h
//  FatosRNApp
//
//  Created by 유춘성 on 04/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreLocation/CoreLocation.h>
#import "NMEALog.hpp"

NS_ASSUME_NONNULL_BEGIN

@protocol GPSServiceDelegate <NSObject>
- (void) didChangeAuthorizationStatus:(CLAuthorizationStatus)status;
@end

@interface GPSService : NSObject <CLLocationManagerDelegate> {
    BOOL  m_isStartLocation;
    int m_status;
    int m_lat;
    int m_lon;
    double m_alt;
    double m_speed;
    double m_hAccuracy;
    double m_vAccuracy;
    double m_angle;
    
    bool m_bSimulGps;
    
    NMEALog m_logFile;
}

@property (nonatomic, retain) CLLocationManager *m_locationManager;
@property (strong, nonatomic) id<GPSServiceDelegate> delegate;

- (int)getLat;
- (int)getlon;
- (void)saveUserDefaultsLocation;
- (void)onSimulGps:(BOOL)val;
- (NSDictionary<NSString *, id> *)getLastLocationEvent;


@end

NS_ASSUME_NONNULL_END
