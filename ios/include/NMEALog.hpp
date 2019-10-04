//
//  NMEALog.hpp
//  FatosRNApp
//
//  Created by 유춘성 on 04/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef NMEALog_hpp
#define NMEALog_hpp

#include <stdio.h>

class NMEAFile;

class NMEALog {
public:
  NMEALog();
  ~NMEALog();
  
public:
  bool init(const char* pszFilePath);
  bool isAble();
  
  void NextSendGPS();
  void close();
  
protected:
  bool m_bAble;
  char m_szFileName[1024];
  NMEAFile* m_pNMEAFile;
};

#endif /* NMEALog_hpp */

