import { CloseIcon } from "@chakra-ui/icons";
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Text,
    useQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Navbar from "../../../components/Navbar";
import {
    useLoginProfileQuery,
    usePostQuery,
    useUpdatePostMutation,
} from "../../../generated/graphql";

import {
    ContentState,
    convertFromHTML,
    convertToRaw,
    EditorState,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { BsFilePost } from "react-icons/bs";
import { BiImageAlt } from "react-icons/bi";
import { FiLink } from "react-icons/fi";
import { ImListNumbered } from "react-icons/im";
import { HiOutlineMicrophone } from "react-icons/hi";
import InputTextCountWord from "../../../components/InputTextCountWord";
import InputContentRTE from "../../../components/InputContentRTE";
import { title } from "process";
import draftToHtml from "draftjs-to-html";
const EditPost = () => {
    const router = useRouter();

    const postId = router.query.id as string;
    const { data: profileLoginData, loading: profileLoginLoading } =
        useLoginProfileQuery();
    const { data: postData, loading: postLoading } = usePostQuery({
        variables: {
            id: postId,
        },
        skip: !router.isReady,
    });

    /**
     * If first render -> router undefine -> crash for query post
     * -> use useEffect hook for check router was ready for use
     */
    useEffect(() => {
        if (!router.isReady || !profileLoginData || !postData) return;
        const contentBlocks = convertFromHTML(postData.post.content);

        setWord(postData.post.title);
        setNumberWords(postData.post.title.length);
        setContent(
            EditorState.createWithContent(
                ContentState.createFromBlockArray(contentBlocks.contentBlocks)
            )
        );
    }, [router.isReady, profileLoginData, postData]);
    const [updatePost, { loading }] = useUpdatePostMutation();

    const [errorUpdate, setErrorUpdate] = useState("");
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

    if (profileLoginLoading || postLoading || !postData) {
        return (
            <>
                <Center pt={20} pb={6} px={2}>
                    <LoadingSpinner />
                </Center>
            </>
        );
    }

    if (!postData?.post) {
        return (
            <>
                <Navbar
                    useLoginProfileLoading={profileLoginLoading}
                    data={profileLoginData}
                />
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
                        Post not found
                    </Heading>
                </Box>
            </>
        );
    }

    if (
        !profileLoginLoading &&
        !postLoading &&
        profileLoginData?.loginProfile?.id !== postData?.post?.userId.toString()
    ) {
        return (
            <>
                <Navbar
                    useLoginProfileLoading={profileLoginLoading}
                    data={profileLoginData}
                />
                <Box textAlign="center" py={20} px={6}>
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
                        Unauthorised
                    </Heading>
                </Box>
            </>
        );
    }

    const handleUpdatePostSubmit = async () => {
        const contentInput = draftToHtml(
            convertToRaw(content.getCurrentContent())
        );

        const contentEmpty = EditorState.createEmpty();
        const contentEmptyString = draftToHtml(
            convertToRaw(contentEmpty.getCurrentContent())
        );

        if (
            word === postData.post.title &&
            contentInput === postData.post.content
        ) {
            setErrorUpdate(
                "Please change title or content of your post before Update"
            );
        } else if (word === "" || contentInput === contentEmptyString) {
            setErrorUpdate("Please fill information before update!");
        } else {
            await updatePost({
                variables: {
                    updatePostInput: {
                        id: postId,
                        title: word,
                        content: contentInput,
                    },
                },
            });
            router.back();
        }
    };

    return (
        <>
            <Navbar
                useLoginProfileLoading={profileLoginLoading}
                data={profileLoginData}
            />
            <Center pt={20} pb={6} px={2} zIndex={"2"}>
                <Box maxW={"900px"} w={"900px"}>
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
                    {errorUpdate !== "" && (
                        <Alert status="error" mt={"4"} borderRadius={5}>
                            <AlertIcon />
                            <AlertTitle>Error Update Post!</AlertTitle>
                            <AlertDescription>{errorUpdate}</AlertDescription>
                        </Alert>
                    )}
                    <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        mt={4}
                    >
                        <Button
                            onClick={handleUpdatePostSubmit}
                            colorScheme="teal"
                            // isLoading={isSubmitting}
                        >
                            Update Post
                        </Button>
                        <NextLink href="/">
                            <Button>Back to Homepage</Button>
                        </NextLink>
                    </Flex>
                </Box>
            </Center>
        </>
    );
};

export default EditPost;
