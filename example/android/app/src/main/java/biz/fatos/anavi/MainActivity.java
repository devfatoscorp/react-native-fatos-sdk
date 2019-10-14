package biz.fatos.anavi;

import android.os.Bundle;

import biz.fatos.RCTFatos.FatosActivity;
import biz.fatos.anavi.R;

public class MainActivity extends FatosActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "FatosHi";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        sdk_key = getString(R.string.sdk_key);
        super.onCreate(savedInstanceState);
        initFatosNaviEngine();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    @Override
    public void onStop() {
        super.onStop();
    }

    @Override
    protected void onPause() {
        super.onPause();
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
    }

}
