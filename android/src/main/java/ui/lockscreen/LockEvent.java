package ui.lockscreen;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class LockEvent extends Event<LockEvent> {

    public static final String EVENT_NAME = "topChange";

    private String eventType;
    private String pattern;

    public LockEvent(int viewId, String eventType, String pattern) {
        super(viewId);

        this.eventType = eventType;
        this.pattern = pattern;
    }

    public String getEventType() {
        return eventType;
    }

    public String getPattern() {
        return pattern;
    }

    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Override
    public short getCoalescingKey() {
        // All switch events for a given view can be coalesced.
        return 0;
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), serializeEventData());
    }

    private WritableMap serializeEventData() {
        WritableMap eventData = Arguments.createMap();
        eventData.putInt("target", getViewTag());
        eventData.putString("eventType", getEventType());
        eventData.putString("pattern", getPattern());

        return eventData;
    }
}