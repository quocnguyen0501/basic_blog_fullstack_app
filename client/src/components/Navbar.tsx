import { FC, ReactNode } from "react";
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
    HStack,
    VStack,
    Text,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import NextLink from "next/link";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { ISearchField } from "../types/form/ISearchField";
import InputSearchField from "./InputSearchField";
import {
    LoginProfileDocument,
    LoginProfileQuery,
    useLoginProfileQuery,
    useLogoutMutation,
    UserLogedInVotedFragmentDoc,
} from "../generated/graphql";
import { Formik } from "formik";
import { Reference } from "@apollo/client";

export const Navbar: FC<{
    data: LoginProfileQuery;
    useLoginProfileLoading: boolean;
}> = ({ data, useLoginProfileLoading }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [logout, { loading: useLogoutMutationLoading }] = useLogoutMutation();

    const logoutUser = async () => {
        await logout({
            update(cache, { data }) {
                if (data?.logout) {
                    cache.writeQuery<LoginProfileQuery>({
                        query: LoginProfileDocument,
                        data: {
                            loginProfile: null,
                        },
                    });
                    cache.modify({
                        fields: {
                            posts(existing) {
                                existing.paginatedPosts.forEach(
                                    (post: Reference) => {
                                        cache.writeFragment<{
                                            userLogedInVoted: number;
                                        }>({
                                            id: post.__ref, // `Post:17`
                                            fragment:
                                                UserLogedInVotedFragmentDoc,
                                            data: {
                                                userLogedInVoted: 0,
                                            },
                                        });
                                    }
                                );

                                return existing;
                            },
                        },
                    });
                }
            },
        });
    };

    const initialValues: ISearchField = {
        data: "",
    };

    let body: JSX.Element | null;

    if (useLoginProfileLoading) {
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
            <Box w={"full"}>
                <Menu>
                    <MenuButton
                        py={2}
                        transition="all 0.3s"
                        _focus={{ boxShadow: "none" }}
                    >
                        <HStack>
                            <Avatar
                                size={"sm"}
                                pos={"relative"}
                                _after={{
                                    content: '""',
                                    w: 3,
                                    h: 3,
                                    bg: "green.300",
                                    border: "2px solid white",
                                    rounded: "full",
                                    pos: "absolute",
                                    bottom: 0,
                                    right: 0,
                                }}
                            />
                            <VStack
                                display={{ base: "none", md: "flex" }}
                                alignItems="flex-start"
                                spacing="1px"
                                ml="2"
                            >
                                <Text fontSize="sm">{`${data.loginProfile.surname} ${data.loginProfile.firstName}`}</Text>
                                <Text fontSize="xs" color="gray.600">
                                    Online
                                </Text>
                            </VStack>
                            <Box display={{ base: "none", md: "flex" }}>
                                <FiChevronDown />
                            </Box>
                        </HStack>
                    </MenuButton>
                    <MenuList
                        bg={useColorModeValue("white", "gray.900")}
                        borderColor={useColorModeValue("gray.200", "gray.700")}
                    >
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>Settings</MenuItem>
                        <MenuItem>Billing</MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={logoutUser}>Sign out</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        );
    }

    return (
        <>
            <Box
                as="header"
                position="fixed"
                w={"full"}
                zIndex={1}
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
                    <Box w={"1200px"}>
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
                        <Stack
                            direction={"row"}
                            spacing={7}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
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
