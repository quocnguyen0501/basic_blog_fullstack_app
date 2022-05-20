import {
    Flex,
    Box,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    FormErrorMessage,
    useToast,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import router from "next/router";
import NextLink from "next/link";
import { useState } from "react";
import { InputPasswordField } from "../components/InputPasswordField";
import InputTextField from "../components/InputTextField";
import {
    ErrorMutationResponse,
    LoginInput,
    LoginProfileDocument,
    useLoginMutation,
    UserMutationResponse,
} from "../generated/graphql";
import { mapFieldErrors } from "../helpers/mapFieldErrors";
import { useCheckAuth } from "../utils/useCheckAuth";
import { validateSignInSchema } from "../validation/LoginValidationSchema";
import LoadingSpinner from "../components/LoadingSpinner";
import { initializeApollo } from "../lib/apolloClient";

const login = () => {
    const { data: dataCheckAuth, loading: loadingCheckAuth } = useCheckAuth();
    const [loginUser, { loading: _loginUserLogin, data, error }] =
        useLoginMutation();
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();

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
            refetchQueries: [
                {
                    query: LoginProfileDocument,
                },
            ],
        });

        if (res.data.login[0].code !== 200) {
            const errorMutationResponse: ErrorMutationResponse = res.data
                .login[0] as ErrorMutationResponse;
            console.log(">>> ERROR MUTATION RES: ", errorMutationResponse);

            setErrors(mapFieldErrors(errorMutationResponse.errors));
        } else {
            const user = (res.data.login[0] as UserMutationResponse).user;

            toast({
                title: "Welcome",
                description: `${user.surname} ${user.firstName}`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            // Reset Cache save before login
            const apolloClient = initializeApollo();
            apolloClient.resetStore();

            router.replace("/");
        }
    };

    return (
        <>
            {loadingCheckAuth ||
            (!loadingCheckAuth && dataCheckAuth?.loginProfile) ? (
                <LoadingSpinner />
            ) : (
                <Flex
                    minH={"100vh"}
                    align={"center"}
                    justify={"center"}
                    bg={useColorModeValue("gray.50", "gray.800")}
                >
                    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                        <Stack align={"center"}>
                            <Heading fontSize={"4xl"}>
                                Sign in to your account
                            </Heading>
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
                                        bg={useColorModeValue(
                                            "white",
                                            "gray.700"
                                        )}
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
                                            <InputPasswordField
                                                name="password"
                                                placeholder="Password"
                                                label="Password"
                                                showPassword={showPassword}
                                                setShowPassword={
                                                    setShowPassword
                                                }
                                            />
                                            <Stack spacing={10}>
                                                <Stack
                                                    direction={{
                                                        base: "column",
                                                        sm: "row",
                                                    }}
                                                    align={"start"}
                                                    justify={"space-between"}
                                                >
                                                    <Checkbox>
                                                        Remember me
                                                    </Checkbox>
                                                    <NextLink
                                                        href={
                                                            "/forgot-password"
                                                        }
                                                    >
                                                        <Link
                                                            color={"blue.400"}
                                                        >
                                                            Forgot password?
                                                        </Link>
                                                    </NextLink>
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
                                                <Stack pt={-20}>
                                                    <Text align={"center"}>
                                                        Don't have an account?{" "}
                                                        <NextLink
                                                            href={"/register"}
                                                        >
                                                            <Link
                                                                color={
                                                                    "blue.400"
                                                                }
                                                            >
                                                                Register
                                                            </Link>
                                                        </NextLink>
                                                    </Text>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Stack>
                </Flex>
            )}
        </>
    );
};

export default login;
