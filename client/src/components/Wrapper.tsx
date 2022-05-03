import { Flex, useColorModeValue } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface IWrapperProps {
    children: ReactNode;
}

const Wrapper = ({ children }: IWrapperProps) => {
    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            {children}
        </Flex>
    );
};

export default Wrapper;
