import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '@/components/atoms';
import Colors from '@/types/colors';

const LoginButton = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        styleTxt={styles.title}
        title="LOGIN"
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    marginTop: 15,
    backgroundColor: Colors.button.green,
    borderRadius: 50,
    width: '30%',
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default LoginButton;
