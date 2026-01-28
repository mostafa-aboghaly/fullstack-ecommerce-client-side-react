import {
  Button,
  Drawer,
  Text,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  globalSelector,
  onCloseCartDrawerAction,
} from "../app/features/globalSlice";
import CartDrawerItems from "./CartDrawerItems";
import { cartSelector, clearCart } from "../app/features/cartSlice";
import { IoCartOutline } from "react-icons/io5";

const CartDrawer = () => {
  /*-----STATES-----*/
  const btnRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const { isOpenCartDrawer } = useSelector(globalSelector);
  const { cartProducts } = useSelector(cartSelector);
  const totalPrice = cartProducts.reduce(
    (acc, item) => acc + item.price * (item.quantity ?? 1),
    0,
  );

  /*-----HANDLERS-----*/
  const onClose = () => {
    dispatch(onCloseCartDrawerAction());
  };

  const onClear = () => {
    dispatch(clearCart());
  };

  return (
    <Drawer
      isOpen={isOpenCartDrawer}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Shopping Cart</DrawerHeader>

        <DrawerBody>
          {cartProducts.length ? (
            cartProducts.map((item) => (
              <CartDrawerItems key={item.id} {...item} />
            ))
          ) : (
            <HStack mt={10}>
              <Text color="gray.500">Your cart is empty</Text>
              <IoCartOutline size={23} />
            </HStack>
          )}
        </DrawerBody>

        {cartProducts.length > 0 && (
          <DrawerFooter flexDirection="column" gap={3}>
            <Flex w="full" justify="space-between">
              <Text fontWeight="medium">Total</Text>
              <Text fontWeight="bold">${totalPrice.toFixed(2)}</Text>
            </Flex>

            <Flex w="full" gap={3}>
              <Button
                onClick={onClear}
                variant="outline"
                colorScheme="purple"
                w="full"
              >
                Clear
              </Button>

              <Button colorScheme="purple" w="full">
                Checkout
              </Button>
            </Flex>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
