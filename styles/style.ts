import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  /**
   * @deprecated use StyleSheet.absoluteFill
   */
  fullScreenAbsolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row'
  },
  flexColumn: {
    flex: 1,
    flexDirection: 'column'
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  textAlignRight: {
    textAlign: 'right'
  }
});
