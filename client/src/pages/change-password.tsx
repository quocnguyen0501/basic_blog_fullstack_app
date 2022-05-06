import { CloseIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { InputPasswordField } from "../components/InputPasswordField";
import {
    ErrorMutationResponse,
    NewPasswordInput,
    useChangePasswordMutation,
} from "../generated/graphql";
import { mapFieldErrors } from "../helpers/mapFieldErrors";
import { validateChangePasswordSchema } from "../validation/ChangePasswordValidationSchema";

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [tokenError, setTokenError] = useState("");

    const { query } = useRouter();

    const [changePassword, _] = useChangePasswordMutation();

    const initialValues: NewPasswordInput = {
        newPassword: "",
    };

    const validationSchema = validateChangePasswordSchema;

    const onChangePasswordSubmit = async (
        values: NewPasswordInput,
        { setErrors }: FormikHelpers<NewPasswordInput>
    ) => {
        if (query.userId && query.token) {
            console.log(">>> USER ID: ", query.userId);
            console.log(">>> TOKEN: ", query.token);
            console.log(">>> PWD: ", values);

            const res = await changePassword({
                variables: {
                    userId: query.userId as string,
                    token: query.token as string,
                    newPasswordInput: {
                        newPassword: values.newPassword,
                    },
                },
            });

            if (!res.data?.changePassword[0].success) {
                console.log(">>>ASDASDASD");

                const fieldErrors = mapFieldErrors(
                    (res.data.changePassword[0] as ErrorMutationResponse).errors
                );

                if ("token" in fieldErrors) {
                    setTokenError(fieldErrors.token);
                }
                setErrors(fieldErrors);
            }
        }
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onChangePasswordSubmit}
            >
                {({
                    values,
                    touched,
                    errors,
                    handleChange,
                    isSubmitting,
                }: FormikProps<NewPasswordInput>) => (
                    <Form>
                        <Flex
                            minH={"100vh"}
                            align={"center"}
                            justify={"center"}
                            bg={useColorModeValue("gray.50", "gray.800")}
                        >
                            <Stack
                                spacing={4}
                                w={"full"}
                                maxW={"md"}
                                bg={useColorModeValue("white", "gray.700")}
                                rounded={"xl"}
                                boxShadow={"lg"}
                                p={6}
                                my={12}
                            >
                                <Heading
                                    lineHeight={1.1}
                                    fontSize={{ base: "2xl", md: "3xl" }}
                                >
                                    Enter new password
                                </Heading>
                                <InputPasswordField
                                    name="newPassword"
                                    placeholder="Enter new password"
                                    label="Password"
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                                />
                                {tokenError && (
                                    <Box textAlign="center" py={10} px={6}>
                                        <Box display="inline-block">
                                            <Flex
                                                flexDirection="column"
                                                justifyContent="center"
                                                alignItems="center"
                                                bg={"red.500"}
                                                rounded={"50px"}
                                                w={"55px"}
                                                h={"55px"}
                                                textAlign="center"
                                            >
                                                <CloseIcon
                                                    boxSize={"20px"}
                                                    color={"white"}
                                                />
                                            </Flex>
                                        </Box>
                                        <Heading
                                            as="h2"
                                            size="xl"
                                            mt={6}
                                            mb={2}
                                        >
                                            This is the headline
                                        </Heading>
                                        <Text color={"gray.500"}>
                                            {tokenError}
                                        </Text>
                                        <NextLink href="/forgot-password">
                                            <Button
                                                /* flex={1} */
                                                px={10}
                                                fontSize={"sm"}
                                                rounded={"full"}
                                                bg={"red.400"}
                                                color={"white"}
                                                boxShadow={
                                                    "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                                                }
                                                _hover={{
                                                    bg: "red.500",
                                                }}
                                                _focus={{
                                                    bg: "red.500",
                                                }}
                                            >
                                                Go back to Forgot Password
                                            </Button>
                                        </NextLink>
                                    </Box>
                                )}
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
                                        Submit
                                    </Button>
                                </Stack>
                            </Stack>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default ChangePassword;
