import React, { useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box, Textarea } from "@chakra-ui/react";

const InputContentRTE = () => {
    const [content, setContent] = useState(EditorState.createEmpty());

    const onEditorStateChange = (content: EditorState) => {
        setContent(content);
        console.log(draftToHtml(convertToRaw(content.getCurrentContent())));
    };
    return (
        <>
            <Editor
                editorState={content}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                placeholder="What's in your mind?"
                onEditorStateChange={onEditorStateChange}
            />
            <Box
                dangerouslySetInnerHTML={{
                    __html: draftToHtml(
                        convertToRaw(content.getCurrentContent())
                    ),
                }}
            ></Box>
        </>
    );
};

export default InputContentRTE;
