import React, {useState, useEffect} from 'react';
import {Button, View, SafeAreaView, Image} from 'react-native';
import Styles from '../../styles/Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../config/Colors';
import CardView from 'react-native-cardview';
import {useTheme} from '@react-navigation/native';
import {Text} from 'react-native-paper';
// import {renderVegOrNonVegImage} from './SharedFunction';

const OrderSummarySingleItem = ({
  id,
  title,
  price,
  image_src,
  count,
  isVeg,
}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        marginLeft: 4,
        marginRight: 4,
        marginTop: 2,
      }}>
      <CardView
        cardElevation={0}
        cornerRadius={5}
        style={{backgroundColor: theme?.colors.card}}>
        <View style={{flexDirection: 'row', margin: 8}}>
          {/* <Image
            source={{uri: image_src}}
            style={{
              width: 60,
              height: '100%',
              resizeMode: 'cover',
            }}
          /> */}
          {/* <AntDesign name={'skin'} color={Colors.accent} size={60} /> */}
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text
              style={[
                Styles.customFontSmall,
                {flex: 2, marginLeft: 8, marginTop: 8},
              ]}>
              {title}
            </Text>
            <Text style={[Styles.customFontSmall, {flex: 1, margin: 6}]}>
              Qty {count}
            </Text>
            <Text
              style={[
                Styles.customFontSmall,
                {flex: 1, marginLeft: 8, marginTop: 8, textAlign: 'center'},
              ]}>
              ₹ {(price * count).toFixed(2)}
            </Text>
          </View>
        </View>
      </CardView>
    </View>
  );
};

export default OrderSummarySingleItem;
