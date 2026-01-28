import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

const ProductSkeleton = () => {
  return (
    <Box p="20px">
      <Skeleton size="40" mx={"auto"} />
      <SkeletonText mt="4" w={20} noOfLines={1} spacing={4} mx={"auto"} />
      <SkeletonText mt="4" w="full" noOfLines={3} spacing={4} />
      <Skeleton mt="4" height="45px" width="40%" mx={"auto"} />
      <Skeleton mt="4" height="60px" />
    </Box>
  );
};
export default ProductSkeleton;
