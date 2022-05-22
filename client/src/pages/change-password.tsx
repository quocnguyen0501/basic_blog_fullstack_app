import { CloseIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    Heading,
    Stack,
    Text,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useState } from "react";
import { InputPasswordField } from "../components/InputPasswordField";
import {
    ErrorMutationResponse,
    NewPasswordInput,
    useChangePasswordMutation,
} from "../generated/graphql";
import { mapFieldErrors } from "../helpers/mapFieldErrors";
import { validateChangePasswordSchema } from "../validation/ChangePasswordValidationSchema";
import { useCheckAuth } from "../utils/useCheckAuth";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ResetPasswordForm(): JSX.Element {
    const router = useRouter();
    const toast = useToast();
    const { data: dataCheckAuth, loading: loadingCheckAuth } = useCheckAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [tokenError, setTokenError] = useState("");
    const initialValues: NewPasswordInput = {
        newPassword: "",
    };
    const validationSchema = validateChangePasswordSchema;
    const [changePassword, _] = useChangePasswordMutation();

    const userId = router.query.userId as string;
    const token = router.query.token as string;

    const onChangePasswordSubmit = async (
        values: NewPasswordInput,
        { setErrors }: FormikHelpers<NewPasswordInput>
    ) => {
        if (userId && token) {
            const res = await changePassword({
                variables: {
                    userId: userId,
                    token: token,
                    newPasswordInput: values,
                },
            });

            if (!res.data.changePassword[0].success) {
                console.log(">>> ERROR", res.data.changePassword[0].code);

                const FIELD_ERROR_NAME_TOKEN = "token";

                const fieldErrors = mapFieldErrors(
                    (res.data.changePassword[0] as ErrorMutationResponse).errors
                );

                if (FIELD_ERROR_NAME_TOKEN in fieldErrors) {
                    setTokenError(fieldErrors.token);
                }
                setErrors(fieldErrors);
            } else {
                toast({
                    title: "Change password successfully!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                router.push("/login");
            }
        }
    };

    if (
        loadingCheckAuth ||
        (!loadingCheckAuth && dataCheckAuth?.loginProfile)
    ) {
        return <LoadingSpinner />;
    } else if (!userId || !token) {
        router.replace("/");
    } else {
        return (
            <>
                {tokenError ? (
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
                                <CloseIcon boxSize={"20px"} color={"white"} />
                            </Flex>
                        </Box>
                        <Heading as="h2" size="xl" mt={6} mb={2}>
                            TOKEN ERROR
                        </Heading>
                        <Text color={"gray.500"}>{tokenError}</Text>
                        <NextLink href={"/forgot-password"}>
                            <Button
                                /* flex={1} */
                                mt={5}
                                px={8}
                                py={2}
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
                ) : (
                    <Flex
                        minH={"100vh"}
                        align={"center"}
                        justify={"center"}
                        bg={useColorModeValue("gray.50", "gray.800")}
                    >
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onChangePasswordSubmit}
                        >
                            {({
                                isSubmitting,
                            }: FormikProps<NewPasswordInput>) => (
                                <Form>
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
                                            Enter new password
                                        </Heading>
                                        <InputPasswordField
                                            name="newPassword"
                                            placeholder="Enter new password"
                                            label="Password"
                                            showPassword={showPassword}
                                            setShowPassword={setShowPassword}
                                        />
                                        <Stack spacing={6}>
                                            <Button
                                                type="submit"
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
                                </Form>
                            )}
                        </Formik>
                    </Flex>
                )}
            </>
        );
    }
}
