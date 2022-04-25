import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import { IInputField } from "../types/form/InputField";

const InputField = ({ ...props }: IInputField) => {
    const [field, { error }] = useField(props);

    console.log(error);

    return (
        <FormControl id={field.name} isRequired>
            <Input {...field} id={field.name} {...props} />
        </FormControl>
    );
};

export default InputField;
