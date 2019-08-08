import { NativeModules } from 'react-native'

export default class FatosEnvManager {

    static m_pInstance = null;

    seatPosition = 0;

    static GetInstance()
    {
        if (FatosEnvManager.m_pInstance === null)
        {
            FatosEnvManager.m_pInstance = new FatosEnvManager();
            FatosEnvManager.m_pInstance.init();
        }

        return this.m_pInstance;
    }

    init()
    {
        var native = NativeModules.FatosEnvBridgeModule;

        // 운전석위치 셋팅
        native.GetSeatPosition((error, result) => {
            if (error) {
                console.error(error);
            } else {
                this.seatPosition = Number(result);
            }
        })
    }

    getSeatPosition() {
        return this.seatPosition;
    }

    setSeatPosition(val) {
        this.seatPosition = val;
    }
}
