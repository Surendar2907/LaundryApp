import {Platform} from 'react-native';
import {StyleSheet} from 'react-native';
import {Colors} from '../config/Colors';

export default StyleSheet.create({
  customFontBig: {
    fontSize: 20,
    fontFamily: 'Gotham-Book',
  },
  customFontMedium: {
    fontSize: 16,
    fontFamily: 'Gotham-Book',
  },
  customFontNormal: {
    fontSize: 14,
    fontFamily: 'Gotham-Book',
  },
  customFontSmall: {
    fontSize: 12,
    fontFamily: 'Gotham-Book',
  },

  customFontVerySmall: {
    fontSize: 10,
    fontFamily: 'Gotham-Book',
  },

  customFontExtraVerySmall: {
    fontSize: 8,
    fontFamily: 'Gotham-Book',
  },

  customFontBigBold: {
    fontSize: 20,
    fontFamily: 'Gotham-Book',
    fontWeight: 'bold',
  },
  customFontMediumBold: {
    fontSize: 16,
    fontFamily: 'Gotham-Book',
    fontWeight: 'bold',
  },
  customFontNormalBold: {
    fontSize: 14,
    fontFamily: 'Gotham-Book',
    fontWeight: 'bold',
  },
  customFontSmallBold: {
    fontSize: 12,
    fontFamily: 'Gotham-Book',
    fontWeight: 'bold',
  },

  customFontVerySmallBold: {
    fontSize: 10,
    fontFamily: 'Gotham-Book',
    fontWeight: 'bold',
  },

  appButtonContainer: {
    elevation: 5,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  appButtonText: {
    color: Colors.accent,
    alignSelf: 'center',
    textTransform: 'uppercase',
  },

  centerEmptySet: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  elevationLow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});
