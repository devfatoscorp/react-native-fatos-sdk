import I18n, { getLanguages } from "react-native-i18n";
import COMMON from "../common/common";

I18n.fallbacks = true;

I18n.translations = {
  ko: require("../translations/ko"),
  en: require("../translations/en")
};

const LANGUAGE_TYPE = ["ko", "en"];
const DEFAULT_LANGUAGE =
  LANGUAGE_TYPE[COMMON.LANGUAGE_TYPE.eLANGUAGE_TYPE_SMALL];

export default class FatosLanguageManager {
  static m_pInstance = null;

  mLanguageIndex = 0;
  m_cbList = new Map();

  static GetInstance() {
    if (FatosLanguageManager.m_pInstance === null) {
      FatosLanguageManager.m_pInstance = new FatosLanguageManager();
      FatosLanguageManager.m_pInstance.init();
    }

    return this.m_pInstance;
  }

  init() {
    this.setLanguage(DEFAULT_LANGUAGE);
  }

  setLanguage(index) {

    if (this.mLanguageIndex !== index) {
      I18n.locale = LANGUAGE_TYPE[index];
      this.mLanguageIndex = index;
      this.onNotify();
    }
  }

  getLanguageIndex() {
    return this.mLanguageIndex;
  }

  getCodeName(cd) {
    return I18n.t(cd);
  }

  addCalback(pCallback, pkey) {
    this.m_cbList.set(pkey, pCallback);
  }

  removeCallback(pKey) {
    this.m_cbList.delete(pKey);
  }

  onNotify() {
    for (var callback of this.m_cbList.values()) {
      callback();
    }
  }
}
