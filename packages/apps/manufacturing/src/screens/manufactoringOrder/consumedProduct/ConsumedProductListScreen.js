/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  ChipSelect,
  Icon,
  Screen,
  ScrollList,
  HeaderContainer,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  areObjectsEquals,
  ScannerAutocompleteSearch,
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {StockIndicator} from '@axelor/aos-mobile-stock';
import {
  ManufacturingOrderHeader,
  ConsumedProductGlobalCard,
} from '../../../components';
import {
  fetchConsumedProducts,
  updateProdProductOfManufOrder,
} from '../../../features/prodProductSlice';

const productScanKey = 'product_manufacturing-order-consumed-product-list';
const IS_INFINITE_SCROLL_ENABLED = false;

const ConsumedProductListScreen = ({route, navigation}) => {
  const manufOrder = route.params.manufOrder;
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {canCreate, readonly} = usePermitted({
    modelName: 'com.axelor.apps.production.db.ProdProduct',
  });
  const {ManufOrder} = useTypes();

  const {loadingConsumedProducts, consumedProductList} = useSelector(
    state => state.prodProducts,
  );

  const [filteredList, setFilteredList] = useState(consumedProductList);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [product, setProduct] = useState(null);

  const fetchConsumedProductsAPI = useCallback(() => {
    dispatch(
      fetchConsumedProducts({
        manufOrderId: manufOrder?.id,
        manufOrderVersion: manufOrder?.version,
      }),
    );
  }, [dispatch, manufOrder]);

  const updateConsumedProductQtyAPI = useCallback(
    (item, moreValue) => {
      dispatch(
        updateProdProductOfManufOrder({
          stockMoveLineVersion: item.stockMoveLineVersion,
          stockMoveLineId: item.stockMoveLineId,
          prodProductQty: parseFloat(item.realQty) + parseFloat(moreValue),
          type: 'consumed',
          manufOrderId: manufOrder?.id,
          manufOrderVersion: manufOrder?.version,
        }),
      );
    },
    [dispatch, manufOrder],
  );

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list?.length === 0) {
        return list;
      } else if (selectedStatus !== null && selectedStatus.length > 0) {
        return list.filter(item => {
          if (selectedStatus[0].key === 'missingStatus') {
            return item.missingQty > 0;
          } else if (selectedStatus[0].key === 'partiallyStatus') {
            return item.plannedQty > item.realQty;
          } else if (selectedStatus[0].key === 'finishedStatus') {
            return item.plannedQty <= item.realQty;
          } else {
            return item;
          }
        });
      } else {
        return list;
      }
    },
    [selectedStatus],
  );

  const filterOnProduct = useCallback((list, value) => {
    if (list == null || list?.length === 0) {
      return [];
    } else {
      if (value) {
        return list.filter(item => areObjectsEquals(item.productName, value));
      } else {
        return list;
      }
    }
  }, []);

  useEffect(() => {
    setFilteredList(
      filterOnStatus(filterOnProduct(consumedProductList, product)),
    );
  }, [filterOnStatus, consumedProductList, filterOnProduct, product]);

  const handleViewItem = item => {
    navigation.navigate('ConsumedProductDetailsScreen', {
      manufOrderId: manufOrder.id,
      consumedProdProduct: item,
    });
  };

  const handleViewSubOF = () => {
    navigation.navigate('ChildrenManufOrderListScreen', {
      manufOrder: manufOrder,
    });
  };

  const handleAddProduct = () => {
    navigation.navigate('ConsumedProductSelectProductScreen', {
      manufOrder: manufOrder,
    });
  };

  const handleViewAvailability = item => {
    navigation.navigate('ProductStockIndicatorDetails', {
      type: StockIndicator.type.AvailableStock,
      productId: item.productId,
      companyId: manufOrder?.company?.id,
    });
  };

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <>
            <ManufacturingOrderHeader
              parentMO={manufOrder.parentMO}
              reference={manufOrder.manufOrderSeq}
              status={manufOrder.statusSelect}
              priority={manufOrder.prioritySelect}
            />
            <View style={styles.titleContainer}>
              <Text>{I18n.t('Manufacturing_ConsumedProduct')}</Text>
              <Icon
                name="plus-lg"
                size={20}
                color={Colors.primaryColor.background}
                touchable={true}
                visible={
                  canCreate &&
                  manufOrder?.statusSelect ===
                    ManufOrder?.statusSelect.InProgress
                }
                onPress={handleAddProduct}
              />
            </View>
            <ScannerAutocompleteSearch
              objectList={consumedProductList}
              fetchData={({searchValue}) => setProduct(searchValue)}
              displayValue={item => item?.productName}
              placeholder={I18n.t('Manufacturing_Product')}
              scanKeySearch={productScanKey}
              oneFilter={true}
            />
          </>
        }
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={[
              {
                title: I18n.t('Manufacturing_Status_Missing'),
                color: Colors.errorColor,
                key: 'missingStatus',
              },
              {
                title: I18n.t('Manufacturing_Status_ToPick'),
                color: Colors.plannedColor,
                key: 'partiallyStatus',
              },
              {
                title: I18n.t('Manufacturing_Status_Consumed'),
                color: Colors.successColor,
                key: 'finishedStatus',
              },
            ]}
          />
        }
      />
      <ScrollList
        loadingList={loadingConsumedProducts}
        data={filteredList}
        renderItem={({item}) => (
          <ConsumedProductGlobalCard
            productName={item?.productName}
            plannedQty={item?.plannedQty}
            consumedQty={item?.realQty}
            missingQty={item?.missingQty}
            availableQty={item?.availableStock}
            unitName={item?.unit?.unitName}
            trackingNumber={item?.trackingNumber?.trackingNumberSeq}
            onMorePress={pressValue =>
              updateConsumedProductQtyAPI(item, pressValue)
            }
            disableMore={
              readonly ||
              manufOrder?.statusSelect !== ManufOrder?.statusSelect.InProgress
            }
            onPress={() => handleViewItem(item)}
            onLocationPress={() => handleViewAvailability(item)}
            isSubOF={item.subManufOrderId != null}
            onSubOfPress={handleViewSubOF}
            stockMoveLineId={item.stockMoveLineId}
          />
        )}
        fetchData={fetchConsumedProductsAPI}
        isListEnd={!IS_INFINITE_SCROLL_ENABLED}
        filter={IS_INFINITE_SCROLL_ENABLED}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    marginBottom: '2%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
  },
});

export default ConsumedProductListScreen;
