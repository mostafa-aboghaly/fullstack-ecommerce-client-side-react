import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      px={4}
    >
      <Heading size="2xl" mb={4}>
        404
      </Heading>

      <Text fontSize="lg" color="gray.500" mb={6}>
        Page not found!
      </Text>

      <Button as={RouterLink} to="/" colorScheme="purple">
        Back to home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
