import { createStandaloneToast } from "@chakra-ui/react";
import type { IProduct } from "../interfaces";

const { toast } = createStandaloneToast();
export const addItemToShoppingCart = (
  cartItem: IProduct,
  shoppingCartItems: IProduct[]
) => {
  const existingItem = shoppingCartItems.find(
    (item) => item.id === cartItem.id
  );
  if (existingItem) {
    toast({
      title: "Item added to cart",
      description: "The item is already in the cart, increased quantity by 1.",
      status: "info",
      duration: 1000,
      isClosable: true,
    });
    return shoppingCartItems.map((item) =>
      item.id === cartItem.id ? { ...item, quantity: item.quantity! + 1 } : item
    );
  }
  toast({
    title: "Item added to cart",
    duration: 1000,
    isClosable: true,
    description: "The item has been added to the cart.",
    status: "success",
  });
  return [...shoppingCartItems, { ...cartItem, quantity: 1 }];
};
