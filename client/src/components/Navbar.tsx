import { ReactNode } from "react";
import {
    Box,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    Image,
    Input,
    Heading,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import logo from "../public/avatar.png";
import { Formik } from "formik";
import { ISearchField } from "../types/form/ISearchField";
import InputSearchField from "./InputSearchField";
import { useLoginProfileQuery } from "../generated/graphql";

export const Navbar = () => {
    const { data, loading, error } = useLoginProfileQuery();

    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialValues: ISearchField = {
        data: "",
    };

    let body: JSX.Element | null;

    if (loading) {
        body = null;
    } else if (!data?.loginProfile) {
        body = (
            <>
                <NextLink href="/login">
                    <Button
                        /* flex={1} */
                        px={10}
                        fontSize={"sm"}
                        rounded={"full"}
                        bg={"white.400"}
                        color={"wblack"}
                        border={"solid 0.1px"}
                        boxShadow={
                            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                        }
                        _hover={{
                            bg: "white.500",
                        }}
                        _focus={{
                            bg: "white.500",
                        }}
                    >
                        Log In
                    </Button>
                </NextLink>
                <NextLink href="/register">
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
                        Sign Up
                    </Button>
                </NextLink>
            </>
        );
    } else {
        body = (
            <Menu>
                <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                >
                    <Avatar
                        size={"sm"}
                        src={
                            "https://styles.redditmedia.com/t5_3g7hb/styles/communityIcon_r0bu1vjkmg851.png?width=256&s=048dd93e23a369889243e242cc741f4d2f88b5f8"
                        }
                    />
                </MenuButton>
                <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                        <Avatar
                            size={"2xl"}
                            src={
                                "https://styles.redditmedia.com/t5_3g7hb/styles/communityIcon_r0bu1vjkmg851.png?width=256&s=048dd93e23a369889243e242cc741f4d2f88b5f8"
                            }
                        />
                    </Center>
                    <br />
                    <Center>
                        <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuDivider />
                    <MenuItem>Logout</MenuItem>
                </MenuList>
            </Menu>
        );
    }

    return (
        <>
            <Box
                bg={useColorModeValue("white", "gray.900")}
                px={4}
                shadow={"lg"}
            >
                <Flex
                    h={16}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <NextLink href="/">
                        <button>
                            <Box w={"180px"}>
                                <Flex>
                                    <Box alignItems={"center"}>
                                        <Image
                                            src="https://cdn-icons-png.flaticon.com/512/7379/7379126.png"
                                            height={"30px"}
                                        />
                                    </Box>
                                    <Heading
                                        alignItems={"center"}
                                        mx={3}
                                        fontFamily={"monospace"}
                                        fontWeight={"semibold"}
                                        fontSize={"20px"}
                                    >
                                        QN-Network
                                    </Heading>
                                </Flex>
                            </Box>
                        </button>
                    </NextLink>
                    <Box w={"full"} mx={"50px"}>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values: ISearchField) =>
                                console.log(values)
                            }
                        >
                            <InputSearchField
                                label="Search"
                                name="Search"
                                placeholder="Search QN-Network"
                                type="text"
                            />
                        </Formik>
                    </Box>

                    <Flex alignItems={"center"}>
                        <Stack direction={"row"} spacing={7}>
                            {body}
                            <Button onClick={toggleColorMode}>
                                {colorMode === "light" ? (
                                    <MoonIcon />
                                ) : (
                                    <SunIcon />
                                )}
                            </Button>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
};

export default Navbar;
