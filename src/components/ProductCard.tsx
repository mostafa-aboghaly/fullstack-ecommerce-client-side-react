import { Card, CardBody } from "@chakra-ui/react/card";
import {
  Image,
  Stack,
  Heading,
  Text,
  Button,
  useColorMode,
  Box,
  HStack,
} from "@chakra-ui/react";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import type { IProduct } from "../interfaces";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/features/cartSlice";
import { numberWithCommas } from "../utils";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const onAddToCart = () => {
    dispatch(addToCart(product));
  };
  return (
    <Card
      bg={colorMode === "light" ? "white" : "gray.800"}
      borderRadius="2xl"
      overflow="hidden"
      transition="all 0.25s ease"
      _hover={{
        transform: "translateY(-4px)",
        shadow: "xl",
      }}
    >
      <Box position="relative">
        <Image
          src={
            product?.thumbnail?.formats?.small?.url ??
            product?.thumbnail?.url ??
            `${import.meta.env.BASE_URL}placeholder.png`
          }
          alt={product.title}
          h="220px"
          w="100%"
          objectFit="cover"
        />
      </Box>

      <CardBody>
        <Stack spacing={3}>
          <Heading size="md" noOfLines={1}>
            {product.title}
          </Heading>

          <Text fontSize="sm" color="gray.500" noOfLines={2}>
            {product.description}
          </Text>

          <Text fontSize="2xl" fontWeight="bold" color="purple.500">
            ${numberWithCommas(product.price.toString())}
          </Text>
          <HStack>
            <Button
              as={Link}
              to={`/product/${product.documentId ?? product.id ?? ""}`}
              colorScheme="purple"
              variant="solid"
              size="sm"
              w="full"
              mt={2}
            >
              View Details
            </Button>
            <Button
              rightIcon={<IoCartOutline size={20} />}
              onClick={onAddToCart}
              colorScheme="purple"
              size="sm"
              w="full"
              mt={2}
            >
              Add to cart
            </Button>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
};
export default ProductCard;
