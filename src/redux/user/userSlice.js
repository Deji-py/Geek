const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUserState: (state, action) => {
      state.currentUser = { ...state?.currentUser, ...action.payload };
    },
    logout: (state, action) => {
      state.currentUser = null;
    },
  },
});

export const { updateUserState, signInUser, logout } = userSlice.actions;
export default userSlice.reducer;
