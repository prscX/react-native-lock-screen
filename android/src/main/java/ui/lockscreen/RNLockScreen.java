package ui.lockscreen;

import android.app.Activity;
import android.graphics.Color;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.andrognito.patternlockview.PatternLockView;
import com.andrognito.patternlockview.listener.PatternLockViewListener;
import com.andrognito.patternlockview.utils.PatternLockUtils;
import com.andrognito.pinlockview.IndicatorDots;
import com.andrognito.pinlockview.PinLockListener;
import com.andrognito.pinlockview.PinLockView;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.ArrayList;
import java.util.List;

public class RNLockScreen extends ViewGroupManager<ViewGroup> {

    public static final String REACT_CLASS = "RNLockScreen";

    private ThemedReactContext context = null;
    private FrameLayout frameLayout = null;

    private PinLockView pinLockView = null;
    private PatternLockView patternLockView = null;

    private int lock = -1;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected FrameLayout createViewInstance(final ThemedReactContext reactContext) {
        context = reactContext;

        frameLayout = new FrameLayout(reactContext);

        PatternLockView patternLockView = new PatternLockView(reactContext);
        PinLockView pinLockView = new PinLockView(reactContext);

        IndicatorDots dots = new IndicatorDots(reactContext);
        dots.setIndicatorType(IndicatorDots.IndicatorType.FILL_WITH_ANIMATION);

        pinLockView.attachIndicatorDots(dots);

        frameLayout.addView(dots);
        frameLayout.addView(pinLockView);

        return frameLayout;
    }

    @ReactProp(name = "props")
    public void props(final FrameLayout frameLayout, ReadableMap props) {
        String type = props.getString("type");

        if (type.equalsIgnoreCase("pin")) {
            pinLockView = new PinLockView(context);

            ReadableMap pinProps = props.getMap("pin");

            pinLockView.setPinLength(pinProps.getInt("pinLength"));
            pinLockView.setTextColor(Color.parseColor(pinProps.getString("textColor")));
            pinLockView.setTextSize(pinProps.getInt("textSize"));
            pinLockView.setButtonSize(pinProps.getInt("buttonSize"));
//            verticalSpacing: 24,
//                    horizontalSpacing: 36,
//            lockView.setButtonBackgroundDrawable(pinProps.getString("buttonBackgroundDrawable"));
//                    deleteButtonDrawable: undefined,
            pinLockView.setDeleteButtonSize(pinProps.getInt("deleteButtonSize"));
            pinLockView.setShowDeleteButton(pinProps.getBoolean("showDeleteButton"));
            pinLockView.setDeleteButtonPressedColor(Color.parseColor(pinProps.getString("deleteButtonPressedColor")));
//            dotEmptyBackground: '',
//                    dotFilledBackground: '',
//                    dotDiameter: 12,
//                    dotSpacing: 16,
//                    indicatorType: 'fillWithAnimation'

            pinLockView.setPinLockListener(pinLockViewListener);

            IndicatorDots dots = new IndicatorDots(context);
            pinLockView.attachIndicatorDots(dots);

            frameLayout.removeAllViews();

            frameLayout.addView(dots);
            frameLayout.addView(pinLockView);
        } else if (type.equalsIgnoreCase("pattern")) {
            patternLockView = new PatternLockView(context);

            ReadableMap patternProps = props.getMap("pattern");

            patternLockView.setDotCount(patternProps.getInt("dotCount"));
            patternLockView.setDotNormalSize(patternProps.getInt("dotNormalSize"));
            patternLockView.setDotSelectedSize(patternProps.getInt("dotSelectedSize"));
            patternLockView.setPathWidth(patternProps.getInt("pathWidth"));
            patternLockView.setAspectRatioEnabled(patternProps.getBoolean("aspectRatioEnabled"));

            if (patternProps.getString("aspectRatio").equalsIgnoreCase("SQUARE")) {
                patternLockView.setAspectRatio(PatternLockView.AspectRatio.ASPECT_RATIO_SQUARE);
            } else if (patternProps.getString("aspectRatio").equalsIgnoreCase("WIDTH_BIAS")) {
                patternLockView.setAspectRatio(PatternLockView.AspectRatio.ASPECT_RATIO_WIDTH_BIAS);
            } else if (patternProps.getString("aspectRatio").equalsIgnoreCase("HEIGHT_BIAS")) {
                patternLockView.setAspectRatio(PatternLockView.AspectRatio.ASPECT_RATIO_HEIGHT_BIAS);
            }

            patternLockView.setNormalStateColor(Color.parseColor(patternProps.getString("normalStateColor")));
            patternLockView.setCorrectStateColor(Color.parseColor(patternProps.getString("correctStateColor")));
            patternLockView.setWrongStateColor(Color.parseColor(patternProps.getString("wrongStateColor")));
            patternLockView.setDotAnimationDuration(patternProps.getInt("dotAnimationDuration"));
            patternLockView.setPathEndAnimationDuration(patternProps.getInt("pathEndAnimationDuration"));

            lock = Integer.parseInt(patternProps.getString("lock"));

            patternLockView.addPatternLockListener(patternLockViewListener);

            frameLayout.removeAllViews();
            frameLayout.addView(patternLockView);
        }
    }

    private PinLockListener pinLockViewListener = new PinLockListener() {
        @Override
        public void onComplete(String pin) {
            PinLockView lockView = (PinLockView) frameLayout.getChildAt(1);
            if (lock == Integer.parseInt(pin)) {
//                lockView.setPinLockListener(PatternLockView.PatternViewMode.CORRECT) ;
            } else {
//                lockView.setViewMode(PatternLockView.PatternViewMode.WRONG);
            }

            context.getNativeModule(UIManagerModule.class).getEventDispatcher().dispatchEvent(
                    new LockEvent(frameLayout.getId(),"complete", pin));
        }

        @Override
        public void onEmpty() {
            context.getNativeModule(UIManagerModule.class).getEventDispatcher().dispatchEvent(
                    new LockEvent(frameLayout.getId(),"empty", ""));
        }

        @Override
        public void onPinChange(int pinLength, String intermediatePin) {
            context.getNativeModule(UIManagerModule.class).getEventDispatcher().dispatchEvent(
                    new LockEvent(frameLayout.getId(),"change", intermediatePin));
        }
    };

    private PatternLockViewListener patternLockViewListener = new PatternLockViewListener() {
        @Override
        public void onStarted() {
            context.getNativeModule(UIManagerModule.class).getEventDispatcher().dispatchEvent(
                    new LockEvent(frameLayout.getId(),"started", ""));
        }

        @Override
        public void onProgress(List<PatternLockView.Dot> pattern) {
            context.getNativeModule(UIManagerModule.class).getEventDispatcher().dispatchEvent(
                    new LockEvent(frameLayout.getId(),"progress", PatternLockUtils.patternToString(patternLockView, pattern)));
        }

        @Override
        public void onComplete(List<PatternLockView.Dot> pattern) {
            PatternLockView lockView = (PatternLockView) frameLayout.getChildAt(0);
            if (lock == Integer.parseInt(PatternLockUtils.patternToString(patternLockView, pattern))) {
                lockView.setViewMode(PatternLockView.PatternViewMode.CORRECT);
            } else {
                lockView.setViewMode(PatternLockView.PatternViewMode.WRONG);
            }

            context.getNativeModule(UIManagerModule.class).getEventDispatcher().dispatchEvent(
                    new LockEvent(frameLayout.getId(),"completed", PatternLockUtils.patternToString(patternLockView, pattern)));
        }

        @Override
        public void onCleared() {
            context.getNativeModule(UIManagerModule.class).getEventDispatcher().dispatchEvent(
                    new LockEvent(frameLayout.getId(),"cleared", ""));

        }
    };
}
