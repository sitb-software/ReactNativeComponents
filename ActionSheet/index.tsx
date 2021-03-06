import * as React from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import Component from '../AbstractComponent';
import Button from '../Button';
import Dialog from '../Dialog';
import { createRootView } from '../createRootNode';

import Props from './Props';

import styles from './styles';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/6/12
 */
class ActionSheetComponent extends Component<Props> {
  state = {
    open: true,
  };

  showAnimation = {
    animation: 'fadeIn',
    duration: 500,
  };

  hideAnimation = {
    animation: 'fadeOut',
    duration: 500,
  };

  contentShowAnimation = {
    animation: 'fadeInUpBig',
    duration: 500,
  };
  contentHideAnimation = {
    animation: 'fadeOutDownBig',
    duration: 500,
  };

  handleCancelPress() {
    const { cancelPress } = this.props;
    this.close(cancelPress);
  }

  handlePress(onPress) {
    return () => {
      this.close(onPress);
    };
  }

  close(onPress) {
    this.setState({ open: false }, () => {
      setTimeout(() => {
        onPress && onPress();
        this.props.manager.destroy();
      }, 600);
    });
  }

  render() {
    const props = this.state.open
      ? this.contentShowAnimation
      : this.contentHideAnimation;

    const { options, title, cancel, titleTextStyle } = this.props;

    const { height } = Dimensions.get('window');

    return (
      <Dialog
        hideAnimation={this.hideAnimation}
        onPress={this.handleCancelPress}
        showAnimation={this.showAnimation}
        statusBarAutoHidden={false}
        style={styles.container}
        visible={this.state.open}>
        <AnimatableView {...props} style={styles.contentContainer}>
          <View style={[styles.content]}>
            <View style={styles.title}>
              <Text style={[styles.titleText, titleTextStyle]}>
                {title || 'Action'}
              </Text>
            </View>
            <ScrollView
              alwaysBounceVertical={false}
              style={{ maxHeight: height * 0.6 }}>
              {options.map((option, index) => {
                let tmp = null;
                if (options.length - 1 === index) {
                  tmp = {
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  };
                }
                return (
                  <Button
                    containerStyle={[styles.button, tmp]}
                    key={index}
                    onPress={this.handlePress(option.onPress)}
                    textStyle={{ color: option.textColor || '#0977FF' }}>
                    {option.label}
                  </Button>
                );
              })}
            </ScrollView>
          </View>
          <Button
            containerStyle={[styles.content, styles.cancel]}
            onPress={this.handleCancelPress}>
            <Text style={styles.cancelText}>{cancel || 'Cancel'}</Text>
          </Button>
        </AnimatableView>
      </Dialog>
    );
  }
}

export default class ActionSheet {
  /**
   * @param options
   * options (对象数组) - 一组按钮的选项（必选）{label: '按钮标题', onPress: ()=>console.log('press')}
   * cancelButtonIndex（整型） - 选项中取消按钮所在的位置（索引）
   * destructiveButtonIndex（整型） - 选项中删除按钮所在的位置（索引）
   * title（字符串） - 弹出框顶部的标题
   * message（字符串） - 弹出框顶部标题下方的信息
   * @param callback
   */
  static showActionSheetWithOptions(options: Object, callback: Function) {
    let actionSheet = createRootView(ActionSheetComponent, options);
    actionSheet.update({
      ...options,
      manager: actionSheet,
    });
  }
}
