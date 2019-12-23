package com.mymemorymaker;
import org.devio.rn.splashscreen.SplashScreen; //For react-native-splash-screen
import com.facebook.react.ReactActivity;
import android.os.Bundle; //For react-native-splash-scr
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "mymemorymaker";
    }
     @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }
}
