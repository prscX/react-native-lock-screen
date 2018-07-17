import { StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const style = StyleSheet.create({
  container: {
    minWidth: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(38) / 2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pin: {
    fontSize: moderateScale(13),
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
