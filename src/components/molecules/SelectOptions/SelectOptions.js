import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {SelectInput} from '@/components/atoms';
import Colors from '@/types/colors';

const SelectOptions = ({style, defaultValue, options}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={style}>
      <SelectInput
        style={styles.text}
        text={defaultValue}
        onPress={() => {
          setModalVisible(!isModalVisible);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text.grey,
    paddingVertical: 15,
  },
});

export default SelectOptions;
