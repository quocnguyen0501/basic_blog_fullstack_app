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
    Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Wrapper from "../components/Wrapper";
import { Form, Formik, FormikHelpers, FormikProps, useFormik } from "formik";
import { IRegisterInput } from "../types/form/LoginInput";
import InputTextField from "../components/InputTextField";
import { getDays, getMonths, getYears } from "../helpers/DateOfBirthHelper";
import {
    ErrorMutationResponse,
    RegisterInput,
    useRegisterMutation,
} from "../generated/graphql";
import { validateSignUpSchema } from "../validation/RegisterValidationSchema";

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

    const [registerUser, { loading: _registerUserLoading, data, error }] =
        useRegisterMutation();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [months, _setMonths] = useState(getMonths());
    const [years, _setYears] = useState(getYears());
    const [days, _setDays] = useState(getDays());

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

        console.log(">>> RESPONSE: ", res.data.register[0].code);

        if (res.data.register[0].code !== 200) {
            const errorMutationResponse: ErrorMutationResponse = res.data
                .register[0] as ErrorMutationResponse;

            console.log(">>> ERROR: ");

            errorMutationResponse.errors.forEach((e) => {
                console.log(e.message);
            });

            setErrors({
                email: "Email was wrong",
            });
        }
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
                    validationSchema={validationSchema}
                    onSubmit={onRegisterSubmit}
                >
                    {({
                        values,
                        touched,
                        errors,
                        handleBlur,
                        handleChange,
                        isSubmitting,
                    }: FormikProps<IRegisterInput>) => {
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
                                        {errors.firstName &&
                                        touched.firstName ? (
                                            <div>{errors.firstName}</div>
                                        ) : null}
                                        {errors.surname && touched.surname ? (
                                            <div>{errors.surname}</div>
                                        ) : null}
                                        <InputTextField
                                            name="email"
                                            placeholder="Email address"
                                            label="Email address"
                                            type="text"
                                        />
                                        {errors.email && touched.email ? (
                                            <div>{errors.email}</div>
                                        ) : null}
                                        <FormControl id="password" isRequired>
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
                                            {errors.password &&
                                            touched.password ? (
                                                <div>{errors.firstName}</div>
                                            ) : null}
                                        </FormControl>
                                        <FormControl
                                            id="confirmPassword"
                                            isRequired
                                        >
                                            <InputGroup>
                                                <Input
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    value={
                                                        values.confirmPassword
                                                    }
                                                    onChange={handleChange}
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
                                            {errors.confirmPassword &&
                                            touched.confirmPassword ? (
                                                <div>
                                                    {errors.confirmPassword}
                                                </div>
                                            ) : null}
                                        </FormControl>
                                        <HStack>
                                            <Box w={"full"} h={"full"}>
                                                <Select
                                                    id="day"
                                                    name="day"
                                                    defaultValue={values.day}
                                                    onChange={handleChange}
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
                                                    defaultValue={values.month}
                                                    onChange={handleChange}
                                                >
                                                    {months.map((month) => (
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
                                                    ))}
                                                </Select>
                                            </Box>
                                            <Box w={"full"} h={"full"}>
                                                <Select
                                                    id="year"
                                                    name="year"
                                                    defaultValue={values.year}
                                                    onChange={handleChange}
                                                >
                                                    {years.map((year) => (
                                                        <option
                                                            value={year}
                                                            key={year}
                                                        >
                                                            {year}
                                                        </option>
                                                    ))}
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
                                                    borderColor={"gray.300"}
                                                    borderRadius={"7px"}
                                                    w={"full"}
                                                    h={"full"}
                                                    p={3}
                                                >
                                                    <Radio
                                                        id="male"
                                                        value="male"
                                                        defaultChecked
                                                        onChange={handleChange}
                                                    >
                                                        Male
                                                    </Radio>
                                                </Box>
                                                <Box
                                                    border={"solid 1px"}
                                                    borderColor={"gray.300"}
                                                    borderRadius={"7px"}
                                                    w={"full"}
                                                    h={"full"}
                                                    p={3}
                                                >
                                                    <Radio
                                                        id="female"
                                                        value="female"
                                                        onChange={handleChange}
                                                    >
                                                        Female
                                                    </Radio>
                                                </Box>
                                                <Box
                                                    border={"solid 1px"}
                                                    borderColor={"gray.300"}
                                                    borderRadius={"7px"}
                                                    w={"full"}
                                                    h={"full"}
                                                    p={3}
                                                >
                                                    <Radio
                                                        id="other"
                                                        value="3"
                                                        onChange={handleChange}
                                                    >
                                                        Other
                                                    </Radio>
                                                </Box>
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
