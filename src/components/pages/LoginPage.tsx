import {
  Flex,
  Stack,
  Heading,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  useColorModeValue,
  InputGroup,
  FormHelperText,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { loginSelector, userLogin } from "../../app/features/loginSlice";
import { useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  /*-----STATES-----*/
  const navigate = useNavigate();
  const { data, loading } = useSelector(loginSelector);
  const dispatch = useAppDispatch();
  const hasNavigated = useRef(false);
  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /*-----HANDLERS-----*/
  const submitHandelr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.identifier && !user.password) {
      setIsEmail(true);
      setIsPassword(true);
      return;
    }
    if (!user.identifier) {
      setIsEmail(true);
      return;
    }
    if (!user.password) {
      setIsPassword(true);
      return;
    }
    setIsEmail(false);
    setIsPassword(false);
    dispatch(userLogin(user) as any);
  };

  const onChangeHandelr = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    if (data.jwt && !hasNavigated.current) {
      hasNavigated.current = true;
      navigate("/dashboard");
    }
  }, [data.jwt, navigate]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          as="form"
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          onSubmit={submitHandelr}
        >
          <Stack spacing={8}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                isInvalid={isEmail}
                errorBorderColor="crimson"
                value={user.identifier}
                onChange={onChangeHandelr}
                name="identifier"
              />
              {isEmail && (
                <FormHelperText color={"crimson"}>
                  Email is required
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  isInvalid={isPassword}
                  errorBorderColor="crimson"
                  value={user.password}
                  onChange={onChangeHandelr}
                  name="password"
                />

                <InputRightElement h={"full"}>
                  <Button
                    p={0}
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isPassword && (
                <FormHelperText color={"crimson"}>
                  Password is required
                </FormHelperText>
              )}
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={isEmail || isPassword ? "red.500" : "purple.600"}
                color={"white"}
                _hover={{
                  bg: isEmail || isPassword ? "red.600" : "purple.700",
                }}
                type="submit"
                isLoading={loading}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default LoginPage;
