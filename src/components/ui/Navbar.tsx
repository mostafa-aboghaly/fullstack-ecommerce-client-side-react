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
import { Link as Router, useLocation } from "react-router-dom";
import CookieService from "../../services/CookieService";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../../app/features/cartSlice";
import { onOpenCartDrawerAction } from "../../app/features/globalSlice";

interface NavItem {
  name: string;
  to: string;
  isProtected?: boolean;
}

const navLinks: NavItem[] = [
  { name: "Dashboard", to: "/dashboard", isProtected: true },
  { name: "Home", to: "/" },
  { name: "Products", to: "/products" },
];

const NavLink = ({
  to,
  children,
  onClick,
}: {
  to: string;
  children: ReactNode;
  onClick?: () => void;
}) => {
  const { pathname } = useLocation();
  const isActive =
    to === "/"
      ? pathname === "/" || pathname === ""
      : to === "/products"
        ? pathname === "/products" || pathname.startsWith("/product")
        : pathname === to || pathname.startsWith(`${to}/`);

  const activeBg = useColorModeValue("purple.500", "purple.400");
  const activeColor = "white";
  const hoverBg = useColorModeValue("gray.200", "gray.700");

  return (
    <Link
      as={Router}
      to={to}
      px={3}
      py={1.5}
      rounded={"md"}
      bg={isActive ? activeBg : "transparent"}
      color={isActive ? activeColor : "inherit"}
      fontWeight={isActive ? "semibold" : "medium"}
      _hover={{
        textDecoration: "none",
        bg: isActive ? activeBg : hoverBg,
      }}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({
  to,
  children,
  onClose,
}: {
  to: string;
  children: ReactNode;
  onClose?: () => void;
}) => {
  const { pathname } = useLocation();
  const isActive =
    to === "/"
      ? pathname === "/" || pathname === ""
      : to === "/products"
        ? pathname === "/products" || pathname.startsWith("/product")
        : pathname === to || pathname.startsWith(`${to}/`);

  const activeBg = useColorModeValue("purple.500", "purple.400");
  const activeColor = "white";
  const hoverBg = useColorModeValue("gray.200", "gray.700");

  return (
    <Link
      as={Router}
      to={to}
      w="full"
      py={3}
      px={4}
      my={0.5}
      rounded="md"
      bg={isActive ? activeBg : "transparent"}
      color={isActive ? activeColor : "inherit"}
      fontWeight={isActive ? "semibold" : "medium"}
      _hover={{
        textDecoration: "none",
        bg: isActive ? activeBg : hoverBg,
      }}
      onClick={onClose}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const token = CookieService.get("jwt");
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navBg = useColorModeValue("gray.100", "gray.900");
  const borderColor = useColorModeValue("gray.300", "gray.700");
  const dividerColor = useColorModeValue("gray.200", "gray.700");

  const onLogout = () => {
    CookieService.remove("jwt", { path: "/" });
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
        bg={navBg}
        px={4}
        borderBottomWidth={"1px"}
        borderBottomColor={borderColor}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {navLinks
                .filter((link) => !link.isProtected || token)
                .map((link) => (
                  <NavLink key={link.to} to={link.to}>
                    {link.name}
                  </NavLink>
                ))}
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
                  <NavLink to="/login">Login</NavLink>
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
            {navLinks
              .filter((link) => !link.isProtected || token)
              .map((link) => (
                <MobileNavLink key={link.to} to={link.to} onClose={onClose}>
                  {link.name}
                </MobileNavLink>
              ))}
            {!token && (
              <>
                <Box
                  w="full"
                  h="1px"
                  bg={dividerColor}
                  my={2}
                />
                <MobileNavLink to="/login" onClose={onClose}>
                  Login
                </MobileNavLink>
              </>
            )}
          </VStack>
        </DrawerContent>
      </Drawer>
    </>
  );
}
