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
import { ChangeEvent, useState } from "react";

import { useRouter } from "next/router";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
    PaginatedPost,
    PostMutationResponse,
    useCreateNewPostMutation,
} from "../generated/graphql";
import { ApolloCache, Reference } from "@apollo/client";

const ModalCreatePost = ({
    isOpen,
    onClose,
    userId,
}: {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
}) => {
    const [createPost, { loading }] = useCreateNewPostMutation();

    const [word, setWord] = useState("");
    const [numberWords, setNumberWords] = useState(0);
    const [content, setContent] = useState(EditorState.createEmpty());

    const onEditorStateChange = (content: EditorState) => {
        setContent(content);
    };

    const onWordChange = (event: ChangeEvent<HTMLInputElement>) => {
        let input = event.target.value;
        const MAX_WORDS = 300;

        let number = numberWords;

        if (input.length > MAX_WORDS) {
            input = input.toString().slice(0, 300);
        }
        setWord(input);
        setNumberWords(input.length);
    };

    const onPostClick = async () => {
        await createPost({
            variables: {
                createPostInput: {
                    userId: +userId,
                    title: word,
                    content: draftToHtml(
                        convertToRaw(content.getCurrentContent())
                    ),
                },
            },
            /**
             * Modify cache save list paginated post
             *
             * @param cache Apollo cache
             * @param data result receiv from server for create new post response
             */
            update(cache: ApolloCache<any>, { data }) {
                cache.modify({
                    fields: {
                        posts(
                            existing: Pick<
                                PaginatedPost,
                                | "__typename"
                                | "timeCompareCreatedAt"
                                | "hasMore"
                                | "totalPost"
                            > & { paginatedPosts: Reference[] }
                        ) {
                            if (
                                data?.createPost[0].success &&
                                (data.createPost[0] as PostMutationResponse)
                                    .post
                            ) {
                                // Post:new_id
                                const newPostRef = cache.identify(
                                    (data.createPost[0] as PostMutationResponse)
                                        .post
                                );

                                const newPostsAfterCreation = {
                                    ...existing,
                                    totalPost: existing.totalPost + 1,
                                    paginatedPosts: [
                                        { __ref: newPostRef },
                                        ...existing.paginatedPosts, // [{__ref: 'Post:1'}, {__ref: 'Post:2'}]
                                    ],
                                };

                                return newPostsAfterCreation;
                            }
                        },
                    },
                });
            },
        });

        setWord("");
        setContent(EditorState.createEmpty());

        onClose();
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW={"60rem"}>
                    <ModalHeader>Create a post</ModalHeader>
                    <ModalCloseButton />
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
                                    <Text ml={"4px"}>Image {"&"} Video</Text>
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
                                <InputTextCountWord
                                    word={word}
                                    setWord={setWord}
                                    numberWords={numberWords}
                                    setNumberWords={setNumberWords}
                                    onWordChange={onWordChange}
                                />
                            </Box>
                            <Box
                                border={"0.5px solid"}
                                borderColor={"gray.400"}
                                borderRadius={"7px"}
                                py={1}
                                px={2}
                            >
                                <InputContentRTE
                                    content={content}
                                    onEditorStateChange={onEditorStateChange}
                                />
                            </Box>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            type="submit"
                            variant="ghost"
                            onClick={onPostClick}
                            isLoading={loading}
                        >
                            Post
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalCreatePost;
