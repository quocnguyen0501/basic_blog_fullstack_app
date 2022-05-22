import { Flex, FormControl, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, FC, SetStateAction} from "react";

interface IInputTitle {
    word: string;
    setWord: Dispatch<SetStateAction<string>>;
    numberWords: number;
    setNumberWords: Dispatch<SetStateAction<number>>;
    onWordChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputTextCountWord: FC<IInputTitle> = ({
    word,
    numberWords,
    onWordChange,
}) => {
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
                <FormControl>
                    <Input
                        id="title"
                        placeholder="Title"
                        w={"full"}
                        border={"transparent"}
                        focusBorderColor={"transparent"}
                        value={word}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            onWordChange(event)
                        }
                        required
                    />
                </FormControl>
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
