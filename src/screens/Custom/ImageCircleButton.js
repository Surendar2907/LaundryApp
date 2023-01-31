import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ImageCircleButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        margin: props.margin,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={props.onPress}>
      {/* <Text style={{ color: props.textColor, fontSize: props.fontSize }}>
            {props.text}
        </Text> */}
      <AntDesign name="pluscircleo" color={props.color} size={props.size} />
    </TouchableOpacity>
  );
};

export default ImageCircleButton;
