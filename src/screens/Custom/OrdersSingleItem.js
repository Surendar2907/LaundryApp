import React, {useState, useEffect} from 'react';
import {Animated, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import {checkTag} from '../components/SharedFunction';
import moment from 'moment';
import CardView from 'react-native-cardview';
import Styles from '../../styles/Styles';
import SCALE from './SCALE';
import {useTheme} from '@react-navigation/native';
import {Text} from 'react-native-paper';

const OrderSingleItem = ({
  id,
  addressId,
  time,
  price,
  tag,
  status,
  navigation,
}) => {
  const theme = useTheme();
  const [orderStatus, setOrderStatus] = useState(status);
  const scaleInAnimated = new Animated.Value(0);
  const scaleOutAnimated = new Animated.Value(0);
  useEffect(() => {
    if (status === 'pending') {
      setOrderStatus('current');
    } else {
      setOrderStatus(status);
    }
  }, []);

  const goToSummary = () => {
    navigation.navigate('OrderSummaryScreen', {
      addressId: addressId,
      orderId: id,
      orderNumberApi: id,
      orderDate: time,
      from: 'Orders',
    });
  };
  return (
    <TouchableOpacity
      onPress={goToSummary}
      onPressIn={() => {
        SCALE.pressInAnimation(scaleInAnimated);
      }}
      onPressOut={() => {
        SCALE.pressOutAnimation(scaleInAnimated);
      }}
      style={SCALE.getScaleTransformationStyle(scaleInAnimated)}>
      <Animated.View
        style={{
          flex: 1,
          marginTop: 4,
          marginLeft: 8,
          marginRight: 8,
          marginBottom: 4,
        }}>
        <CardView
          cardElevation={0}
          cornerRadius={5}
          style={{backgroundColor: theme?.colors.card}}>
          <View
            style={{
              flexDirection: 'column',
              width: '100%',
              padding: 16,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={Styles.customFontNormal}>
                {/* {moment
                  .utc(time)
                  .utcOffset('+05:30')
                  .format('DD MMM,YYYY hh:mm:ss a')} */}
                {time}
              </Text>
              <Text style={Styles.customFontNormal}>₹ {price}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 16,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/* {checkTag(tag)} */}
                <Text style={[Styles.customFontNormal, {marginLeft: 8}]}>
                  {tag.toUpperCase()}
                </Text>
              </View>
              {orderStatus === 'current' ? (
                <Text style={[Styles.customFontNormal, {color: 'red'}]}>
                  {orderStatus}
                </Text>
              ) : (
                <Text style={[Styles.customFontNormal, {color: 'green'}]}>
                  {orderStatus}
                </Text>
              )}
            </View>
          </View>
        </CardView>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default OrderSingleItem;
