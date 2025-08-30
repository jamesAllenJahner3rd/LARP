"use client";
import React, { useState } from 'react'
import { CldUploadWidget, CldImage } from 'next-cloudinary'
interface CloudinaryResult {
    public_id: string;
    secure_url: string;
}
const UploadPage = () => {
    const [publicId, setPublicId] = useState("");

    return (
        <>
            {publicId && <CldImage src={publicId} width={270} height={270} alt=" A Tracker" />}
            <CldUploadWidget
                uploadPreset="qwertg"
                onUploadAdded={(result) => {
                    console.log(result)
                    if (result.event !== 'success') return;

                    const info = result.info as CloudinaryResult// So he said that this isn't typed correctly so we made our own interface to correctly type it I guess this can't be undefined.
                    setPublicId(info.secure_url || "");

                }}>
                {({ open }) =>
                    <button className="btn btn-primary"
                        onClick={() => open()}>Upload an image</button>}
            </CldUploadWidget >
            {/*  The upload widget component takes two props uploadPreset and onUpload which is a callback function that gets called when the upload is complete.*** You can't just put a element in there or component it has to be a in a function */}
        </>
    )
}

export default UploadPage
