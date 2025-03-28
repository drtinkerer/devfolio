"use client";

import React from "react";
import Image from "next/image";
import { socialMedia } from "@/data";

export const Socials = (): JSX.Element => (
  <div className="flex items-center">
    {socialMedia.map(({ id, link, img }) => (
      <a
        key={id}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 cursor-pointer flex justify-center items-center transform transition-all duration-300 ease-in-out hover:scale-110"
      >
        <div className="relative w-5 h-5">
          <Image 
            src={img} 
            alt="social-icon" 
            fill
            sizes="20px"
            priority={false}
          />
        </div>
      </a>
    ))}
  </div>
);
