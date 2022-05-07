import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLoginProfileQuery } from "../generated/graphql";

export const useCheckAuth = () => {
    const router = useRouter();

    const { data, loading } = useLoginProfileQuery();

    useEffect(() => {
        if (
            !loading &&
            data?.loginProfile &&
            (router.route === "/login" ||
                router.route === "/register" ||
                router.route === "/forgot-password" ||
                router.route === "/change-password")
        ) {
            router.replace("/");
        }
    }, [data, loading, router]);

    return { data, loading };
};
