import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputGroup,
    InputRightElement,
    FormErrorMessage,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import router from "next/router";
import { useState } from "react";
import InputTextField from "../components/InputTextField";
import {
    ErrorMutationResponse,
    LoginInput,
    useLoginMutation,
} from "../generated/graphql";
import { mapFieldErrors } from "../helpers/mapFieldErrors";
import { validateSignInSchema } from "../validation/LoginValidationSchema";

const login = () => {
    const [loginUser, { loading: _loginUserLogin, data, error }] =
        useLoginMutation();
    const [showPassword, setShowPassword] = useState(false);

    const initialValues: LoginInput = {
        email: "",
        password: "",
    };

    const validationSchema = validateSignInSchema;

    const onLoginSubmit = async (
        values: LoginInput,
        { setErrors }: FormikHelpers<LoginInput>
    ) => {
        const res = await loginUser({
            variables: {
                loginInput: values,
            },
        });

        if (res.data.login[0].code !== 200) {
            const errorMutationResponse: ErrorMutationResponse = res.data
                .login[0] as ErrorMutationResponse;
            console.log(">>> ERROR MUTATION RES: ", errorMutationResponse);

            setErrors(mapFieldErrors(errorMutationResponse.errors));
        } else {
            router.push("/");
        }
    };

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
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to enjoy all of our cool{" "}
                        <Link color={"blue.400"}>features</Link> ✌️
                    </Text>
                </Stack>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onLoginSubmit}
                >
                    {({
                        values,
                        touched,
                        errors,
                        handleChange,
                        isSubmitting,
                    }: FormikProps<LoginInput>) => (
                        <Form>
                            <Box
                                rounded={"lg"}
                                bg={useColorModeValue("white", "gray.700")}
                                boxShadow={"lg"}
                                p={8}
                            >
                                <Stack spacing={4}>
                                    <InputTextField
                                        name="email"
                                        placeholder="Email address"
                                        label="Email address"
                                        type="text"
                                    />
                                    {errors.email && touched.email ? (
                                        <FormErrorMessage>
                                            {errors.email}
                                        </FormErrorMessage>
                                    ) : null}
                                    <FormControl
                                        id="password"
                                        isRequired
                                        isInvalid={!!error}
                                    >
                                        <InputGroup>
                                            <Input
                                                id="password"
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
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
                                                            (showPassword) =>
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
                                        {error && (
                                            <FormErrorMessage>
                                                {error}
                                            </FormErrorMessage>
                                        )}
                                    </FormControl>
                                    <Stack spacing={10}>
                                        <Stack
                                            direction={{
                                                base: "column",
                                                sm: "row",
                                            }}
                                            align={"start"}
                                            justify={"space-between"}
                                        >
                                            <Checkbox>Remember me</Checkbox>
                                            <Link color={"blue.400"}>
                                                Forgot password?
                                            </Link>
                                        </Stack>
                                        <Button
                                            type="submit"
                                            size="lg"
                                            bg={"blue.400"}
                                            color={"white"}
                                            _hover={{
                                                bg: "blue.500",
                                            }}
                                            isLoading={isSubmitting}
                                        >
                                            Sign in
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Stack>
        </Flex>
    );
};

export default login;
