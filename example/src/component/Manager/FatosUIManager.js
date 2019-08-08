
export default class FatosUIManager {

    static m_pInstance = null;

    eViewMode = {
        eDefaultView : 0,
        eDrivingView : 1,
        eSummaryView : 2,
    };

    mViewVisibleList = [ true, false, false ];

    static GetInstance()
    {
        if (FatosUIManager.m_pInstance === null)
        {
            FatosUIManager.m_pInstance = new FatosUIManager();
            FatosUIManager.m_pInstance.init();
        }

        return this.m_pInstance;
    }

    init()
    {

    }

    showView(index)
    {
        for(var i = 0; i < this.mViewVisibleList.length; ++ i)
        {
            if(i === index)
            {
                this.mViewVisibleList[i] = true;
            }
            else
            {
                this.mViewVisibleList[i] = false;
            }
        }
    }

    isViewVisible(index)
    {
        return this.mViewVisibleList[index];
    }

    showDefaultView()
    {
        this.showView(this.eViewMode.eDefaultView);
    }

    isDefaultViewVisible()
    {
        return this.isViewVisible(this.eViewMode.eDefaultView);
    }

    showDrivingView ()
    {
        this.showView(this.eViewMode.eDrivingView);
    }

    isDrivingViewVisible()
    {
        return this.isViewVisible(this.eViewMode.eDrivingView);
    }

    showSummaryView()
    {
        this.showView(this.eViewMode.eSummaryView);
    }

    isSummaryViewVisible()
    {
        return this.isViewVisible(this.eViewMode.eSummaryView);
    }
}
