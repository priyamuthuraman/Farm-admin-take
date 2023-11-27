import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDefaultUrl } from "../../service/api.url";
import axiosDefault from "../../service/api.config";

const fetchUserThunk = createAsyncThunk("user/getinfo", async () => {
  let response = await axiosDefault.post(
    getDefaultUrl,
    {},
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );

  return response.data?.message;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
  },
  reducers: {
    updateUserInfo: (state, action) => {
      state.userInfo = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
      state.userInfo = { ...action.payload };
    });
  },
});

export const { updateUserInfo } = userSlice.actions;

export const getUser = (state) => state.user.userInfo;
export {
  fetchUserThunk
}

export default userSlice.reducer;
