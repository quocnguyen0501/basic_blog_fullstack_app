import { Search2Icon } from "@chakra-ui/icons";
import {
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import { IInputField } from "../types/form/InputField";

const InputSearchField = ({ ...props }: IInputField) => {
    const [field, { error }] = useField(props);

    return (
        <FormControl id={field.name} isRequired isInvalid={!!error}>
            <InputGroup>
                <Input
                    id={field.name}
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={props.placeholder}
                    type={props.type}
                />
                <InputRightElement h={"full"}>
                    <Button
                        variant={"ghost"}
                        onClick={(values) => console.log(values)}
                    >
                        <Search2Icon />
                    </Button>
                </InputRightElement>
            </InputGroup>
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    );
};

export default InputSearchField;
