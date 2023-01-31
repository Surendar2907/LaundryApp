import React, {useRef, useState, useEffect} from 'react';
import {View, SafeAreaView, ActivityIndicator} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {openDatabase} from 'react-native-sqlite-storage';
// import {makeRequest} from '../../apis/Api';
// import ShowToast from '../../components/ShowToast';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Styles from '../../styles/Styles';
import OrderSingleItem from '../Custom/OrdersSingleItem';
import EmptyDataScreen from '../EmptyData/EmptyDataScreen';

const OrdersScreen = ({navigation}) => {
  var db = openDatabase({name: 'UserDatabase.db'});
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe for the focus Listener
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      getData();
    });

    return () => {
      // Unsubscribe for the focus Listener
      unsubscribe;
    };
  }, [navigation]);

  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_orders', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setOrderData(temp);
        // console.log(temp)
        setLoading(false);
      });
    });
  };

  return (
    <SafeAreaView style={{flex: 1, paddingTop: 5}}>
      {loading ? (
        <ActivityIndicator
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          animating={true}
          size="large"
          color="#f4511e"
        />
      ) : (
        <View>
          <FlatList
            data={orderData}
            renderItem={({item}) => (
              <OrderSingleItem
                id={item.order_id}
                time={item.order_timestamp}
                price={item.order_totalPrice}
                tag={item.order_addressTag}
                addressId={item.order_address_id}
                status={'Washing'}
                currency={item.currency}
                navigation={navigation}
              />
            )}
            initialNumToRender={10}
            keyExtractor={(item, index) => item.order_id.toString()}
            contentContainerStyle={
              orderData.length === 0 && Styles.centerEmptySet
            }
            ListEmptyComponent={
              <EmptyDataScreen
                title={'Empty'}
                description={'Opps, No Previous Orders...'}
              />
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrdersScreen;
