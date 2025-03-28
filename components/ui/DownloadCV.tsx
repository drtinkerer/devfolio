"use client";

import React from "react";
import Image from "next/image";
import Button from "../Button";

interface DownloadCVProps {
    fileUrl: string;
    fileName: string;
}

const DownloadCV: React.FC<DownloadCVProps> = ({ fileUrl, fileName }) => {
    return (
        <Button
            title="My CV"
            icon={
                <div className="relative w-6 h-6">
                    <Image 
                        src="/assets/download.svg" 
                        alt="Download CV" 
                        fill
                        priority={true}
                    />
                </div>
            }
            position="right"
            handleClick={() => {
                const link = document.createElement("a");
                link.href = fileUrl;
                link.download = fileName;
                link.click();
            }}
        />
    );
};

export default DownloadCV;
