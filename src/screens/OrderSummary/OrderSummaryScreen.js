import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useGlobal, setGlobal} from 'reactn';
import {BackHandler} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import Styles from '../../styles/Styles';
import OrderSummarySingleItem from '../Custom/OrderSummarySingleItem';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {checkTag} from '../../components/SharedFunction';
// import {makeRequest} from '../../apis/Api';
import moment from 'moment';
import {Colors} from '../../config/Colors';
import {Text} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import StepIndicator from 'react-native-step-indicator';
// import ShowToast from '../../components/ShowToast';
// import AsyncStorage from '@react-native-community/async-storage';
// import Constants from '../../constants/Constants';

const OrderSummaryScreen = ({navigation, route}) => {
  const {orderId, addressId, orderDate, from, orderNumberApi} = route.params;
  var db = openDatabase({name: 'UserDatabase.db'});
  const theme = useTheme();
  const [addressData, setAddressData] = useState([
    {
      user_fullname: '',
      user_address: '',
      user_location: '',
      user_pincode: '',
      user_phone: '',
      user_email: '',
      user_tag: '',
    },
  ]);
  const labels = ['Washing', 'Drying', 'Ironing', 'Deliverd'];
  const [productData, setProductData] = useState([]);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [orderDateTime, setOrderDateTime] = useState(orderDate);
  const [orderNumber, setOrderNumber] = useState(orderId);
  const [discount, setDiscount] = useState(0.0);
  const [taxes, setTaxes] = useState(0.0);
  const [deliveryCharge, setDeliveryCharge] = useState(0.0);
  const [currency, setCurrency] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const [orderStatus, setOrderStatus] = useState();
  const [data, setData] = useGlobal('Data');
  const [list, setList] = useGlobal('list');
  const [count, setCount] = useGlobal('count');

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            handleBackButtonClick();
          }}>
          <AntDesign
            name={'home'}
            color={theme?.colors.text}
            size={24}
            style={{marginLeft: 12}}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    getData();
    getAddressData();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  function handleBackButtonClick() {
    if (from === 'Orders') {
      navigation.goBack();
      navigation.navigate('OrdersScreen');
    } else {
      setCount(0);
      // setList([]);
      navigation.popToTop();
    }
    return true;
  }

  const calculatePrice = (orderData) => {
    var tempPrice = 0;
    var temp = [];

    orderData.forEach((element1) => {
      data.forEach((element2) => {
        if (element1['productid'] === element2['id']) {
          if (element1['count'] !== 0) {
            element2['count'] = element1['quantity'];
            temp.push(element2);
            tempPrice = tempPrice + element2['price'] * element1['quantity'];
          }
        }
      });
    });
    setProductData(temp);
    // console.log(temp)
    // console.log(tempPrice.toFixed(2))
    setTotalPrice(tempPrice.toFixed(2));
  };

  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_order_products where orderid = ?',
        [orderId],
        (tx, results) => {
          var temp = [];

          var len = results.rows.length;
          if (len > 0) {
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            // console.log(temp)
            calculatePrice(temp);
          } else {
            alert('No order found');
          }
        },
      );
    });
  };

  const getAddressData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user_address where user_address_id = ?',
        [addressId],
        (tx, results) => {
          var temp = [];
          var len = results.rows.length;
          if (len > 0) {
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setAddressData(temp);
            // console.log(temp)
          } else {
            alert('No Address found');
          }
        },
      );
    });
  };

  const header = () => {
    return (
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: 16,
            backgroundColor: theme?.colors.card,
          }}>
          <View style={{flex: 1}}>
            <Text style={Styles.customFontBigBold}>Order ID</Text>
            <Text style={[Styles.customFontNormalBold, {color: 'green'}]}>
              #LNDRY{orderNumber}
            </Text>
          </View>
          <Text style={[Styles.customFontSmall, {alignSelf: 'flex-end'}]}>
            {orderDateTime}
          </Text>
        </View>
        <View
          style={{
            padding: 16,
            justifyContent: 'space-between',
            backgroundColor: theme?.colors.card,
          }}>
          <Text style={Styles.customFontMediumBold}>Status</Text>
          <View style={{flex: 1, marginTop: 20}}>
            <StepIndicator
              currentPosition={1}
              stepCount={4}
              customStyles={{
                stepIndicatorSize: 23,
                currentStepIndicatorSize: 28,
                currentStepLabelColor: Colors.accent,
                stepIndicatorFinishedColor: Colors.accent,
                stepIndicatorUnFinishedColor: Colors.accentFaded,
                stepIndicatorCurrentColor: Colors.accent,

                separatorFinishedColor: Colors.accent,
                separatorUnFinishedColor: '#aaaaaa',

                separatorStrokeWidth: 3,
                currentStepStrokeWidth: 6,
                stepStrokeCurrentColor: Colors.accent,
                stepStrokeWidth: 2,
                stepStrokeFinishedColor: Colors.accent,
                stepStrokeUnFinishedColor: Colors.light,

                labelSize: 12,
                stepIndicatorLabelFontSize: 10,
                currentStepIndicatorLabelFontSize: 13,
                stepIndicatorLabelCurrentColor: Colors.light,
                stepIndicatorLabelFinishedColor: Colors.light,
                stepIndicatorLabelUnFinishedColor: Colors.light,
              }}
              labels={labels}
            />
          </View>
        </View>
        <View
          style={{
            padding: 16,

            backgroundColor: theme?.colors.card,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={Styles.customFontMediumBold}>Total</Text>
            <Text style={[Styles.customFontMediumBold, {color: Colors.accent}]}>
              ₹ {TotalPrice}
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: 'lightgrey',
              borderBottomWidth: 0.2,
              marginTop: 18,
              marginBottom: 18,
            }}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={Styles.customFontSmall}>Discount</Text>
            <Text style={Styles.customFontSmall}>
              ₹ {currency} {discount}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={Styles.customFontSmall}>Taxes</Text>
            <Text style={Styles.customFontSmall}>
              ₹ {currency} {taxes}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={Styles.customFontSmall}>Delivery Charge</Text>
            <Text style={Styles.customFontSmall}>
              ₹ {currency} {deliveryCharge}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={Styles.customFontNormalBold}>Before Total</Text>
            <Text style={Styles.customFontNormalBold}>
              ₹ {currency} {TotalPrice}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const footer = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginLeft: 16,
          marginTop: 16,
          marginRight: 16,
          paddingBottom: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1}}>
          <Text style={Styles.customFontNormalBold}>
            Delivery To {addressData[0].user_tag}
          </Text>

          <Text style={[Styles.customFontSmall, {marginTop: 3}]}>
            {addressData[0].user_address}
            {'\n'}
            {addressData[0].user_location}
            {'\n'}
            Pincode: {addressData[0].user_pincode}
            {'\n'}
            +91 {addressData[0].user_phone}
            {'\n'}
            {addressData[0].user_email}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            Styles.appButtonContainer,
            {
              backgroundColor: Colors.accent,
              paddingVertical: 6,
              paddingHorizontal: 16,
              height: 30,
            },
          ]}>
          <Text style={[Styles.customFontNormal, {color: 'white'}]}>
            Mail Invoice
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={productData}
        renderItem={({item}) => (
          <OrderSummarySingleItem
            id={item.id}
            title={item.title}
            image_src={item.img_url}
            price={parseFloat(item.price).toFixed(2)}
            count={item.count}
            isVeg={item.isVeg}
          />
        )}
        keyExtractor={(item, index) => item.id.toString()}
        ListHeaderComponent={header}
        ListFooterComponent={footer}
      />
    </SafeAreaView>
  );
};

export default OrderSummaryScreen;
