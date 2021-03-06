import * as React from 'react';
import Component from '../AbstractComponent';
import { Image, Text, View } from 'react-native';
import { HeaderProps } from './Props';

const styles: any = {
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 7,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  titleText: {
    fontSize: 17,
    color: '#333333',
  },
  subtitleText: {
    color: '#acacac',
    fontSize: 14,
  },
  extra: {},
  extraText: {},
};

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/30
 */
export default class Header extends Component<HeaderProps> {
  renderThumb() {
    const { thumb } = this.props;
    if (typeof thumb === 'string') {
      return <Image source={{ uri: thumb }} />;
    }
    return thumb;
  }

  renderTitle() {
    const { title } = this.props;
    if (typeof title === 'string') {
      return <Text style={styles.titleText}>{title}</Text>;
    }
    return title;
  }

  renderExtra() {
    const { extra } = this.props;
    if (typeof extra === 'string') {
      return <Text style={styles.extraText}>{extra}</Text>;
    }
    return extra;
  }

  renderSubtitle() {
    const { subtitle } = this.props;
    if (typeof subtitle === 'string') {
      return (
        <Text numberOfLines={9999} style={styles.subtitleText}>
          {subtitle}
        </Text>
      );
    }
    return subtitle;
  }

  render() {
    const { style, ...props } = this.props;
    return (
      <View {...props} style={[styles.container, style]}>
        <View style={styles.thumb}>{this.renderThumb()}</View>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            {this.renderTitle()}
            {this.renderSubtitle()}
          </View>
          <View style={styles.extra}>{this.renderExtra()}</View>
        </View>
      </View>
    );
  }
}
