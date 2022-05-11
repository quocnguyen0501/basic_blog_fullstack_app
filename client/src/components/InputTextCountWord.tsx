import { Flex, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

const InputTextCountWord = () => {
    const [word, setWord] = useState("");
    const [numberWords, setNumberWords] = useState(0);

    const onWordChange = (event: ChangeEvent<HTMLInputElement>) => {
        let input = event.target.value;
        const MAX_WORDS = 300;

        let number = numberWords;

        if (input.length > MAX_WORDS) {
            input = input.toString().slice(0, 300)
        }
        setWord(input);
        setNumberWords(input.length);
    };

    return (
        <>
            <Flex
                justifyContent={"center"}
                alignItems={"center"}
                border={"0.5px solid"}
                borderColor={"gray.400"}
                borderRadius={"10px"}
                _hover={{
                    border: "2px solid",
                    borderColor: "blue.200",
                }}
            >
                <Input
                    placeholder="Title"
                    w={"full"}
                    border={"transparent"}
                    focusBorderColor={"transparent"}
                    value={word}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        onWordChange(event)
                    }
                />
                <Text
                    fontWeight={"bold"}
                    fontSize={"12px"}
                    textColor={"gray.600"}
                    mr={"3"}
                >
                    {numberWords}/300
                </Text>
            </Flex>
        </>
    );
};

export default InputTextCountWord;
