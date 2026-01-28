import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import { useDispatch } from "react-redux";
import cartSlice from "./features/cartSlice";
import globalSlice from "./features/globalSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./services/apiSlice";
import networkSlice from "./features/networkSlice";
const persistCartConfig = {
  key: "cart",
  storage,
};
const persistedCart = persistReducer(persistCartConfig, cartSlice);
export const store = configureStore({
  reducer: {
    global: globalSlice,
    cart: persistedCart,
    login: loginSlice,
    network: networkSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([apiSlice.middleware]),
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes();
export const persistor = persistStore(store);
