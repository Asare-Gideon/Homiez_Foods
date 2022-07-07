import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
//import { setupListeners } from '@reduxjs/toolkit/query'
import { persistStore, persistReducer } from "redux-persist";
import {
  appConfigReducer,
  authReducer,
  cartsReducer,
  categoriesReducer,
  foodsReducer,
  ordersReducer,
} from "../reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import bottomNavigation from "../../features/utilitySlice/bottomSlice";
//import baseApi from "./baseApi";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["foods", "categories", "orders", "appConfig", "carts"],
};

const rootReducer = combineReducers({
  //[baseApi.reducerPath]: baseApi.reducer,
  bottomNav: bottomNavigation,
  categories: categoriesReducer,
  foods: foodsReducer,
  carts: cartsReducer,
  orders: ordersReducer,
  auth: authReducer,
  appConfig: appConfigReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  //middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware)
});

export let persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
