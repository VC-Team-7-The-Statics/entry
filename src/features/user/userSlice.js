import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  location: {},
  image: "",
  price: "",
  likes: [],
  match: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (
      state,
      {
        payload: {
          id,
          name,
          email,
          location = {},
          image,
          expertise,
          price,
          likes = [],
          match = [],
        },
      }
    ) => {
      state.id = id;
      state.name = name;
      state.email = email;
      state.location = location;
      state.image = image;
      state.expertise = expertise;
      state.price = price;
      state.likes = likes;
      state.match = match;
    },
  },
});

export const selectUser = (state) => state.user;

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
