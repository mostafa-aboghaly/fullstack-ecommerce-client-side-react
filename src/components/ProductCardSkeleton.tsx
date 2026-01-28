import { Box, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";

const ProductCardSkeleton = () => {
  return (
    <Box
      bg="white"
      borderRadius="2xl"
      overflow="hidden"
      shadow="sm"
      maxW={"sm"}
    >
      <Skeleton height="220px" width="100%" />
      <Box p={4}>
        <Stack spacing={3}>
          <Skeleton height="20px" width="70%" />
          <SkeletonText noOfLines={2} spacing={2} />
          <Skeleton height="28px" width="40%" />
          <Skeleton height="40px" borderRadius="md" />
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductCardSkeleton;
