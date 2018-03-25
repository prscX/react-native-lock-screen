
# React Native: Lock Screen

An easy-to-use, customizable and Material Design ready Pattern/Pin Lock view for Android & iOS.

| **Pin** |
| ----------------- |
| <img src="./assets/hero1.gif" width="600" height="600" />                  |

| **Pattern** |
| ----------------- |
| <img src="./assets/hero2.gif" width="600" height="600" />                  |

| **Background** |
| ----------------- |
| <img src="./assets/hero3.png" width="600" height="600" />                  |

## Getting started

`$ npm install react-native-lock-screen --save`

`$ react-native link react-native-lock-screen`

`$ react-native link react-native-svg`



## Usage
```javascript
import RNPopoverMenu from 'react-native-popover-menu';

<RNLockScreen type={RNPopoverMenu.Type.Pin} mode={RNPopoverMenu.Mode.Capture} onCapture={lock => {
  }}
  lock={'123'}
/>

```


## Credit
- [Android: Gesture Lock](https://github.com/aritraroy/PatternLockView)
- [iOS: Gesture Lock](https://github.com/Tuqierrenzu/TQGestureLockView)

## Contribution
Contributions are welcome and are greatly appreciated! Every little bit helps, and credit will always be given.

## License
This library is provided under the Apache 2.0 License.

RNLockScreen @ Pranav Raj Singh Chauhan
