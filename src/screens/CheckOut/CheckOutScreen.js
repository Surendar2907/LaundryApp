import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {openDatabase} from 'react-native-sqlite-storage';
import Styles from '../../styles/Styles';
import CustomProgressBar from '../Custom/CustomProgressBar';
import {useTheme} from '@react-navigation/native';
import {Colors} from '../../config/Colors';
import {Text} from 'react-native-paper';
import CheckoutSingleItem from '../Custom/CheckoutSingleItem';
import CardView from 'react-native-cardview';

const {width} = Dimensions.get('window');
const CheckOutScreen = ({navigation, route}) => {
  const {
    addressId,
    fullname,
    address,
    location,
    pincode,
    phone,
    email,
    tag,
  } = route.params;
  const theme = useTheme();
  var db = openDatabase({name: 'UserDatabase.db'});

  var tempPrice = 0;
  const [list, setList] = useGlobal('list');
  const [data, setData] = useGlobal('Data');
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [totalItem, setTotalItem] = useState(0.0);
  const [proData, setProData] = useState([]);
  const [loading, setLoading] = useState(false);

  // This is to manage Modal State
  const [isModalVisible, setModalVisible] = useState(false);

  // This is to manage TextInput State
  const [inputValue, setInputValue] = useState('');

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };
  // const [finalList, setFinalList] = useState([])
  useEffect(() => {
    let identicalElements = [];
    let tItem = 0;
    data.forEach((element1) => {
      list.forEach((element2) => {
        if (element1['id'] === element2['id']) {
          element1['count'] = element2['count'];
          if (element1['count'] !== 0) {
            identicalElements.push(element1);
            tempPrice = tempPrice + element1['price'] * element1['count'];
            tItem = tItem + element1['count'];
          }
        }
      });
    });
    setProData(identicalElements);
    setTotalPrice(tempPrice.toFixed(2));
    setTotalItem(tItem);
  }, [list]);

  const goBackToSelectDeliveryScreen = () => {
    navigation.goBack();
  };

  const goToNewAdreessScreen = () => {
    navigation.navigate('AddNewAddressScreen', {
      title: 'Add New Address',
    });
  };

  const goSummaryScreen = (ordernumber, orderDate, orderNumberApi) => {
    if (totalPrice > 0) {
      navigation.navigate('OrderSummaryScreen', {
        addressId: addressId,
        orderId: ordernumber,
        orderDate: orderDate,
        orderNumberApi: orderNumberApi,
      });
    } else {
      ToastAndroid.show(
        "You don't have any item. Please go back and select something.",
        ToastAndroid.SHORT,
      );
    }
  };

  function generateOrderNumber() {
    var number = Math.floor(Math.random() * 1000000);
    return number;
  }

  function generateOrderDate() {
    var date = moment().utcOffset('+05:30').format('DD MMM,YYYY hh:mm:ss a');
    return date;
  }

  const addOrder = () => {
    var ordernumber = generateOrderNumber();
    var orderdate = generateOrderDate();
    if (ordernumber !== null) {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO table_orders (order_id, order_addressTag, order_totalPrice, order_address_id, order_timestamp) VALUES (?,?,?,?,?)',
          [ordernumber, tag, totalPrice, addressId, orderdate],
          (tx, results) => {
            // console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              // console.log('done: orders')
            } else alert('Add order failed');
          },
        );
      });

      db.transaction(function (tx) {
        for (let i = 0; i < proData.length; ++i) {
          tx.executeSql(
            'INSERT INTO table_order_products (orderid, productid, quantity) VALUES (?,?,?)',
            [ordernumber, proData[i].id, proData[i].count],
            (tx, results) => {
              // console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                // console.log('done:' + i)
              } else alert('Add order failed');
            },
          );
        }
      });

      // placeOrder(ordernumber, orderdate);
      goSummaryScreen(ordernumber, orderdate, 100);
    }
  };

  const footer = () => {
    return (
      <CardView
        cardElevation={0}
        cornerRadius={5}
        style={{backgroundColor: theme?.colors.card}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 16,
            marginBottom: 8,
            marginRight: 16,
            marginLeft: 16,
            height: 1,
            backgroundColor: 'lightgrey',
          }}
        />
        <View
          style={{
            paddingTop: 16,
            paddingBottom: 8,
            paddingRight: 16,
            paddingLeft: 16,
          }}>
          <Text style={[Styles.customFontMedium]}>
            Any Instruction? We would love to know
          </Text>
          <TextInput
            multiline={true}
            placeholderTextColor={'lightgrey'}
            placeholder={'Your Message'}
          />
        </View>
      </CardView>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
      {loading ? (
        <CustomProgressBar placeholder="Placing new order..." />
      ) : (
        <View />
      )}
      <View style={{flex: 1, padding: 12}}>
        <CardView
          cardElevation={0}
          cornerRadius={5}
          style={{backgroundColor: theme?.colors.card}}>
          <FlatList
            data={proData}
            renderItem={({item}) => (
              <CheckoutSingleItem
                id={item.id}
                title={item.title}
                price={item.price}
                count={item.count}
                isVeg={item.isVeg}
              />
            )}
            keyExtractor={(item, index) => item.id.toString()}
            ListFooterComponent={footer}
          />
        </CardView>
      </View>
      <View>
        <CardView
          cardElevation={2}
          cornerRadius={0}
          style={{backgroundColor: theme?.colors.card}}>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <View
              style={{
                flexDirection: 'row',
                padding: 16,
              }}>
              <AntDesign name={'home'} color={Colors.accent} size={24} />
              <View style={{flex: 1, marginLeft: 16}}>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={goBackToSelectDeliveryScreen}>
                  <Text style={[Styles.customFontNormalBold]}>
                    Delivery it to Your ({tag.toUpperCase()})
                  </Text>
                  <AntDesign name={'down'} color={Colors.accent} size={16} />
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 8,
                    marginRight: 8,
                  }}>
                  <Text style={Styles.customFontSmall}>{fullname} </Text>
                  <TouchableOpacity
                    style={[
                      Styles.appButtonContainer,
                      {
                        backgroundColor: Colors.accent,
                        paddingVertical: 6,
                        paddingHorizontal: 16,
                      },
                    ]}
                    onPress={goToNewAdreessScreen}>
                    <Text style={[Styles.customFontNormal, {color: 'white'}]}>
                      Add Address
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={[Styles.customFontSmall]}>
                  {address}
                  {'\n'}
                  {location}
                  {'\n'}Pincode: {pincode}
                  {'\n'}
                  {phone}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: theme.dark
                  ? Colors.greyDarkLevel2
                  : Colors.lightWhite,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                }}>
                <Text style={[Styles.customFontNormal, {marginLeft: 8}]}>
                  {totalItem} Items
                </Text>
                <View
                  style={{
                    backgroundColor: Colors.accent,
                    height: '100%',
                    width: 1,
                    margin: 6,
                  }}
                />
                <Text style={(Styles.customFontMedium, {color: 'green'})}>
                  ₹ {totalPrice}
                </Text>
              </View>
              <TouchableOpacity
                onPress={addOrder}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  flex: 1,
                }}>
                <Text style={[Styles.customFontNormal, {marginRight: 8}]}>
                  Proceed To Pay
                </Text>
                <AntDesign name={'wallet'} color={Colors.accent} size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </CardView>
        {/* <TouchableOpacity
          onPress={addOrder}
          style={[
            Styles.appButtonContainer,
            {
              backgroundColor: theme.dark
                ? Colors.greyDarkLevel2
                : Colors.light,
              elevation: 5,
            },
          ]}>
          <Text style={[Styles.customFontMedium, Styles.appButtonText]}>
            Checkout
          </Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    justifyContent: 'center',
    top: '25%',
    left: '40%',
    elevation: 5,
    transform: [{translateX: -(width * 0.4)}, {translateY: -90}],
    width: (width + 30) * 0.8,
    padding: 8,
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 4,
  },
  textInput: {
    width: '100%',
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 16,
    borderBottomColor: 'lightblue',
    borderBottomWidth: 2,
  },
  triangle: {
    top: '14%',
    left: '38%',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 10,
    borderBottomWidth: 25,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    borderLeftColor: 'transparent',
  },
});
export default CheckOutScreen;
