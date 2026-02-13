import {
  Card,
  CardBody,
  Box,
  Skeleton,
  SkeletonText,
  Stack,
  HStack,
  useColorMode,
} from "@chakra-ui/react";

const ProductCardSkeleton = () => {
  const { colorMode } = useColorMode();
  return (
    <Card
      bg={colorMode === "light" ? "white" : "gray.800"}
      borderRadius="2xl"
      overflow="hidden"
      shadow="sm"
      maxW={"sm"}
      transition="all 0.25s ease"
      _hover={{
        transform: "translateY(-4px)",
        shadow: "xl",
      }}
    >
      <Box position="relative">
        <Skeleton height="220px" width="100%" />
      </Box>
      <CardBody>
        <Stack spacing={3}>
          <Skeleton height="24px" width="70%" />
          <SkeletonText noOfLines={2} spacing={2} />
          <Skeleton height="32px" width="40%" />
          <HStack>
            <Skeleton height="32px" borderRadius="md" flex={1} />
            <Skeleton height="32px" borderRadius="md" flex={1} />
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCardSkeleton;
