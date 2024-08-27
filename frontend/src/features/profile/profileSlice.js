import {
  createUserEmptyProfile,
  getProfile,
  updateUserProfile,
} from "./profileAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  isError: false,
  profile: {},
  error: "",
};

export const createANewProfile = createAsyncThunk(
  "profile/createANewProfile",
  async (data) => {
    const profile = await createUserEmptyProfile(data);
    return profile;
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (data) => {
    const profile = await updateUserProfile(data);
    return profile;
  }
);
export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async () => {
    const profile = await getProfile();
    return profile;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(createANewProfile.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createANewProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(createANewProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default profileSlice.reducer;
export const {} = profileSlice.actions;
