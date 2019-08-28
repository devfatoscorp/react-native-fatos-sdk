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
  
  static float M_TO_KNOTS_F;
  
  static float MPS_TO_KMPH;
  
private:
  static const char* INVALID_GPRMC_DATA;
  
  static string checkSum(string msg);
  static string toHexString(int value);
  
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
