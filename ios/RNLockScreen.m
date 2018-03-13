
#import "RNLockScreen.h"

@implementation RNLockScreen

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE()

- (UIView *)view {
    UIView *view = [[UIView alloc] init];
    return view;
}


RCT_CUSTOM_VIEW_PROPERTY(props, NSDictonary *, UIView) {

    NSString *type = [json objectForKey: @"type"];
    
    if ([type isEqualToString: @"pattern"]) {
        
        NSNumber *width = [json objectForKey: @"width"];
        NSNumber *height = [json objectForKey: @"height"];
        
        NSDictionary *props = [json objectForKey: @"pattern"];
        
        NSNumber *dotCount = [props objectForKey: @"dotCount"];
        NSNumber *dotNormalSize = [props objectForKey: @"dotNormalSize"];
        NSNumber *dotSelectedSize = [props objectForKey: @"dotSelectedSize"];
        NSNumber *pathWidth = [props objectForKey: @"pathWidth"];
        
        NSString *normalStateColor = [props objectForKey: @"normalStateColor"];
        NSString *correctStateColor = [props objectForKey: @"correctStateColor"];
        NSString *wrongStateColor = [props objectForKey: @"wrongStateColor"];
        
        NSNumber *dotAnimationDuration = [props objectForKey: @"dotAnimationDuration"];

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

        drawManager.edgeSpacingInsets = UIEdgeInsetsMake(spacing, spacing, spacing, spacing);
        drawManager.hollowCircleBorderWidth = 0.5;
        
        TQGestureLockView *lockView = [[TQGestureLockView alloc] initWithFrame:CGRectMake(0, 0, [width floatValue], [height floatValue]) drawManager: drawManager];
        [view addSubview: lockView];
    } else if ([type isEqualToString: @"pin"]) {
        
    }
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
  
