import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCompany: null,
  loading: false,
  error: false,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    companyLoginStart: (state) => {
      state.loading = true;
    },
    companyLoginSuccess: (state, action) => {
      state.loading = false;
      state.currentCompany = action.payload;
    },
    companyLoginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    companyLogout: (state) => {
      state.currentCompany = null;
      state.loading = false;
      state.error = false;
    },
    companyRegister: (state) => {
      state.currentCompany = null;
      state.loading = false;
      state.error = false;
    },
    companyRegisterSuccess: (state, action) => {
      state.loading = false;
      state.currentCompany = action.payload;
    },
    companyRegisterFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    companyUpdateProfile: (state, action) => {
      state.currentCompany = action.payload;
    },
  },
});

export const { companyLoginStart, companyLoginSuccess, companyLoginFailure, companyLogout, companyRegister, companyRegisterFailure, companyRegisterSuccess, companyUpdateProfile } =
  companySlice.actions;

export default companySlice.reducer;