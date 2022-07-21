import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import themeColors from '../config/themeColors';
import AppIcon from './AppIcon';
import AppText from './AppText';

function ListItem({
  title,
  subTitle,
  favorite,
  color,
  IconComponent,
  imageUrl,
  onPress,
  isChevron = true,
}) {
  return (
    <TouchableHighlight underlayColor={themeColors.lightGrey} onPress={onPress}>
      <View style={styles.container}>
        {!IconComponent && !imageUrl && (
          <AppIcon name="person-circle" size={50} color={themeColors.primary} />
        )}
        {IconComponent}
        {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} />}
        <View style={styles.detailsContainer}>
          <AppText
            numberOfLines={1}
            style={[styles.title, color]}
            color={color}>
            {title}
          </AppText>
          {subTitle && (
            <AppText numberOfLines={2} style={[styles.subtitle, color]}>
              {subTitle}
            </AppText>
          )}
        </View>
        {favorite && (
          <AppIcon
            style={styles.iconTitle}
            name="star"
            size={15}
            color={themeColors.primary}
          />
        )}
        {isChevron && (
          <AppIcon name="chevron-forward" size={25} color={color} />
        )}
      </View>
    </TouchableHighlight>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 0,
    backgroundColor: themeColors.white,
  },
  detailsContainer: {
    marginLeft: 15,
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  title: {
    fontWeight: '500',
  },
  subtitle: {
    color: themeColors.grey,
  },
  iconTitle: {
    marginRight: 10,
  },
});
