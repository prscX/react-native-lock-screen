package ui.lockscreen;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RNLockScreenModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNLockScreenModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNLockScreen";
  }
} 