import { createSlice, configureStore } from "@reduxjs/toolkit";

import type { Cords } from "components/MapView";

export interface Location {
  id: string;
  name: string;
  type: {
    value: string;
    label: string;
  };
  logo: string;
  cords: Cords;
}

interface AppState {
  locations: Location[];
}

const initialState: AppState = {
  locations: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addLocation: (state, action) => {
      state.locations.push(action.payload);
    },
    editLocation: (state, action) => {
      const { id, logo, name, type } = action.payload;
      const location = state.locations.find((item) => item.id === id);

      if (!location) return;

      location.logo = logo;
      location.name = name;
      location.type = type;
    },
  },
});

export const { addLocation, editLocation } = appSlice.actions;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export default store;
