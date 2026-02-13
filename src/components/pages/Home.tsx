import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Grid,
  VStack,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";
import ProductCard from "../ProductCard";
import ProductCardSkeleton from "../ProductCardSkeleton";
import type { IProduct } from "../../interfaces";
import { useGetDashboardProductsQuery } from "../../app/services/apiSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { isLoading, data } = useGetDashboardProductsQuery({
    page: 1,
    limit: 7,
  });

  return (
    <Box>
      <Box
        bg={useColorModeValue("purple.600", "purple.900")}
        color="white"
        py={24}
      >
        <Container maxW="container.lg">
          <VStack spacing={5} align="start">
            <Heading as="h1" size="2xl">
              Welcome to Our Store
            </Heading>

            <Text
              fontSize="lg"
              color={useColorModeValue("purple.100", "purple.200")}
            >
              Find great products at amazing prices
            </Text>

            <Button
              bg={useColorModeValue("purple.700", "purple.400")}
              color={useColorModeValue("white", "white")}
              size="lg"
              px={8}
              _hover={{
                bg: useColorModeValue("purple.400", "purple.500"),
              }}
              onClick={() => navigate("/products")}
            >
              Shop Now
            </Button>
          </VStack>
        </Container>
      </Box>
      <Container maxW="container.lg" py={16}>
        {data?.data?.length === 0 ? (
          <Box textAlign={"center"} fontSize={"xl"}>
            No Products Yet
          </Box>
        ) : (
          <>
            <Heading as="h2" size="xl" mb={8}>
              Featured Products
            </Heading>

            <Grid
              templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
              gap={6}
            >
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              ) : data?.data ? (
                data.data.map((product: IProduct) => (
                  <ProductCard key={product.documentId} product={product} />
                ))
              ) : (
                <Text>No products available</Text>
              )}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};
export default Home;
