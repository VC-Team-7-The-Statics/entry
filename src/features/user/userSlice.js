import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  location: [],
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (
      state,
      { payload: { id, name, email, location = [], token } }
    ) => {
      state.id = id;
      state.name = name;
      state.email = email;
      state.location = location;
      state.token = token;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
  },
});

export const selectUser = (state) => state.user;

export const { setUser, setToken } = userSlice.actions;

export default userSlice.reducer;
