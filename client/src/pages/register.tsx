import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    RadioGroup,
    Radio,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Wrapper from "../components/Wrapper";
import { Form, Formik, useFormik } from "formik";
import { ILoginInput } from "../types/form/LoginInput";
import InputTextField from "../components/InputTextField";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const initialValues: ILoginInput = {
        email: "",
        firstName: "",
        surname: "",
        password: "",
        confirmPassword: "",
        day: "",
        month: "",
        year: "",
        gender: "male",
    };

    return (
        <Wrapper>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Sign up
                    </Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values: ILoginInput) => console.log(values)}
                >
                    {(formikProps) => {
                        return (
                            <Form>
                                <Box
                                    rounded={"lg"}
                                    bg={useColorModeValue("white", "gray.700")}
                                    boxShadow={"lg"}
                                    p={8}
                                >
                                    <Stack spacing={4}>
                                        <HStack>
                                            <Box>
                                                <InputTextField
                                                    name="surname"
                                                    placeholder="Surname"
                                                    label="Surname"
                                                    type="text"
                                                />
                                            </Box>
                                            <Box>
                                                <InputTextField
                                                    name="firstName"
                                                    placeholder="First name"
                                                    label="First name"
                                                    type="text"
                                                />
                                            </Box>
                                        </HStack>
                                        <InputTextField
                                            name="email"
                                            placeholder="Email address"
                                            label="Email address"
                                            type="text"
                                        />
                                        <FormControl id="password" isRequired>
                                            <InputGroup>
                                                <Input
                                                    value={
                                                        formikProps.values
                                                            .password
                                                    }
                                                    onChange={
                                                        formikProps.handleChange
                                                    }
                                                    placeholder="Password"
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                />
                                                <InputRightElement h={"full"}>
                                                    <Button
                                                        variant={"ghost"}
                                                        onClick={() =>
                                                            setShowPassword(
                                                                (
                                                                    showPassword
                                                                ) =>
                                                                    !showPassword
                                                            )
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <ViewIcon />
                                                        ) : (
                                                            <ViewOffIcon />
                                                        )}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl
                                            id="confirmPassword"
                                            isRequired
                                        >
                                            <InputGroup>
                                                <Input
                                                    value={
                                                        formikProps.values
                                                            .confirmPassword
                                                    }
                                                    onChange={
                                                        formikProps.handleChange
                                                    }
                                                    placeholder="Confirm password"
                                                    type={
                                                        showConfirmPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                />
                                                <InputRightElement h={"full"}>
                                                    <Button
                                                        variant={"ghost"}
                                                        onClick={() =>
                                                            setShowConfirmPassword(
                                                                (
                                                                    showConfirmPassword
                                                                ) =>
                                                                    !showConfirmPassword
                                                            )
                                                        }
                                                    >
                                                        {showConfirmPassword ? (
                                                            <ViewIcon />
                                                        ) : (
                                                            <ViewOffIcon />
                                                        )}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                        </FormControl>
                                        <RadioGroup
                                            onChange={formikProps.handleChange}
                                            defaultValue={formikProps.values.gender}
                                        >
                                            <Stack direction="row">
                                                <Radio value="male" defaultChecked>Male</Radio>
                                                <Radio value="female">Female</Radio>
                                                <Radio value="3">Third</Radio>
                                            </Stack>
                                        </RadioGroup>
                                        <Stack spacing={10} pt={2}>
                                            <Button
                                                type="submit"
                                                loadingText="Submitting"
                                                size="lg"
                                                bg={"blue.400"}
                                                color={"white"}
                                                _hover={{
                                                    bg: "blue.500",
                                                }}
                                            >
                                                Sign up
                                            </Button>
                                        </Stack>
                                        <Stack pt={6}>
                                            <Text align={"center"}>
                                                Already a user?{" "}
                                                <Link color={"blue.400"}>
                                                    Login
                                                </Link>
                                            </Text>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Form>
                        );
                    }}
                </Formik>
            </Stack>
        </Wrapper>
    );
};

export default Register;
