
#import "RNLockScreen.h"

@implementation RNLockScreen

@synthesize bridge = _bridge;

NSString *lock;
TQGestureLockView *lockView;

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE()

- (UIView *)view {
    UIView *view = [[UIView alloc] init];
    return view;
}


RCT_CUSTOM_VIEW_PROPERTY(props, NSDictonary *, UIView) {
    
    NSNumber *width = [json objectForKey: @"width"];
    NSNumber *height = [json objectForKey: @"height"];

    NSDictionary *props = [json objectForKey: @"pattern"];

    lock = [json objectForKey: @"lock"];
    
    NSNumber *dotCount = [json objectForKey: @"dotCount"];
    NSNumber *dotNormalSize = [json objectForKey: @"dotNormalSize"];
    NSNumber *dotSelectedSize = [json objectForKey: @"dotSelectedSize"];
    NSNumber *pathWidth = [json objectForKey: @"pathWidth"];

    NSString *normalStateColor = [json objectForKey: @"normalStateColor"];
    NSString *correctStateColor = [json objectForKey: @"correctStateColor"];
    NSString *wrongStateColor = [json objectForKey: @"wrongStateColor"];

    NSNumber *dotAnimationDuration = [json objectForKey: @"dotAnimationDuration"];

    CGFloat spacing;
    if ([width intValue] > [height intValue]) {
        spacing = 40 * ([width integerValue] / 375.0f);
    } else {
        spacing = 40 * ([height integerValue] / 375.0f);
    }

    TQGestureLockDrawManager *drawManager = [TQGestureLockDrawManager defaultManager];
    drawManager.circleDiameter = [dotNormalSize floatValue];
    drawManager.subCirclesCount = [dotCount floatValue];
    drawManager.bridgingLineWidth = [pathWidth floatValue];
    drawManager.drawNormalColor = [RNLockScreen colorFromHexCode: normalStateColor];
    drawManager.drawSelectedColor = [RNLockScreen colorFromHexCode: correctStateColor];
    drawManager.drawErrorColor = [RNLockScreen colorFromHexCode: wrongStateColor];
    drawManager.securityCodeLeastNumbers = [dotCount floatValue] + 1;
    
    drawManager.edgeSpacingInsets = UIEdgeInsetsMake(
                                                     spacing, spacing, spacing, spacing);
    drawManager.hollowCircleBorderWidth = 0.5;

    lockView = [[TQGestureLockView alloc] initWithFrame:CGRectMake(0, 0, [width floatValue], [height floatValue]) drawManager: drawManager];

    lockView.delegate = self;
    lockView.reactTag = view.reactTag;
    
    lockView.backgroundColor = [UIColor clearColor];
    
    [view addSubview: lockView];
}


#pragma mark  TQGestureLockViewDelegate

- (void)gestureLockView:(TQGestureLockView *)gestureLockView lessErrorSecurityCodeSting:(NSString *)securityCodeSting {
    
    if (![lock isEqualToString: @""]) {
        if ([securityCodeSting isEqualToString: lock]) {
            [gestureLockView setNeedsDisplayGestureLockErrorState: NO];
        } else {
            [gestureLockView setNeedsDisplayGestureLockErrorState: YES];
        }
    } else {
        [gestureLockView setNeedsDisplayGestureLockErrorState: NO];
    }
    
    NSDictionary *event = @{
                            @"target": lockView.reactTag,
                            @"pattern": securityCodeSting,
                            @"eventType": @"completed",
                            };
//    [self.bridge.eventDispatcher sendInputEventWithName:@"topChange" body:event];

    RCTComponentEvent *cEvent = [[RCTComponentEvent alloc] initWithName:@"topChange"
                                                             viewTag:lockView.reactTag
                                                                body:event];
    [self.bridge.eventDispatcher sendEvent:cEvent];
}


+ (UIColor *) colorFromHexCode:(NSString *)hexString {
    NSString *cleanString = [hexString stringByReplacingOccurrencesOfString:@"#" withString:@""];
    if([cleanString length] == 3) {
        cleanString = [NSString stringWithFormat:@"%@%@%@%@%@%@",
       [cleanString substringWithRange:NSMakeRange(0, 1)],[cleanString substringWithRange:NSMakeRange(0, 1)],
       [cleanString substringWithRange:NSMakeRange(1, 1)],[cleanString substringWithRange:NSMakeRange(1, 1)],
       [cleanString substringWithRange:NSMakeRange(2, 1)],[cleanString substringWithRange:NSMakeRange(2, 1)]];
    }
    if([cleanString length] == 6) {
        cleanString = [cleanString stringByAppendingString:@"ff"];
    }

    unsigned int baseValue;
    [[NSScanner scannerWithString:cleanString] scanHexInt:&baseValue];

    float red = ((baseValue >> 24) & 0xFF)/255.0f;
    float green = ((baseValue >> 16) & 0xFF)/255.0f;
    float blue = ((baseValue >> 8) & 0xFF)/255.0f;
    float alpha = ((baseValue >> 0) & 0xFF)/255.0f;

    return [UIColor colorWithRed:red green:green blue:blue alpha:alpha];
}

@end

