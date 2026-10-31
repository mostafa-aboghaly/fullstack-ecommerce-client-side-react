import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
  type BoxProps,
  type FlexProps,
} from "@chakra-ui/react";
import type { ReactNode } from "react";
import { FiChevronDown, FiHome, FiMenu } from "react-icons/fi";
import { HiOutlineViewColumns } from "react-icons/hi2";
import type { IconType } from "react-icons/lib";
import { Outlet, Link as Router } from "react-router-dom";
import CookieService from "../services/CookieService";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
interface LinkItemProps {
  name: string;
  to: string;
  icon: IconType;
}
interface SidebarProps extends BoxProps {
  onClose: () => void;
}
interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  to: string;
  onClose?: () => void;
}
interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, to: "/dashboard" },
  { name: "Products", icon: HiOutlineViewColumns, to: "/dashboard/products" },
];
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition={"3s ease"}
      bg={useColorModeValue("white", "gray.900")}
      borderRight={"1px"}
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos={"fixed"}
      h={"full"}
      {...rest}
    >
      <Flex
        h={20}
        alignItems={"center"}
        mx={8}
        justifyContent={"space-between"}
      >
        <Text fontSize={"2xl"} fontFamily={"monospace"} fontWeight={"bold"}>
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          to={link.to}
          onClose={onClose}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, to, onClose, ...rest }: NavItemProps) => {
  const handleClick = () => {
    onClose?.();
  };

  return (
    <Link
      as={Router}
      to={to}
      onClick={handleClick}
      _hover={{ textDecoration: "none" }}
    >
      <Flex
        align={"center"}
        p={2}
        mx={4}
        borderRadius={"lg"}
        role={"group"}
        cursor={"pointer"}
        _hover={{
          bg: "purple.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr={4}
            fontSize={"16"}
            _groupHover={{ color: "white" }}
            as={icon}
          />
        )}
        <Text ml={4}>{children}</Text>
      </Flex>
    </Link>
  );
};
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={"https://api.dicebear.com/9.x/pixel-art/svg"}
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Admin</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem
                onClick={() => {
                  setTimeout(() => {
                    CookieService.remove("jwt", { path: "/" });
                    window.location.replace(import.meta.env.BASE_URL);
                  }, 500);
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default function DashboardLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />

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
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} />

      <Box ml={{ base: 0, md: 60 }} p={4}>
        <Outlet />
      </Box>
    </Box>
  );
}
