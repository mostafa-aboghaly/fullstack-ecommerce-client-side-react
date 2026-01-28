import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { type IProduct } from "../../interfaces";
import { addItemToShoppingCart } from "../../utils";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();
interface IInitialState {
  cartProducts: IProduct[];
}
const initialState: IInitialState = {
  cartProducts: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      state.cartProducts = addItemToShoppingCart(
        action.payload,
        state.cartProducts,
      );
    },

    removeFromCart: (state, action: PayloadAction<number | undefined>) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id !== action.payload,
      );
      toast({
        title: "Item removed from cart",
        duration: 1000,
        status: "info",
        isClosable: true,
      });
    },

    increaseQuantity: (state, action: PayloadAction<number | undefined>) => {
      const item = state.cartProducts.find(
        (product) => product.id === action.payload,
      );
      if (item) {
        item.quantity = (item.quantity ?? 1) + 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<number | undefined>) => {
      const item = state.cartProducts.find(
        (product) => product.id === action.payload,
      );

      if (!item) return;

      if ((item.quantity ?? 1) === 1) {
        state.cartProducts = state.cartProducts.filter(
          (product) => product.id !== action.payload,
        );
        toast({
          title: "Item removed from cart",
          duration: 1000,
          status: "info",
          isClosable: true,
        });
      } else {
        item.quantity!--;
      }
    },

    clearCart: (state) => {
      state.cartProducts = [];
      toast({
        title: "Cart cleared",
        duration: 1000,
        status: "info",
        isClosable: true,
      });
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export const cartSelector = ({ cart }: RootState) => cart;
export default cartSlice.reducer;
