"use client";
import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const TextEditor = (props: Props) => {
  const { value, onChange } = props;

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        className="app-text-editor"
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link"],
            ["clean"],
          ],
        }}
        formats={[]}
      />
    </div>
  );
};

export default TextEditor;
