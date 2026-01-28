import {
  Divider,
  Flex,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import type { IProduct } from "../interfaces";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../app/features/cartSlice";

const CartDrawerItems = ({
  id,
  title,
  price,
  thumbnail,
  quantity,
}: IProduct) => {
  const dispatch = useDispatch();

  return (
    <>
      <Flex gap={4} align="center">
        <Image
          src={`${thumbnail?.formats?.small?.url ?? thumbnail?.formats?.small?.url ?? "/placeholder.png"}`}
          boxSize="70px"
          objectFit="cover"
          borderRadius="md"
          flexShrink={0}
        />

        <Stack spacing={2} flex={1}>
          <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
            {title}
          </Text>

          <Text fontSize="sm" color="gray.500">
            ${price}
          </Text>

          <Flex align="center" gap={2}>
            <IconButton
              aria-label="Decrease quantity"
              icon={<FiMinus />}
              size="xs"
              variant="outline"
              onClick={() => dispatch(decreaseQuantity(id))}
            />

            <Text fontSize="sm" minW="20px" textAlign="center">
              {quantity}
            </Text>

            <IconButton
              aria-label="Increase quantity"
              icon={<FiPlus />}
              size="xs"
              variant="outline"
              onClick={() => dispatch(increaseQuantity(id))}
            />
          </Flex>
        </Stack>

        <IconButton
          aria-label="Remove from cart"
          icon={<FiTrash2 />}
          size="sm"
          variant="ghost"
          colorScheme="purple"
          onClick={() => dispatch(removeFromCart(id))}
        />
      </Flex>

      <Divider my={4} />
    </>
  );
};

export default CartDrawerItems;
