import { StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const style = StyleSheet.create({
  container: {
    minWidth: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(40) / 2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pin: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#7c7c7c'
  },
  suggestion: {
    fontSize: moderateScale(8),
    fontWeight: 'bold',
    color: '#adadad',
    marginTop: 10
  },
  image: {
    height: moderateScale(16),
    width: moderateScale(16)
  }
})

export default style
