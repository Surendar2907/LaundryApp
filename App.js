import 'react-native-gesture-handler';

import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Colors} from './src/config/Colors';
import CustomSidebarMenu from './src/screens/Custom/CustomSidebarMenu';
import HomeScreenStack from './src/screens/Navigations/HomeScreenStack';
import MenuScreenStack from './src/screens/Navigations/MenuScreenStack';
import {setGlobal} from 'reactn';
import {openDatabase} from 'react-native-sqlite-storage';
import {Dimensions, StatusBar} from 'react-native';
import OfflineNotice from './src/screens/Custom/OfflineNotice';

var db = openDatabase({name: 'UserDatabase.db'});
const Drawer = createDrawerNavigator();
setGlobal({
  count: 0,
  servicePosition: 0,
  serviceListItems: [
    {id: 1, service_name: 'Ironing', checked: false},
    {id: 2, service_name: 'Wash and Fold', checked: false},
    {id: 3, service_name: 'Wash and Iron', checked: false},
    {id: 4, service_name: 'Dry Cleaning', checked: false},
  ],
  list: [
    {id: 1, count: 4},
    {id: 2, count: 2},
    {id: 3, count: 1},
    {id: 4, count: 7},
  ],
  Data: [
    {
      id: 1,
      title: 'T-Shirt',
      description: 'description',
      image_src: 'image_src',
      price: 15.0,
      count: 4,
      isVeg: false,
    },
    {
      id: 2,
      title: 'Shirt',
      description: 'description',
      image_src: 'image_src',
      price: 10.0,
      count: 2,
      isVeg: false,
    },
    {
      id: 3,
      title: 'Kurta',
      description: 'description',
      image_src: 'image_src',
      price: 20.0,
      count: 1,
      isVeg: false,
    },
    {
      id: 4,
      title: 'Shorts',
      description: 'description',
      image_src: 'image_src',
      price: 15.0,
      count: 1,
      isVeg: false,
    },
  ],
  setVeg: false,
});
const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
};
const CombinedDarkTheme = {...PaperDarkTheme, ...NavigationDarkTheme};

const App = () => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user_address'",
        [],
        function (tx, res) {
          // console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user_address', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user_address(user_address_id INTEGER PRIMARY KEY AUTOINCREMENT, user_fullname VARCHAR(50),' +
                'user_address VARCHAR(255), user_location VARCHAR(100), user_pincode INT(10), user_phone INT(10),' +
                'user_email VARCHAR(100), user_tag VARCHAR(50), selected INTEGER DEFAULT 0)',
              [],
            );
          }
        },
      );
    });

    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_orders'",
        [],
        function (tx, res) {
          // console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_orders', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_orders(order_id INTEGER PRIMARY KEY, order_addressTag VARCHAR(50),' +
                'order_totalPrice INT(100), order_address_id INT(100), order_timestamp VARCHAR(200))',
              [],
            );
          }
        },
      );
    });

    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_order_products'",
        [],
        function (tx, res) {
          // console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_order_products', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_order_products(orderid INT NOT NULL,productid INT NOT NULL,' +
                'quantity INT NOT NULL,PRIMARY KEY (orderid, productid),FOREIGN KEY (orderid) REFERENCES table_orders (order_id))',
              [],
            );
          }
        },
      );
    });
  }, []);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme; // Use Light/Dark theme based on a state

  function toggleTheme() {
    // We will pass this function to Drawer and invoke it on theme switch press
    setIsDarkTheme((isDark) => !isDark);
  }
  const width = Dimensions.get('screen').width;
  return (
    <PaperProvider theme={theme}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.card}
      />
      <OfflineNotice />
      <NavigationContainer theme={theme}>
        <Drawer.Navigator
          drawerType={'slide'}
          drawerStyle={{width: width}}
          drawerContent={(props) => (
            <CustomSidebarMenu {...props} toggleTheme={toggleTheme} />
          )}
          drawerContentOptions={{
            activeTintColor: Colors.accent,
            itemStyle: {marginVertical: 5},
          }}>
          <Drawer.Screen
            name="HomeScreenStack"
            options={{
              drawerLabel: 'Home',
              groupName: 'Section 1',
              drawerIcon: ({focused, color, size}) => (
                <AntDesign name="home" color={color} size={size} />
              ),
            }}
            component={HomeScreenStack}
          />
          <Drawer.Screen
            name="OrdersScreenStack"
            options={{
              drawerLabel: 'Payments',
              groupName: 'Section 1',
              drawerIcon: ({focused, color, size}) => (
                <AntDesign name="creditcard" color={color} size={size} />
              ),
            }}
            component={MenuScreenStack}
          />
          <Drawer.Screen
            name="accout"
            options={{
              drawerLabel: 'My Account',
              groupName: 'Section 1',
              drawerIcon: ({focused, color, size}) => (
                <AntDesign name="idcard" color={color} size={size} />
              ),
            }}
            component={MenuScreenStack}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
export default App;
