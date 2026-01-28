import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Grid,
  Card,
  CardBody,
  CardHeader,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiBox } from "react-icons/fi";
import { useGetDashboardProductsQuery } from "../../../app/services/apiSlice";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");
  const { data: productsData, isLoading } = useGetDashboardProductsQuery({
    page: 1,
  });

  const totalProducts = productsData?.meta?.pagination?.total || 0;

  const statCards = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: FiBox,
      color: "purple",
      isLoading,
    },
  ];

  const quickActions = [
    {
      label: "Add New Product",
      description: "Create a new product",
      action: () => {
        navigate("/dashboard/products", { state: { openCreateModal: true } });
      },
      icon: FiPlus,
    },
    {
      label: "Manage Products",
      description: "Edit, view, or delete products",
      action: () => navigate("/dashboard/products"),
      icon: FiBox,
    },
  ];

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")} py={8}>
      <Container maxW="container.lg">
        <VStack spacing={2} align="start" mb={12}>
          <Heading as="h1" size="2xl" color="purple.600">
            Welcome back, Admin!
          </Heading>
          <Text fontSize="md" color="gray.600">
            Here's what's happening with your store today.
          </Text>
        </VStack>
        <Grid
          templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          gap={6}
          mb={12}
        >
          {statCards.map((stat) => (
            <Card
              key={stat.label}
              bg={cardBg}
              borderColor={cardBorder}
              borderWidth="1px"
            >
              <CardBody>
                <HStack spacing={4}>
                  <Icon
                    as={stat.icon}
                    fontSize="2xl"
                    color={`${stat.color}.500`}
                  />
                  <VStack align="start" spacing={1}>
                    <Text fontSize="sm" color="gray.600">
                      {stat.label}
                    </Text>
                    {stat.isLoading ? (
                      <Spinner size="sm" />
                    ) : (
                      <Text fontSize="2xl" fontWeight="bold">
                        {stat.value}
                      </Text>
                    )}
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
          ))}
        </Grid>

        <VStack align="start" spacing={6}>
          <Heading as="h2" size="lg">
            Quick Actions
          </Heading>
          <Grid
            templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
            gap={6}
            w="full"
          >
            {quickActions.map((action) => (
              <Card
                key={action.label}
                bg={cardBg}
                borderColor={cardBorder}
                borderWidth="1px"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  shadow: "md",
                  transform: "translateY(-2px)",
                  borderColor: "purple.500",
                }}
              >
                <CardHeader>
                  <HStack spacing={3}>
                    <Icon as={action.icon} fontSize="xl" color="purple.600" />
                    <Text fontWeight="bold">{action.label}</Text>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <VStack align="start" spacing={4}>
                    <Text fontSize="sm" color="gray.600">
                      {action.description}
                    </Text>
                    <Button
                      colorScheme="purple"
                      size="sm"
                      w="full"
                      onClick={action.action}
                    >
                      Go
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};
export default AdminDashboard;
