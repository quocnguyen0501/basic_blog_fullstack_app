import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import { InputPasswordField } from "../components/InputPasswordField";
import { NewPasswordInput } from "../generated/graphql";
import { validateChangePasswordSchema } from "../validation/ChangePasswordValidationSchema";

export default function ResetPasswordForm(): JSX.Element {
    const [showPassword, setShowPassword] = useState(false);
    const initialValues: NewPasswordInput = {
        newPassword: "",
    };
    const validationSchema = validateChangePasswordSchema;

    const onChangePasswordSubmit = (values: NewPasswordInput) => {
        console.log(values);
        console.log("FINISHHHHHH");
    };

    return (
        <>
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
        </>
    );
}
