import React, { useState } from "react";
import { MediaLibraryAttachment } from "./components/MediaLibraryComponents";
import "./index.css";

const MyForm = () => {
    const [file, setFile] = useState(null);
    const [validationErrors, setValidationErrors] = useState(null);
    const [responseMessage, setResponseMessage] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const handleFileChange = (file) => {
        setFile(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("message", message);
        if (file) {
            formData.append("file", file);
        }

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/upload-endpoint",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message || "Network response was not ok"
                );
            }

            const responseData = await response.json();
            console.log("Upload successful", responseData);
            setResponseMessage("Upload successful ");

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error) {
            console.error("Upload error", error);
            setValidationErrors({
                general: error.message,
            });
        }
    };

    return (
        <div className="container">
            <div className="text-container">
                <h2>
                    Drag and Drop File Upload <br />
                    in Laravel with React
                </h2>
                <p>Please fill out the form and upload your file.</p>
            </div>
            <form className="form-container" onSubmit={handleSubmit}>
                {responseMessage && (
                    <p className="message">{responseMessage}</p>
                )}

                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <label htmlFor="upload">Upload a File:</label>
                <MediaLibraryAttachment
                    name="file"
                    initialValue={file}
                    validationRules={{
                        accept: [
                            "image/png",
                            "image/jpeg",
                            "image/gif",
                            "application/pdf",
                            "application/msword",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        ],
                        maxSizeInKB: 5000,
                    }}
                    validationErrors={validationErrors?.file}
                    onFileChange={handleFileChange}
                />

                <button type="submit">Submit</button>
                {validationErrors?.general && (
                    <div>{validationErrors.general}</div>
                )}
                {validationErrors && (
                    <div>
                        <ul>
                            {Object.keys(validationErrors).map((key) => (
                                <li key={key}>{validationErrors[key]}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </form>
        </div>
    );
};

export default MyForm;
