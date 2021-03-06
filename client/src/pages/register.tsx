import {
    Box,
    FormLabel,
    HStack,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    RadioGroup,
    Radio,
    Select,
    FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import NextLink from "next/link";
import Wrapper from "../components/Wrapper";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { IRegisterInput } from "../types/form/IRegisterInput";
import InputTextField from "../components/InputTextField";
import { getDays, getMonths, getYears } from "../helpers/DateOfBirthHelper";
import {
    ErrorMutationResponse,
    RegisterInput,
    useRegisterMutation,
} from "../generated/graphql";
import { validateSignUpSchema } from "../validation/RegisterValidationSchema";
import { mapFieldErrors } from "../helpers/mapFieldErrors";
import router from "next/router";
import { InputPasswordField } from "../components/InputPasswordField";
import { useCheckAuth } from "../utils/useCheckAuth";
import LoadingSpinner from "../components/LoadingSpinner";

const Register = () => {
    const initialValues: IRegisterInput = {
        email: "",
        firstName: "",
        surname: "",
        password: "",
        confirmPassword: "",
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        gender: "male",
    };

    const [registerUser, { loading: _registerUserLoading }] =
        useRegisterMutation();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [months, _setMonths] = useState(getMonths());
    const [years, _setYears] = useState(getYears());
    const [days, _setDays] = useState(getDays());
    const { data: dataCheckAuth, loading: loadingCheckAuth } = useCheckAuth();

    const validationSchema = validateSignUpSchema;

    const onRegisterSubmit = async (
        values: IRegisterInput,
        { setErrors }: FormikHelpers<IRegisterInput>
    ) => {
        const registerInput: RegisterInput = {
            email: values.email,
            firstName: values.firstName,
            surname: values.surname,
            password: values.password,
            day: values.day.toString(),
            month: values.month.toString(),
            year: values.year.toString(),
            gender: values.gender,
        };

        const res = await registerUser({
            variables: {
                registerInput: registerInput,
            },
        });

        if (res.data.register[0].code !== 200) {
            const errorMutationResponse: ErrorMutationResponse = res.data
                .register[0] as ErrorMutationResponse;

            setErrors(mapFieldErrors(errorMutationResponse.errors));
        } else {
            router.push("/login");
        }
    };

    return (
        <>
            {loadingCheckAuth ||
            (!loadingCheckAuth && dataCheckAuth?.loginProfile) ? (
                <LoadingSpinner />
            ) : (
                <Wrapper>
                    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                        <Stack align={"center"}>
                            <Heading fontSize={"4xl"} textAlign={"center"}>
                                Sign up
                            </Heading>
                            <Text fontSize={"lg"} color={"gray.600"}>
                                to enjoy all of our cool features ??????
                            </Text>
                        </Stack>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onRegisterSubmit}
                        >
                            {({
                                values,
                                touched,
                                errors,
                                handleChange,
                                isSubmitting,
                            }: FormikProps<IRegisterInput>) => {
                                return (
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
                                                {errors.firstName &&
                                                touched.firstName ? (
                                                    <FormErrorMessage>
                                                        {errors.firstName}
                                                    </FormErrorMessage>
                                                ) : null}
                                                {errors.surname &&
                                                touched.surname ? (
                                                    <FormErrorMessage>
                                                        {errors.surname}
                                                    </FormErrorMessage>
                                                ) : null}
                                                <InputTextField
                                                    name="email"
                                                    placeholder="Email address"
                                                    label="Email address"
                                                    type="text"
                                                />
                                                {errors.email &&
                                                touched.email ? (
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
                                                <InputPasswordField
                                                    name="confirmPassword"
                                                    placeholder="Confirm password"
                                                    label="Password"
                                                    showPassword={
                                                        showConfirmPassword
                                                    }
                                                    setShowPassword={
                                                        setShowConfirmPassword
                                                    }
                                                />
                                                <FormLabel
                                                    fontSize={"12px"}
                                                    color={"gray.400"}
                                                >
                                                    Date of birth
                                                </FormLabel>
                                                <HStack>
                                                    <Box w={"full"} h={"full"}>
                                                        <Select
                                                            id="day"
                                                            name="day"
                                                            defaultValue={
                                                                values.day
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                        >
                                                            {days.map((day) => (
                                                                <option
                                                                    value={day}
                                                                    key={day}
                                                                >
                                                                    {day}
                                                                </option>
                                                            ))}
                                                        </Select>
                                                    </Box>
                                                    <Box w={"full"} h={"full"}>
                                                        <Select
                                                            id="month"
                                                            name="month"
                                                            defaultValue={
                                                                values.month
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                        >
                                                            {months.map(
                                                                (month) => (
                                                                    <option
                                                                        value={months.indexOf(
                                                                            month
                                                                        )}
                                                                        key={months.indexOf(
                                                                            month
                                                                        )}
                                                                    >
                                                                        {month}
                                                                    </option>
                                                                )
                                                            )}
                                                        </Select>
                                                    </Box>
                                                    <Box w={"full"} h={"full"}>
                                                        <Select
                                                            id="year"
                                                            name="year"
                                                            defaultValue={
                                                                values.year
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                        >
                                                            {years.map(
                                                                (year) => (
                                                                    <option
                                                                        value={
                                                                            year
                                                                        }
                                                                        key={
                                                                            year
                                                                        }
                                                                    >
                                                                        {year}
                                                                    </option>
                                                                )
                                                            )}
                                                        </Select>
                                                    </Box>
                                                </HStack>
                                                <FormLabel
                                                    fontSize={"12px"}
                                                    color={"gray.400"}
                                                >
                                                    Gender
                                                </FormLabel>
                                                <RadioGroup
                                                    id="gender"
                                                    name="gender"
                                                    defaultValue={values.gender}
                                                    onChange={handleChange}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        spacing={"2"}
                                                    >
                                                        <Box
                                                            border={"solid 1px"}
                                                            borderColor={
                                                                "gray.300"
                                                            }
                                                            borderRadius={"7px"}
                                                            w={"full"}
                                                            h={"full"}
                                                            p={3}
                                                        >
                                                            <Radio
                                                                id="male"
                                                                value="male"
                                                                defaultChecked
                                                                onChange={
                                                                    handleChange
                                                                }
                                                            >
                                                                Male
                                                            </Radio>
                                                        </Box>
                                                        <Box
                                                            border={"solid 1px"}
                                                            borderColor={
                                                                "gray.300"
                                                            }
                                                            borderRadius={"7px"}
                                                            w={"full"}
                                                            h={"full"}
                                                            p={3}
                                                        >
                                                            <Radio
                                                                id="female"
                                                                value="female"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                            >
                                                                Female
                                                            </Radio>
                                                        </Box>
                                                        <Box
                                                            border={"solid 1px"}
                                                            borderColor={
                                                                "gray.300"
                                                            }
                                                            borderRadius={"7px"}
                                                            w={"full"}
                                                            h={"full"}
                                                            p={3}
                                                        >
                                                            <Radio
                                                                id="other"
                                                                value="3"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                            >
                                                                Other
                                                            </Radio>
                                                        </Box>
                                                    </Stack>
                                                </RadioGroup>
                                                <Stack spacing={10} pt={2}>
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
                                                        Sign up
                                                    </Button>
                                                </Stack>
                                                <Stack pt={6}>
                                                    <Text align={"center"}>
                                                        Already a user?{" "}
                                                        <NextLink
                                                            href={"/login"}
                                                        >
                                                            <Link
                                                                color={
                                                                    "blue.400"
                                                                }
                                                            >
                                                                Login
                                                            </Link>
                                                        </NextLink>
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
            )}
        </>
    );
};

export default Register;
