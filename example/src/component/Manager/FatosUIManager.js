import React from "react";
import Toast from "react-native-root-toast";

export default class FatosUIManager {
  static m_pInstance = null;

  eViewMode = {
    eDefaultView: 0,
    eDrivingView: 1,
    eSummaryView: 2
  };

  mViewVisibleList = [true, false, false];

  mDriveMode = 0;

  // ui 에서 사용되는 view
  bottomView = null;
  searchListView = null;
  summarySearchListView = null;
  summarySearchView = null;
  firstTbTView = null;
  secondTbTView = null;
  speedoMeterView = null;
  SDIView = null;
  searchView = null;
  routeSummaryView = null;
  laneView = null;
  hipassView = null;
  RGView = null;
  Dialog = null;
  toast = null;

  // 키보드 상태
  keyboardShow = false;

  // 검색 화면 Visible;
  searchViewVisible;

  // 화면 갱신 함수 포인터
  refreshRenderRef = null;

  // 선택된 경로
  selectRouteLine = 0;

  static GetInstance() {
    if (FatosUIManager.m_pInstance === null) {
      FatosUIManager.m_pInstance = new FatosUIManager();
      FatosUIManager.m_pInstance.init();
    }

    return this.m_pInstance;
  }

  init() {}

  /* ui Visible */
  showView(index) {
    for (var i = 0; i < this.mViewVisibleList.length; ++i) {
      if (i === index) {
        this.mViewVisibleList[i] = true;
      } else {
        this.mViewVisibleList[i] = false;
      }
    }
  }

  isViewVisible(index) {
    return this.mViewVisibleList[index];
  }

  showDefaultView() {
    this.showView(this.eViewMode.eDefaultView);
  }

  isDefaultViewVisible() {
    return this.isViewVisible(this.eViewMode.eDefaultView);
  }

  showDrivingView() {
    this.showView(this.eViewMode.eDrivingView);
  }

  isDrivingViewVisible() {
    return this.isViewVisible(this.eViewMode.eDrivingView);
  }

  showSummaryView() {
    this.showView(this.eViewMode.eSummaryView);
  }

  isSummaryViewVisible() {
    return this.isViewVisible(this.eViewMode.eSummaryView);
  }

  setDriveMode(val) {
    this.mDriveMode = val;
  }

  getDriveMode() {
    return this.mDriveMode;
  }

  /* ui view get/set */

  setBottomView(view) {
    this.bottomView = view;
  }

  getBottomView() {
    return this.bottomView;
  }

  setSearchListView(view) {
    this.searchListView = view;
  }

  getSearchListView() {
    return this.searchListView;
  }

  setSummarySearchListView(view) {
    this.summarySearchListView = view;
  }

  getSummarySearchListView() {
    return this.summarySearchListView;
  }

  setSummarySearchView(view) {
    this.summarySearchView = view;
  }

  getSummarySearchView() {
    return this.summarySearchView;
  }

  setFirstTbTView(view) {
    this.firstTbTView = view;
  }

  getFirstTbTView() {
    return this.firstTbTView;
  }

  setSecondTbTView(view) {
    this.secondTbTView = view;
  }

  getSecondTbTView() {
    return this.secondTbTView;
  }

  setSpeedoMeterView(view) {
    this.speedoMeterView = view;
  }

  getSpeedoMeterView() {
    return this.speedoMeterView;
  }

  setSDIView(view) {
    this.SDIView = view;
  }

  getSDIView() {
    return this.SDIView;
  }

  setSearchView(view) {
    this.searchView = view;
  }

  getSearchView() {
    return this.searchView;
  }

  setRouteSummaryView(view) {
    this.routeSummaryView = view;
  }

  getRouteSummaryView() {
    return this.routeSummaryView;
  }

  setLaneView(view) {
    this.laneView = view;
  }

  getLaneView() {
    return this.laneView;
  }

  setHipassView(view) {
    this.hipassView = view;
  }

  getHipassView() {
    return this.hipassView;
  }

  setRGView(view) {
    this.RGView = view;
  }

  getRGView() {
    return this.RGView;
  }

  setDialog(view) {
    this.Dialog = view;
  }

  getDialog() {
    this.Dialog;
  }

  /* event */

  onSearchClose() {
    if(this.searchListView !== null)
    {
      console.log("simsimsim onSearchClose");
      this.searchListView.clearSearchData();
    }
  }

  setKeyboardShow(val) {
    this.keyboardShow = val;
  }

  iskeyboardShow() {
    return this.keyboardShow;
  }

  setRefreshRenderRef(ref) {
    this.refreshRenderRef = ref;
  }

  onRefreshRender() {
    if (this.refreshRenderRef !== null) {
      this.refreshRenderRef();
    }
  }

  setSearchViewVisible(val) {
    this.searchViewVisible = val;
  }

  isSearchViewVisible() {
    return this.searchViewVisible;
  }

  setSelectRouteLine(index) {
    this.selectRouteLine = index;
  }

  getSelectRouteLine() {
    return this.selectRouteLine;
  }

  showToast(msg) {
    if (this.toast != null) {
      return;
    }

    this.toast = Toast.show(msg, {
      duration: 1000,
      position: -50,
      shadow: true,
      animation: true,
      hideOnPress: false,

      onHidden: () => {
        this.toast.destroy();
        this.toast = null;
      }
    });
  }
}
