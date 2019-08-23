//
//  NMEAData.hpp
//  FatosRNApp
//
//  Created by 유춘성 on 02/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef NMEAData_hpp
#define NMEAData_hpp

#include <stdio.h>
#include <string>

using namespace std;

class NMEAData {
public:
  static string getNMEA(double lat, double lon, double alt, double hacc, double vacc, double speed, double angle);
  
private:
  // 1 Meter per Second = 1.9438444924406 Knots
  static float M_TO_KNOTS_F;
  
  // 1 Meter per Second = 3.6 Kilometers per Hour
  static float MPS_TO_KMPH;
  
private:
  static const char* INVALID_GPRMC_DATA;
  
  static string checkSum(string msg);
  static string toHexString(int value);
  
  /** Returns GGA NMEA sentence generated from raw data. */
  // $GPGGA,170834.00,4124.896300,N,08151.683800,W,1,05,1.5,280.2,M,-34.0,M,,,*75
  // $GPGGA,104438.833,4301.1439,N,08803.0338,W,1,05,1.8,185.8,M,-34.2,M,0.0,0000*40
private:
  static string genGPGGA(double lat, double lon, double alt, double hAccuracy);
  static string genGPGLL(double lat, double lon);
  static string genGPGSA(double lat, double lon, double hAccuracy);
  static string genGPRMC(double lat, double lon, double speed, double angle);
  
  static string GenGPGGA_GPGLL_long_lat_descr(double lat, double lon);
  static int getAllSatellites(double hAccuracy);
  static string NMEAChecksum(string sentence);
};

#endif /* NMEAData_hpp */
