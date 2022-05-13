import React, { FC } from "react";
import { convertToRaw, EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";

/**
 * set up for SSR NextJS
 */
const Editor = dynamic<EditorProps>(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
) as any;
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box } from "@chakra-ui/react";

interface IInputContentRTE {
    content: EditorState;
    onEditorStateChange: (content: EditorState) => void;
}

const InputContentRTE: FC<IInputContentRTE> = ({
    content,
    onEditorStateChange,
}) => {
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
