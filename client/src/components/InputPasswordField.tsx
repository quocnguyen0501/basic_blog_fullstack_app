import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { ErrorMessage, useField } from "formik";
import { IInputField } from "../types/form/InputField";

export const InputPasswordField = ({ ...props }: IInputField) => {
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
                    type={props.showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                    <Button
                        variant={"ghost"}
                        onClick={() =>
                            props.setShowPassword(
                                (showPassword) => !showPassword
                            )
                        }
                    >
                        {props.showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    );
};
