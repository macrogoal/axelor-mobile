/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ViewAllContainer} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {showLine} from '../../../../utils/line-navigation';
import {InternalMoveLineCard} from '../../internalMove';
import {fetchInternalMoveLines} from '../../../../features/internalMoveLineSlice';
import {getRacks} from '../../../../features/racksListSlice';

const InternalMoveViewAllContainer = ({}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {internalMove} = useSelector(state => state.internalMove);

  const {internalMoveLineList} = useSelector(state => state.internalMoveLine);
  const {loadingRacks, racksList} = useSelector(state => state.rack);

  useEffect(() => {
    if (internalMove != null) {
      dispatch(
        fetchInternalMoveLines({internalMoveId: internalMove?.id, page: 0}),
      );
    }
  }, [dispatch, internalMove]);

  useEffect(() => {
    dispatch(
      getRacks({
        stockId: internalMove?.fromStockLocation?.id,
        LineList: internalMoveLineList,
      }),
    );
  }, [dispatch, internalMove, internalMoveLineList]);

  const handleViewAll = () => {
    navigation.navigate('InternalMoveLineListScreen', {
      internalMove: internalMove,
    });
  };

  const handleShowLine = item => {
    showLine({
      item: {name: 'internalMove', data: internalMove},
      itemLine: {name: 'internalMoveLine', data: item},
      lineDetailsScreen: 'InternalMoveLineDetailsScreen',
      selectTrackingScreen: 'InternalMoveSelectTrackingScreen',
      selectProductScreen: 'InternalMoveSelectProductScreen',
      productKey: 'stockProduct',
      navigation,
    });
  };

  return (
    <ViewAllContainer
      data={internalMoveLineList}
      translator={I18n.t}
      renderFirstTwoItems={(item, index) => (
        <InternalMoveLineCard
          style={styles.item}
          productName={item.product?.fullName}
          internalMoveStatus={internalMove.statusSelect}
          availability={
            item.availableStatusSelect != null
              ? item.availableStatusSelect
              : null
          }
          locker={
            !loadingRacks && racksList != null && racksList[index] != null
              ? racksList[index][0]?.rack
              : ''
          }
          trackingNumber={item.trackingNumber?.trackingNumberSeq}
          expectedQty={item.qty}
          movedQty={item.isRealQtyModifiedByUser === false ? 0 : item.realQty}
          onPress={() => handleShowLine(item)}
        />
      )}
      onViewPress={handleViewAll}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 1,
    marginVertical: 4,
  },
});

export default InternalMoveViewAllContainer;
