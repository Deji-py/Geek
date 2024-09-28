import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basic_information: {},
  pricing_plan: [],
  tool_information: [],
};

export const toolSlice = createSlice({
  name: "toolSlice",
  initialState,
  reducers: {
    updateBasicInformation: (state, action) => {
      state.basic_information = {
        ...state.basic_information,
        ...action.payload,
      };
    },
    updatePricingPlan: (state, action) => {
      state.pricing_plan = { ...state.pricing_plan, ...action.payload };
    },
    updateToolInformation: (state, action) => {
      state.tool_information = { ...state.tool_information, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateBasicInformation,
  updatePricingPlan,
  updateToolInformation,
} = toolSlice.actions;

export default toolSlice.reducer;
