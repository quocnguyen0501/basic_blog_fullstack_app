import { CheckCircleIcon } from "@chakra-ui/icons";
import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    FormErrorMessage,
    Box,
    Spinner,
} from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import NextLink from "next/link";
import React from "react";
import InputTextField from "../components/InputTextField";
import LoadingSpinner from "../components/LoadingSpinner";
import {
    ForgotPasswordInput,
    useForgotPasswordMutation,
} from "../generated/graphql";
import { useCheckAuth } from "../utils/useCheckAuth";
import { validateForgotPasswordSchema } from "../validation/ForgotPasswordValidationSchema";

const ForgotPassword = () => {
    const [forgotPassword, { loading, data }] = useForgotPasswordMutation();
    const { data: dataCheckAuth, loading: loadingCheckAuth } = useCheckAuth();

    const initialValues: ForgotPasswordInput = {
        email: "",
    };

    const validationSchema = validateForgotPasswordSchema;

    const onForgotPasswordSubmit = async (values: ForgotPasswordInput) => {
        console.log(">>> EMAIL: ", values);

        await forgotPassword({
            variables: {
                forgotPasswordInput: values,
            },
        });
    };

    if (
        loadingCheckAuth ||
        (!loadingCheckAuth && dataCheckAuth?.loginProfile)
    ) {
        return <LoadingSpinner />;
    } else {
        return (
            <>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onForgotPasswordSubmit}
                >
                    {({
                        values,
                        touched,
                        errors,
                        handleChange,
                        isSubmitting,
                    }: FormikProps<ForgotPasswordInput>) =>
                        !loading && data ? (
                            <Box textAlign="center" py={10} px={6}>
                                <CheckCircleIcon
                                    boxSize={"50px"}
                                    color={"green.500"}
                                />
                                <Heading as="h2" size="xl" mt={6} mb={2}>
                                    Find Your Account
                                </Heading>
                                <Text color={"gray.500"} mb={"13px"}>
                                    Please enter your email address to search
                                    for your account.
                                </Text>
                                <NextLink href="https://mail.google.com">
                                    <Button
                                        /* flex={1} */
                                        px={10}
                                        fontSize={"sm"}
                                        rounded={"full"}
                                        bg={"blue.400"}
                                        color={"white"}
                                        boxShadow={
                                            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                                        }
                                        _hover={{
                                            bg: "blue.500",
                                        }}
                                        _focus={{
                                            bg: "blue.500",
                                        }}
                                    >
                                        Verify Email
                                    </Button>
                                </NextLink>
                            </Box>
                        ) : (
                            <Form>
                                <Flex
                                    minH={"100vh"}
                                    align={"center"}
                                    justify={"center"}
                                    bg={useColorModeValue(
                                        "gray.50",
                                        "gray.800"
                                    )}
                                >
                                    <Stack
                                        spacing={4}
                                        w={"full"}
                                        maxW={"md"}
                                        bg={useColorModeValue(
                                            "white",
                                            "gray.700"
                                        )}
                                        rounded={"xl"}
                                        boxShadow={"lg"}
                                        p={6}
                                        my={12}
                                    >
                                        <Heading
                                            lineHeight={1.1}
                                            fontSize={{
                                                base: "2xl",
                                                md: "3xl",
                                            }}
                                        >
                                            Forgot your password?
                                        </Heading>
                                        <Text
                                            fontSize={{ base: "sm", sm: "md" }}
                                            color={useColorModeValue(
                                                "gray.800",
                                                "gray.400"
                                            )}
                                        >
                                            You&apos;ll get an email with a
                                            reset link
                                        </Text>
                                        <InputTextField
                                            name="email"
                                            placeholder="your-email@example.com"
                                            label="Email address"
                                            type="text"
                                        />
                                        {errors.email && touched.email ? (
                                            <FormErrorMessage>
                                                {errors.email}
                                            </FormErrorMessage>
                                        ) : null}
                                        <Stack spacing={6}>
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
                                                Request Reset
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Flex>
                            </Form>
                        )
                    }
                </Formik>
            </>
        );
    }
};

export default ForgotPassword;
