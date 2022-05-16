import { Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Navbar from "../../../components/Navbar";
import { useLoginProfileQuery, usePostQuery } from "../../../generated/graphql";

const EditPost = () => {
    const router = useRouter();
    const postId = router.query.id as string;

    const { data: profileLoginData, loading: profileLoginLoading } =
        useLoginProfileQuery();
    const { data: postData, loading: postLoading } = usePostQuery({
        variables: {
            id: postId,
        },
    });

    if (profileLoginLoading || postLoading) {
        return (
            <>
                <Navbar
                    data={profileLoginData}
                    useLoginProfileLoading={profileLoginLoading}
                />
                <Center pt={20} pb={6} px={2} zIndex={"2"}>
                    <LoadingSpinner />
                </Center>
            </>
        );
    }

    if (!postData.post) {
        return 
    }
    return <div>EditPost</div>;
};

export default EditPost;
