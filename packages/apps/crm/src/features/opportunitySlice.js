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

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  generateInifiniteScrollCases,
  handlerApiCall,
  updateAgendaItems,
} from '@axelor/aos-mobile-core';
import {
  getOpportunityStatus,
  searchOpportunities,
  getOpportunity as _getOpportunity,
  updateOpportunityStatus as _updateOpportunityStatus,
  updateOpportunity as _updateOpportunity,
  updateOpportunityScoring as _updateOpportunityScoring,
  createOpportunity as _createOpportunity,
  getPartnerOpportunities as _getPartnerOpportunities,
} from '../api/opportunities-api';

export const fetchOpportunities = createAsyncThunk(
  'opportunity/fetchOpportunities',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchOpportunities,
      data,
      action: 'Crm_SliceAction_FetchOpportunities',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchOpportunityStatus = createAsyncThunk(
  'opportunity/fetchOpportunityStatus',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getOpportunityStatus,
      data,
      action: 'Crm_SliceAction_FetchOpportunitiesStatus',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const getOpportunity = createAsyncThunk(
  'opportunity/getOpportunity',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _getOpportunity,
      data,
      action: 'Crm_SliceAction_GetOpportunity',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const updateOpportunityStatus = createAsyncThunk(
  'opportunity/updateOpportunityStatus',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateOpportunityStatus,
      data,
      action: 'Crm_SliceAction_UpdateOpportunityStatus',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() =>
      handlerApiCall({
        fetchFunction: _getOpportunity,
        data: {opportunityId: data?.opportunityId},
        action: 'Crm_SliceAction_GetOpportunity',
        getState,
        responseOptions: {isArrayResponse: false},
      }),
    );
  },
);

export const updateOpportunityScore = createAsyncThunk(
  'opportunity/updateOpportunityScore',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateOpportunityScoring,
      data,
      action: 'Crm_SliceAction_UpdateOpportunityScore',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      return handlerApiCall({
        fetchFunction: _getOpportunity,
        data: {opportunityId: data?.opportunityId},
        action: 'Crm_SliceAction_GetOpportunity',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

export const updateOpportunity = createAsyncThunk(
  'opportunity/updateOpportunity',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateOpportunity,
      data,
      action: 'Crm_SliceAction_UpdateOpportunity',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      return handlerApiCall({
        fetchFunction: _getOpportunity,
        data: {opportunityId: data?.opportunity?.id},
        action: 'Crm_SliceAction_GetOpportunity',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

export const createOpportunity = createAsyncThunk(
  'opportunity/createOpportunity',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _createOpportunity,
      data,
      action: 'Crm_SliceAction_CreateOpportunity',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => {
      return handlerApiCall({
        fetchFunction: searchOpportunities,
        data,
        action: 'Crm_SliceAction_FetchOpportunities',
        getState,
        responseOptions: {isArrayResponse: true},
      });
    });
  },
);

export const getPartnerOpportunities = createAsyncThunk(
  'opportunity/getPartnerOpportunities',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _getPartnerOpportunities,
      data,
      action: 'Crm_SliceAction_GetPartnerOpportunities',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  loadingOpportunity: false,
  opportunity: {},

  loadingList: false,
  moreLoading: false,
  isListEnd: false,
  opportunityList: [],

  loadingOpportunityStatus: false,
  opportunityStatusList: [],

  partnerOpportunityList: {},
};

const opportunitySlice = createSlice({
  name: 'opportunity',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchOpportunities, {
      loading: 'loadingList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'opportunityList',
    });
    builder.addCase(fetchOpportunityStatus.pending, state => {
      state.loadingOpportunityStatus = true;
    });
    builder.addCase(fetchOpportunityStatus.fulfilled, (state, action) => {
      state.loadingOpportunityStatus = false;
      state.opportunityStatusList = action.payload;
    });
    builder.addCase(getOpportunity.pending, state => {
      state.loadingOpportunity = true;
    });
    builder.addCase(getOpportunity.fulfilled, (state, action) => {
      state.loadingOpportunity = false;
      state.opportunity = action.payload;
    });
    builder.addCase(updateOpportunityStatus.pending, (state, action) => {
      state.loadingOpportunity = true;
    });
    builder.addCase(updateOpportunityStatus.fulfilled, (state, action) => {
      state.loadingOpportunity = false;
      state.opportunity = action.payload;
      state.opportunityList = updateAgendaItems(state.opportunityList, [
        action.payload,
      ]);
    });
    builder.addCase(updateOpportunity.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateOpportunity.fulfilled, (state, action) => {
      state.loading = false;
      state.opportunity = action.payload;
      state.opportunityList = updateAgendaItems(state.opportunityList, [
        action.payload,
      ]);
    });
    builder.addCase(updateOpportunityScore.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateOpportunityScore.fulfilled, (state, action) => {
      state.loading = false;
      state.opportunity = action.payload;
      state.opportunityList = updateAgendaItems(state.opportunityList, [
        action.payload,
      ]);
    });
    builder.addCase(createOpportunity.pending, (state, action) => {
      state.loadingList = true;
    });
    builder.addCase(createOpportunity.fulfilled, (state, action) => {
      state.loadingList = false;
      state.opportunityList = action.payload;
    });
    builder.addCase(getPartnerOpportunities.fulfilled, (state, action) => {
      state.partnerOpportunityList = action.payload;
    });
  },
});

export const opportunityReducer = opportunitySlice.reducer;
