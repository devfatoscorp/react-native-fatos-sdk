export default {
  eTestFlag: {
    USER_LINE_TEST: false,
    MARKER_TEST: false
  },

  // RGBA 는 react용 컬러 포맷

  SMMMARY_PAGE_COLOR_1: {
    RGBA: "rgba(216, 96, 97, 1.0)"
  },

  SMMMARY_PAGE_COLOR_2: {
    RGBA: "rgba(121, 183, 89, 1.0)"
  },

  SMMMARY_PAGE_COLOR_3: {
    RGBA: "rgba(96, 182, 165, 1.0)"
  },

  SMMMARY_COLOR_1: {
    R: 255,
    G: 108,
    B: 108,
    A: 255,
    RGBA: "rgba(255, 108, 108, 1.0)"
  },

  SMMMARY_COLOR_2: {
    R: 21,
    G: 181,
    B: 36,
    A: 255,
    RGBA: "rgba(21, 181, 36, 1.0)"
  },

  SMMMARY_COLOR_3: {
    R: 2,
    G: 228,
    B: 193,
    A: 255,
    RGBA: "rgba(2, 228, 193, 1.0)"
  },

  SMMMARY_COLOR_4: {
    R: 176,
    G: 106,
    B: 255,
    A: 255,
    RGBA: "rgba(176, 106, 255, 1.0)"
  },

  SMMMARY_COLOR_5: {
    R: 252,
    G: 194,
    B: 62,
    A: 255,
    RGBA: "rgba(252, 194, 62, 1.0)"
  },

  SMMMARY_COLOR_6: {
    R: 103,
    G: 150,
    B: 255,
    A: 255,
    RGBA: "rgba(103, 150, 255, 1.0)"
  },

  SMMMARY_COLOR_7: {
    R: 21,
    G: 181,
    B: 36,
    A: 255,
    RGBA: "rgba(21, 181, 36, 1.0)"
  },

  COLORS: {
    SMMMARY_COLOR: [
      this.SMMMARY_COLOR_1,
      this.SMMMARY_COLOR_2,
      this.SMMMARY_COLOR_3,
      this.SMMMARY_COLOR_4,
      this.SMMMARY_COLOR_5,
      this.SMMMARY_COLOR_6,
      this.SMMMARY_COLOR_7
    ]
  },

  eTypeRoute: {
    eTYPE_ROUTE_DEFAULT: 0, // 초기탐색
    eTYPE_ROUTE_REROUTE: 1, // 재탐색
    eTYPE_ROUTE_PERIODIC: 2 // 주기적 재탐색
  },

  eDriveMode: {
    eDrive_None: 0,
    eDrive_RG: 1,
    eDrive_Simulation: 2,
    eDrive_Ando: 3
  },

  LANGUAGE_TYPE: {
    eLANGUAGE_TYPE_SMALL: 0, // 한국어
    eLANGUAGE_TYPE_ENGLISH: 1 // 영어
  },

  wecountry_names: ["한국어", "English"],

  wecountry_codes: ["TH", "VN", "SG", "PH", "MM", "MY", "LA", "KH", "BN", "KR"],

  MAX_ROUTE_OPTION: 4,
  TEST_BUTTON: false,

  SEARCH_VIEW_HIDE_TIME: 7000 // 7초
};
