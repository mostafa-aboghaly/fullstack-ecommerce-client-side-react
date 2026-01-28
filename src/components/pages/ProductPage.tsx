import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { addToCart } from "../../app/features/cartSlice";
import { useDispatch } from "react-redux";
import ProductCardSkeleton from "../ProductCardSkeleton";
import { IoCartOutline } from "react-icons/io5";
import { useGetSingleProductQuery } from "../../app/services/apiSlice";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const { isLoading, data } = useGetSingleProductQuery({ documentId });
  useEffect(() => {
    document.title = `Product ${data?.data?.title || ""}`;
  }, [data]);
  if (isLoading)
    return (
      <Box maxW={"sm"} mx={"auto"} mt="150px">
        <ProductCardSkeleton />
      </Box>
    );
  function goBack(): void {
    navigate(-1);
  }
  const onAddToCart = () => {
    dispatch(addToCart(data?.data));
  };

  return (
    <VStack spacing={6} px={4} mb={20} maxW={"md"} mx={"auto"}>
      <Flex
        alignItems="center"
        alignSelf="flex-start"
        gap={2}
        mt={6}
        cursor="pointer"
        color="gray.500"
        _hover={{ color: "purple.500" }}
        onClick={goBack}
      >
        <BsArrowLeft />
        <Text fontSize="sm">Back</Text>
      </Flex>

      <Card
        maxW="lg"
        w="full"
        borderRadius="2xl"
        overflow="hidden"
        bg={colorMode === "light" ? "white" : "gray.800"}
        shadow="lg"
      >
        <Box bg="gray.50">
          <Image
            src={`${data?.data?.thumbnail?.formats?.medium?.url ?? data?.data?.thumbnail?.formats?.medium?.url ?? "/placeholder.png"}`}
            alt={data?.data?.title}
            w="full"
            h="320px"
            objectFit="cover"
          />
        </Box>

        <CardBody>
          <Stack spacing={4}>
            <Heading size="lg">{data?.data?.title}</Heading>

            <Text color="gray.500" fontSize="sm">
              {data?.data?.description}
            </Text>

            <Text fontSize="3xl" fontWeight="bold" color="purple.500">
              ${data?.data?.price}
            </Text>

            <Button
              rightIcon={<IoCartOutline size={23} />}
              onClick={onAddToCart}
              colorScheme="purple"
              size="lg"
              w="full"
              mt={4}
            >
              Add to cart
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </VStack>
  );
};
export default ProductPage;
