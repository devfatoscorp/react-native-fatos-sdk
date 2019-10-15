import {NativeModules, NativeEventEmitter} from 'react-native';

export default class FatosNativeMng {
    static m_pInstance = null;
    // Native bridge
    nativeAPI = null; // js to native
    nativeEmt = null; // native to js

    static GetInstance() {
        if (FatosNativeMng.m_pInstance === null) {
            FatosNativeMng.m_pInstance = new FatosNativeMng();
            FatosNativeMng.m_pInstance.init();
        }
        return this.m_pInstance;
    }

    init() {
        this.nativeAPI = NativeModules.FatosNativeBridgeModule;
        this.nativeEmt = new NativeEventEmitter(NativeModules.FatosNativeBridgeModule);
    }

    setUserDefaults(strKey, strValue)
    {
        this.nativeAPI.SetUserDefaults(strKey, strValue);
    }

    getUserDefaults(strKey)
    {
        this.nativeAPI.GetIsPermission(strKey, (error, result) => {
            if (error) {
                console.error(error);
            } else {
                cb(result);
            }
        });
    }
}
