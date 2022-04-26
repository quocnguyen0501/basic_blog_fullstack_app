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
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Wrapper from "../components/Wrapper";
import { Form, Formik, useFormik } from "formik";
import { ILoginInput } from "../types/form/LoginInput";
import InputTextField from "../components/InputTextField";
import {
    getDay,
    getDaysOfMonth,
    getMonths,
    getYears,
} from "../helpers/DateOfBirthHelper";

const Register = () => {
    const initialValues: ILoginInput = {
        email: "",
        firstName: "",
        surname: "",
        password: "",
        confirmPassword: "",
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        gender: "male",
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [months, setMonths] = useState(getMonths());
    const [years, setYears] = useState(getYears());
    const [days, setDays] = useState(
        getDaysOfMonth(initialValues.month, initialValues.year)
    );

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
                                        <HStack>
                                            <Box w={"full"} h={"full"}>
                                                <Select
                                                    id="day"
                                                    name="day"
                                                    defaultValue={
                                                        formikProps.values.day
                                                    }
                                                    onChange={
                                                        formikProps.handleChange
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
                                                        formikProps.values.month
                                                    }
                                                    onChange={
                                                        formikProps.handleChange
                                                    }
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
                                                    defaultValue={
                                                        formikProps.values.year
                                                    }
                                                    onChange={
                                                        formikProps.handleChange
                                                    }
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
                                            defaultValue={
                                                formikProps.values.gender
                                            }
                                            onChange={formikProps.handleChange}
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
                                                        onChange={
                                                            formikProps.handleChange
                                                        }
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
                                                        onChange={
                                                            formikProps.handleChange
                                                        }
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
                                                        onChange={
                                                            formikProps.handleChange
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
