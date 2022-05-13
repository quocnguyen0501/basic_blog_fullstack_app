import {
    Avatar,
    Box,
    Button,
    Center,
    Stack,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { FC } from "react";
import { ImImages, ImLink } from "react-icons/im";
import ModalCreatePost from "./ModalCreatePost";

const CreatePostButton: FC<{ userId: string }> = ({ userId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <ModalCreatePost
                isOpen={isOpen}
                onClose={onClose}
                userId={userId}
            />
            <Center>
                <Box
                    w={"full"}
                    bg={useColorModeValue("white", "gray.900")}
                    boxShadow={"2xl"}
                    rounded={"md"}
                    p={6}
                    overflow={"hidden"}
                >
                    <Stack
                        direction={"row"}
                        spacing={2}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Avatar
                            size={"md"}
                            pos={"relative"}
                            mr={"2"}
                            _after={{
                                content: '""',
                                w: 4,
                                h: 4,
                                bg: "green.300",
                                border: "2px solid white",
                                rounded: "full",
                                pos: "absolute",
                                bottom: 0,
                                right: 0,
                            }}
                        />
                        <Button
                            w={"full"}
                            h={"12"}
                            borderRadius={"full"}
                            _hover={{
                                border: "solid 0.5px",
                            }}
                            onClick={onOpen}
                        >
                            What's on your mind?
                        </Button>
                        <Button
                            alignItems={"center"}
                            justifyContent={"center"}
                            h={"12"}
                            rounded={"full"}
                            _hover={{
                                border: "solid 0.5px",
                            }}
                        >
                            <ImImages size={23} />
                        </Button>
                        <Button
                            alignItems={"center"}
                            justifyContent={"center"}
                            h={"12"}
                            rounded={"full"}
                            _hover={{
                                border: "solid 0.5px",
                            }}
                        >
                            <ImLink size={23} />
                        </Button>
                    </Stack>
                </Box>
            </Center>
        </>
    );
};

export default CreatePostButton;
