import {
  Avatar,
  Box,
  Button,
  Center,
  CloseButton,
  Drawer,
  DrawerContent,
  DrawerHeader,
  Flex,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import type { ReactNode } from "react";
import { Link as Router } from "react-router-dom";
import CookieService from "../../services/CookieService";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../../app/features/cartSlice";
import { onOpenCartDrawerAction } from "../../app/features/globalSlice";

const links = ["Dashboard", "Products"];
const NavLink = ({ children }: { children: ReactNode }) => {
  return (
    <Link
      as={Router}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      to={children?.toString().toLowerCase()}
    >
      {children}
    </Link>
  );
};

const token = CookieService.get("jwt");
export default function Navbar() {
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onLogout = () => {
    CookieService.remove("jwt");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  const { cartProducts } = useSelector(cartSelector);
  const onOpenCart = () => {
    dispatch(onOpenCartDrawerAction());
  };

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        borderBottomWidth={"1px"}
        borderBottomColor={useColorModeValue("gray.300", "gray.700")}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {links.map((link) =>
                link === "Dashboard" ? (
                  token ? (
                    <NavLink key={link}>{link}</NavLink>
                  ) : null
                ) : (
                  <NavLink key={link}>{link}</NavLink>
                ),
              )}
            </HStack>

            <IconButton
              icon={<HamburgerIcon />}
              variant="ghost"
              display={{ base: "flex", md: "none" }}
              onClick={onOpen}
              size="lg"
              aria-label="Open menu"
            />
          </HStack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button onClick={onOpenCart}>cart ({cartProducts.length})</Button>
              {token ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://api.dicebear.com/9.x/pixel-art/svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={"https://api.dicebear.com/9.x/pixel-art/svg"}
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem onClick={onLogout}>Sign out</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                >
                  <NavLink>login</NavLink>
                </HStack>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <span>Menu</span>
            <CloseButton onClick={onClose} />
          </DrawerHeader>
          <VStack spacing={0} align="start" w="full" p={4}>
            {links.map((link) =>
              link === "Dashboard" ? (
                token ? (
                  <Link
                    key={link}
                    as={Router}
                    to={link.toLowerCase()}
                    w="full"
                    py={3}
                    px={4}
                    rounded="md"
                    _hover={{
                      textDecoration: "none",
                      bg: useColorModeValue("gray.200", "gray.700"),
                    }}
                    onClick={onClose}
                  >
                    {link}
                  </Link>
                ) : null
              ) : (
                <Link
                  key={link}
                  as={Router}
                  to={link.toLowerCase()}
                  w="full"
                  py={3}
                  px={4}
                  rounded="md"
                  _hover={{
                    textDecoration: "none",
                    bg: useColorModeValue("gray.200", "gray.700"),
                  }}
                  onClick={onClose}
                >
                  {link}
                </Link>
              ),
            )}
            {!token && (
              <>
                <Box
                  w="full"
                  h="1px"
                  bg={useColorModeValue("gray.200", "gray.700")}
                  my={2}
                />
                <Link
                  as={Router}
                  to="login"
                  w="full"
                  py={3}
                  px={4}
                  rounded="md"
                  _hover={{
                    textDecoration: "none",
                    bg: useColorModeValue("gray.200", "gray.700"),
                  }}
                  onClick={onClose}
                >
                  Login
                </Link>
              </>
            )}
          </VStack>
        </DrawerContent>
      </Drawer>
    </>
  );
}
