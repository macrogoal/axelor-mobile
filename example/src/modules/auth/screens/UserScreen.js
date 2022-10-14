import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
  Icon,
  Picker,
  Screen,
  ScrollView,
  Text,
  useConfig,
  useTheme,
  useThemeColor,
} from '@aos-mobile/ui';
import {
  ScannerAutocompleteSearch,
  logout,
  useDispatch,
  useSelector,
  useTranslator,
} from '@aos-mobile/core';
import {LogoutButton} from '@/modules/auth/components/molecules';
import {fetchCompanies} from '@/modules/auth/features/companySlice';
import {fetchLanguages} from '@/modules/auth/features/languageSlice';
import {searchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {
  changeActiveCompany,
  changeDefaultStockLocation,
  updateActiveUser,
  fetchActiveUser,
} from '@/modules/auth/features/userSlice';
import {IconSettings} from '../components/atoms';
import DeviceInfo from 'react-native-device-info';
//import {AutocompleteSearch} from '@/components/organisms';
import {displayItemName} from '@/modules/stock/utils/displayers';
import {fetchBaseConfig} from '../features/configSlice';
import {fetchStockMenuConfig} from '@/features/menuConfigSlice';

const stockLocationScanKey = 'stock-location_user-default';

const UserScreen = ({navigation}) => {
  const {companyList} = useSelector(state => state.company);
  const {userId} = useSelector(state => state.auth);
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const {languageList} = useSelector(state => state.language);
  const {loading, baseConfig} = useSelector(state => state.config);
  const {loadingUser, user, canModifyCompany} = useSelector(
    state => state.user,
  );
  const Theme = useTheme();
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {setFilterConfig, setVirtualKeyboardConfig} = useConfig();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActiveUser(userId));
    dispatch(fetchCompanies());
    dispatch(fetchLanguages());
    dispatch(fetchBaseConfig());
    dispatch(fetchStockMenuConfig());
  }, [dispatch, userId]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconSettings
          onPress={() => navigation.navigate('SettingsScreen', {user: user})}
        />
      ),
    });
  }, [navigation, user]);

  useEffect(() => {
    const SMALL_SCREEN_HEIGHT = 500;

    DeviceInfo.getManufacturer().then(manufacturer =>
      setVirtualKeyboardConfig(manufacturer === 'Zebra Technologies'),
    );

    setFilterConfig(Dimensions.get('window').height > SMALL_SCREEN_HEIGHT);
  }, [setFilterConfig, setVirtualKeyboardConfig]);

  const styles = useMemo(() => {
    return getStyles(Colors);
  }, [Colors]);

  const fetchStockLocationsAPI = useCallback(
    filterValue => {
      dispatch(
        searchStockLocations({
          searchValue: filterValue,
          companyId: user.activeCompany?.id,
        }),
      );
    },
    [dispatch, user],
  );

  const updateActiveCompany = useCallback(
    company => {
      dispatch(
        changeActiveCompany({
          newCompany: {
            $version: company?.$version,
            code: company?.code,
            id: company?.id,
            name: company?.name,
          },
        }),
      );
    },
    [dispatch],
  );

  const updateDefaultStockLocation = useCallback(
    stockLocation => {
      dispatch(
        changeDefaultStockLocation({
          newStockLocation: stockLocation,
        }),
      );
    },
    [dispatch],
  );

  const handleChangeTheme = useCallback(
    newTheme => Theme.changeTheme(newTheme),
    [Theme],
  );

  const updateLanguage = useCallback(
    language => {
      dispatch(
        updateActiveUser({id: user.id, language, version: user.version}),
      );
    },
    [dispatch, user],
  );

  return (
    <Screen
      style={styles.container}
      fixedItems={<LogoutButton onPress={() => dispatch(logout())} />}
      loading={loadingUser || loading}>
      <ScrollView>
        <Icon
          name="user-alt"
          size={Dimensions.get('window').width * 0.2}
          style={styles.imageContainer}
        />
        {baseConfig.enableMultiCompany && (
          <Picker
            title={I18n.t('User_ActiveCompany')}
            listItems={companyList}
            labelField="name"
            valueField="id"
            onValueChange={updateActiveCompany}
            isValueItem={true}
            disabled={!canModifyCompany}
            disabledValue={user?.activeCompany?.name}
          />
        )}
        <Text style={styles.itemTitle}>
          {`${I18n.t('User_DefaultStockLocation')}`}
        </Text>
        <ScannerAutocompleteSearch
          objectList={stockLocationList}
          value={user.workshopStockLocation}
          onChangeValue={updateDefaultStockLocation}
          fetchData={fetchStockLocationsAPI}
          displayValue={displayItemName}
          scanKeySearch={stockLocationScanKey}
          placeholder={I18n.t('Stock_StockLocation')}
        />
        {languageList.length > 1 && (
          <Picker
            title={I18n.t('User_Language')}
            defaultValue={user.language}
            listItems={languageList}
            labelField="name"
            valueField="code"
            onValueChange={updateLanguage}
            emptyValue={false}
          />
        )}
        {!Theme.isColorBlind && Theme.themes?.length !== 1 && (
          <Picker
            title={I18n.t('User_Theme')}
            defaultValue={Theme.activeTheme?.key}
            listItems={Theme.themes}
            labelField="name"
            valueField="key"
            onValueChange={handleChangeTheme}
            emptyValue={false}
          />
        )}
      </ScrollView>
    </Screen>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
    },
    centerItems: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    imageContainer: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.backgroundColor,
      borderRadius: Dimensions.get('window').width * 0.3,
      width: Dimensions.get('window').width * 0.3,
      height: Dimensions.get('window').width * 0.3,
      marginVertical: '5%',
    },
    companyContainer: {
      width: '95%',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginVertical: 3,
    },
    companyPicker: {
      width: '100%',
    },
    cardCompany: {
      marginLeft: 8,
      paddingHorizontal: 14,
      width: '95%',
    },
    itemTitle: {
      alignSelf: 'flex-start',
      marginLeft: 24,
    },
  });

export default UserScreen;
