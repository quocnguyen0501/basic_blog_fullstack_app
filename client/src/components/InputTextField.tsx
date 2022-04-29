import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import { IInputField } from "../types/form/InputField";

const InputField = ({ ...props }: IInputField) => {
    const [field, { error }] = useField(props);

    return (
        <>
            <FormControl id={field.name} isRequired isInvalid={!!error}>
                <Input {...field} id={field.name} {...props} />
                {error && <FormErrorMessage>{error}</FormErrorMessage>}
            </FormControl>
        </>
    );
};

export default InputField;
