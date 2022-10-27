import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View, Dimensions} from 'react-native';
import {useThemeColor, Text, Screen, Image, ScrollView} from '@aos-mobile/ui';
import {
  CameraScanner,
  ErrorText,
  LoginButton,
  PasswordInput,
  UrlInput,
  UsernameInput,
} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../features/authSlice';
import {
  enableScan,
  useScannedValueByKey,
  useScannerSelector,
} from '../features/scannerSlice';
import LogoImage from '../components/LogoImage/LogoImage';

const urlScanKey = 'login_url';

const LoginScreen = ({route}) => {
  const {loading, error} = useSelector(state => state.auth);
  const [camScan, setCamScan] = useState(false);
  const [scanData, setScanData] = useState(null);
  const {isEnabled, scanKey} = useScannerSelector();
  const scannedValue = useScannedValueByKey(urlScanKey);
  const appVersion = route?.params?.version;
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const [url, setUrl] = useState(
    'http://wip-api-mobile-preview.cloud-sw1.axelor.io/',
  );
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');

  useEffect(() => {
    if (scannedValue) {
      setUrl(scannedValue);
    } else if (scanData != null && scanData.value != null) {
      setCamScan(false);
      setUrl(scanData.value);
    }
  }, [scanData, scannedValue]);

  return (
    <Screen
      style={styles.container}
      fixedItems={
        <View style={styles.copyright}>
          <Text>{`© 2005 - ${new Date().getFullYear()} Axelor. All rights reserved.`}</Text>
          <Text>{`Version ${appVersion}`}</Text>
        </View>
      }>
      <CameraScanner
        isActive={camScan}
        onScan={setScanData}
        onClose={() => setCamScan(false)}
      />
      <ScrollView>
        <View style={styles.imageContainer}>
          <LogoImage url={url} />
        </View>
        <UrlInput
          value={url}
          onChange={setUrl}
          readOnly={loading}
          onScanPress={() => setCamScan(true)}
          onSelection={() => {
            dispatch(enableScan(urlScanKey));
          }}
          scanIconColor={
            isEnabled && scanKey === urlScanKey
              ? Colors.primaryColor
              : Colors.secondaryColor_dark
          }
        />
        <UsernameInput
          value={username}
          onChange={setUsername}
          readOnly={loading}
        />
        <PasswordInput
          value={password}
          onChange={setPassword}
          readOnly={loading}
        />
        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <LoginButton
              onPress={() => dispatch(login({url, username, password}))}
              disabled={loading}
            />
          )}
        </View>
        {error && <ErrorText message={error.message} />}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
    height: '15%',
    marginTop: Dimensions.get('window').height < 500 ? '25%' : '50%',
    marginBottom: '10%',
  },
  imageSize: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
  },
  copyright: {
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
  },
});

export default LoginScreen;
