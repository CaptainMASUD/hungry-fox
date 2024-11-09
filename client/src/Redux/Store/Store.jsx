// src/Redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../UserSlice/userSlice";
import themeReducer from "../Theme/ThemeSlice";
import cartReducer from "../CartSlice/cartSlice"
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  cart: cartReducer, 
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
