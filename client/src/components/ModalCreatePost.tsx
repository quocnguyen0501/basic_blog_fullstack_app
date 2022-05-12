import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    Flex,
    Text,
} from "@chakra-ui/react";
import { BsFilePost } from "react-icons/bs";
import { BiImageAlt } from "react-icons/bi";
import { FiLink } from "react-icons/fi";
import { ImListNumbered } from "react-icons/im";
import { HiOutlineMicrophone } from "react-icons/hi";
import InputTextCountWord from "./InputTextCountWord";
import InputContentRTE from "./InputContentRTE";
import { Formik } from "formik";
import { CreatePostInput } from "../generated/graphql";

const ModalCreatePost = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const initialValues: CreatePostInput = {
        userId: 0,
        title: "",
        content: "",
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW={"60rem"}>
                    <ModalHeader>Create a post</ModalHeader>
                    <ModalCloseButton />
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values: CreatePostInput) => console.log(values)}
                    >
                        <ModalBody>
                            <Box>
                                <Flex mb={4}>
                                    <Button
                                        w="full"
                                        borderRadius={"0"}
                                        borderLeftRadius={"10px"}
                                        border={"solid 0.3px"}
                                        backgroundColor={"blue.500"}
                                        textColor={"white"}
                                        _hover={{
                                            backgroundColor: "blue.600",
                                        }}
                                        borderColor={"gray.300"}
                                        display={"flex"}
                                    >
                                        <BsFilePost />
                                        <Text ml={"4px"}>Post</Text>
                                    </Button>
                                    <Button
                                        w="full"
                                        borderRadius={"0"}
                                        border={"solid 0.3px"}
                                        borderColor={"gray.300"}
                                    >
                                        <BiImageAlt size={21} />
                                        <Text ml={"4px"}>
                                            Image {"&"} Video
                                        </Text>
                                    </Button>
                                    <Button
                                        w="full"
                                        borderRadius={"0"}
                                        border={"solid 0.3px"}
                                        borderColor={"gray.300"}
                                    >
                                        <FiLink size={19} />
                                        <Text ml={"4px"}>Link</Text>
                                    </Button>
                                    <Button
                                        w="full"
                                        borderRadius={"0"}
                                        border={"solid 0.3px"}
                                        borderColor={"gray.300"}
                                        disabled
                                    >
                                        <ImListNumbered size={16} />
                                        <Text ml={"4px"}>Poll</Text>
                                    </Button>
                                    <Button
                                        w="full"
                                        borderRadius={"0"}
                                        borderRightRadius={"10px"}
                                        border={"solid 0.3px"}
                                        borderColor={"gray.300"}
                                        disabled
                                    >
                                        <HiOutlineMicrophone size={18} />
                                        <Text ml={"4px"}>Voice</Text>
                                    </Button>
                                </Flex>
                                <hr />
                                <Box my={"3"}>
                                    <InputTextCountWord />
                                </Box>
                                <Box
                                    border={"0.5px solid"}
                                    borderColor={"gray.400"}
                                    borderRadius={"7px"}
                                    py={1}
                                    px={2}
                                >
                                    <InputContentRTE />
                                </Box>
                            </Box>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant="ghost">Post</Button>
                        </ModalFooter>
                    </Formik>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalCreatePost;
