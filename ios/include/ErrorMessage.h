//
//  ErrorMessage.h
//  FatosRNApp
//
//  Created by 유춘성 on 25/03/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface ErrorMessage : NSObject
+ (NSString* const) getErrMsg:(int)errorCode;
@end

extern int const ADDR_SEARCH_ERROR;
extern int const ADDR_SEARCH_SUCCESS;

extern NSString* const ADDR_SEARCH_RESULT;
extern NSString* const ADDR_SEARCH_SUCCESS_RESULT;
extern NSString* const ADDR_FIX_CURPOS_SEARCH_SUCCESS;
extern NSString* const ADDR_SEARCH_ERROR_RESULT;

extern NSString* const HTTP_RESULT;
extern NSString* const HTTP_CODE;
extern NSString* const COMM_TYPE;

extern NSString* const POI_SUCCESS_RESULT;

extern NSString* const RP_SUCCESS_RESULT;
extern NSString* const RP_REROUTE_SUCCESS_RESULT;

extern NSString* const TIMEOUT_RESULT;

extern NSString* const FAIL_MAP_RESULT;

extern NSString* const FAIL_RP_RESULT;

extern NSString* const RESULT;

extern NSString* const ERROR_INFOSEED_RESULT;
extern NSString* const ERROR_GOOGLE_RESULT;
extern NSString* const ERROR_NAVER_RESULT;
extern NSString* const ERROR_EVWARE_RESULT;
extern NSString* const ERROR_AUTH_RESULT;
extern NSString* const ERROR_ADDR_RESULT;

extern NSString* const SUCCESS_INFOSEED_RESULT;
extern NSString* const SUCCESS_GOOGLE_RESULT;
extern NSString* const SUCCESS_NAVER_RESULT;
extern NSString* const SUCCESS_EVWARE_RESULT;
extern NSString* const SUCCESS_SEARCH_SUCCESS;
extern NSString* const SUCCESS_SEARCH_ADDRESS_SUCCESS;
extern NSString* const SUCCESS_AUTH;


extern int const INVALIED_STARTGOAL_SAME;
extern int const INVALIED_STARTGOAL_NULL;
extern int const INVALIED_START_NULL;
extern int const INVALIED_GOAL_NULL;
extern int const INVALIED_ROUTE_FAILED;
extern int const INVALIED_NULL;
extern int const INVALIED_STARTPOS_NOT_SELECTED;
extern int const INVALIED_GOALPOS_NOT_SELECTED;

extern int const VALIED_FUC;


NS_ASSUME_NONNULL_END
