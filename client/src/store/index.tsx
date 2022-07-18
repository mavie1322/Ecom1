import { configureStore } from "@reduxjs/toolkit";
import { basketSlice } from "./basket-slices";
import { categoriesSlice } from "./categories-slices";
import { errorsSlice } from "./errors-slices";
import { itemsSlice } from "./items-slice";
import { ordersSlice } from "./orders-slices";
import { userSlice } from "./user-slices";

const store = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    categories: categoriesSlice.reducer,
    basket: basketSlice.reducer,
    user: userSlice.reducer,
    errors: errorsSlice.reducer,
    orders: ordersSlice.reducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
