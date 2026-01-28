import ProductCard from "../ProductCard";
import { Box, Button, Flex, Grid, Stack } from "@chakra-ui/react";
import ProductSkeleton from "../ProductCardSkeleton";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useGetDashboardProductsQuery } from "../../app/services/apiSlice";
import { useState } from "react";
import type { IProduct } from "../../interfaces";
const Products = () => {
  const [page, setPage] = useState<number>(1);
  const { isLoading, data } = useGetDashboardProductsQuery({ page });

  if (isLoading) {
    return (
      <Grid
        margin={10}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={4}
      >
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </Grid>
    );
  }

  const products: IProduct[] = data?.data || [];
  const pageCount = data?.meta?.pagination?.pageCount || 1;

  return (
    <Flex flexDirection={"column"}>
      {products.length === 0 ? (
        <Box textAlign={"center"} fontSize={"xl"}>
          No Products Found
        </Box>
      ) : (
        <>
          <Grid
            margin={5}
            templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
            gap={4}
          >
            {products?.map((product: IProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
          <Stack
            direction="row"
            spacing={4}
            w={"fit-content"}
            mx={"auto"}
            mb={4}
          >
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              leftIcon={<FaArrowLeftLong />}
              colorScheme="purple"
              variant="outline"
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              rightIcon={<FaArrowRightLong />}
              colorScheme="purple"
              variant="outline"
              disabled={page === pageCount}
            >
              Next
            </Button>
          </Stack>
        </>
      )}
    </Flex>
  );
};

export default Products;
