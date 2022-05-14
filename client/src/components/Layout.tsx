import React, { ReactNode } from "react";
import { useLoginProfileQuery } from "../generated/graphql";
import Navbar from "./Navbar";
import Wrapper from "./Wrapper";

interface ILayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
    const { data: loginProfileData, loading: useLoginProfileLoading } =
        useLoginProfileQuery();

    return (
        <>
            <Navbar
                data={loginProfileData}
                useLoginProfileLoading={useLoginProfileLoading}
            />
            <Wrapper>{children}</Wrapper>
        </>
    );
};

export default Layout;
