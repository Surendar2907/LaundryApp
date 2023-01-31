import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Linking,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useTheme} from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Styles from '../../styles/Styles';
import {Colors} from '../../config/Colors';
import {Drawer, Text, TouchableRipple, Switch} from 'react-native-paper';
// import SlideDownUpView from './SlideDownUpView.js';

const CustomSidebarMenu = (props) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Top Large Image */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingEnd: 10,
          marginTop: 10,
        }}>
        <Image
          source={require('../../../images/ProfilePic.png')}
          style={styles.sideMenuProfileIcon}
        />
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: 16,
              color: theme?.colors.text,
              fontWeight: 'bold',
            }}>
            {' '}
            Anne Watts
          </Text>
          <Text style={{fontSize: 14}}>+91 8900100789</Text>
        </View>
        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
          <AntDesign name="close" color={Colors.accent} size={24} />
        </TouchableOpacity>
      </View>

      {/* <Image width={200} height={267} source={{uri: 'orderlee_logo'}} style={{width: 200, height: 267}} /> */}

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="About Us"
          labelStyle={Styles.customFontMedium}
          icon={({focused, color, size}) => (
            <AntDesign name="team" color={color} size={size} />
          )}
          onPress={() => props.navigation.navigate('AboutUsScreen')}
        />

        {/* <SlideDownUpView /> */}
        {/* <DrawerItem
          label="Contact Us"
          labelStyle={Styles.customFontMedium}
          icon={({focused, color, size}) => (
            <Image
              source={require('../../images/contact_n.png')}
              style={{
                width: size,
                height: size,
              }}
            />
          )}
          onPress={() => Linking.openURL('https://ospasta.com/')}
        /> */}
        <DrawerItem
          label="Refer A Friend"
          labelStyle={Styles.customFontMedium}
          icon={({focused, color, size}) => (
            <AntDesign name="addusergroup" color={color} size={size} />
          )}
          onPress={() => Linking.openURL('https://ospasta.com/')}
        />
        <DrawerItem
          label="Support"
          labelStyle={Styles.customFontMedium}
          icon={({focused, color, size}) => (
            <AntDesign name="customerservice" color={color} size={size} />
          )}
          onPress={() => Linking.openURL('https://ospasta.com/')}
        />
        <DrawerItem
          label="Rate Us"
          labelStyle={Styles.customFontMedium}
          icon={({focused, color, size}) => (
            <AntDesign name="hearto" color={color} size={size} />
          )}
          onPress={() => Linking.openURL('https://ospasta.com/')}
        />
        <DrawerItem
          label="Settings"
          labelStyle={Styles.customFontMedium}
          icon={({focused, color, size}) => (
            <AntDesign name="setting" color={color} size={size} />
          )}
          onPress={() => Linking.openURL('https://ospasta.com/')}
        />
        <DrawerItem
          label="About"
          labelStyle={Styles.customFontMedium}
          icon={({focused, color, size}) => (
            <AntDesign name="info" color={color} size={size} />
          )}
          onPress={() => Linking.openURL('https://ospasta.com/')}
        />
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={props.toggleTheme}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch
                  style={[{backgroundColor: theme.colors.accent}]}
                  color={Colors.accent}
                  value={theme.dark}
                />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
        {/* <DrawerItem
          label="Our Service Area"
          labelStyle={Styles.customFontMedium}
          icon={({focused, color, size}) => (
            <AntDesign name="enviromento" color={color} size={size} />
          )}
          onPress={() => props.navigation.navigate('OurServiceAreaScreen')}
        />
        <DrawerItem
          label="Terms & Conditions"
          labelStyle={Styles.customFontMedium}
          icon={({focused, color, size}) => (
            <AntDesign name="exception1" color={color} size={size} />
          )}
          onPress={() => props.navigation.navigate('TermsAndConditionScreen')}
        /> */}
        {/* <View style={styles.customItem}>
          <Text
            onPress={() => {
              Linking.openURL('https://aboutreact.com/');
            }}>
            Rate Us
          </Text>
          <Image
            source={{uri: BASE_PATH + 'star_filled.png'}}
            style={styles.iconStyle}
          />
        </View> */}
      </DrawerContentScrollView>
      <Text
        style={{
          fontSize: 14,
          textAlign: 'right',
          color: 'grey',
          padding: 16,
        }}>
        V1.0.0
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'cover',
    width: 60,
    height: 60,
    margin: 10,
    borderRadius: 100 / 2,
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default CustomSidebarMenu;
