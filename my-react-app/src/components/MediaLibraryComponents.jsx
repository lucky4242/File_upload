import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const MediaLibraryAttachment = ({
    name,
    initialValue,
    validationRules,
    validationErrors,
    onFileChange,
}) => {
    const [file, setFile] = useState(initialValue);

    const onDrop = useCallback(
        (acceptedFiles) => {
            setFile(acceptedFiles[0]);
            onFileChange(acceptedFiles[0]);
        },
        [onFileChange]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: validationRules.accept.join(", "),
        maxSize: validationRules.maxSizeInKB * 1024,
        multiple: false,
    });

    return (
        <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} name={name} />
            <p>Drag 'n' Drop or Browse File</p>
            {file && <p>Selected file: {file.name}</p>}
            {validationErrors && <span>{validationErrors}</span>}
        </div>
    );
};

export { MediaLibraryAttachment };
