import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  Stack,
  useColorMode,
} from "@chakra-ui/react";

const ProductsTableSkeleton = () => {
  const { colorMode } = useColorMode();

  const borderColor = colorMode === "light" ? "gray.200" : "gray.700";
  const rowBg = colorMode === "light" ? "white" : "gray.800";

  return (
    <Stack maxW="55%" mx="auto" mt={10} my={6} spacing={3}>
      {Array.from({ length: 8 }).map((_, idx) => (
        <Flex
          key={idx}
          alignItems="center"
          px={4}
          py={3}
          bg={rowBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="md"
        >
          <Skeleton h="10px" w="40px" mr={4} />
          <Skeleton h="10px" w="160px" mr={6} />
          <Skeleton h="10px" w="120px" mr={6} />
          <Skeleton boxSize="40px" borderRadius="md" mr={6} />
          <Skeleton h="10px" w="60px" ml="auto" mr={6} />
          <Skeleton h="10px" w="50px" mr={6} />
          <Flex gap={2}>
            <SkeletonCircle size="30px" />
            <SkeletonCircle size="30px" />
            <SkeletonCircle size="30px" />
          </Flex>
        </Flex>
      ))}
      <Box pt={2}>
        <Skeleton h="12px" w="200px" mx="auto" />
      </Box>
    </Stack>
  );
};

export default ProductsTableSkeleton;
