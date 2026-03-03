"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";

interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ className, children }) => (
  <div
    className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mx-auto",
      className
    )}
  >
    {children}
  </div>
);

interface BentoGridItemProps {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  link?: string;
  github?: string;
  img?: string;
  techs?: string[];
  status?: "in-progress" | "private";
}

export const BentoGridItem: React.FC<BentoGridItemProps> = ({
  className,
  title,
  description,
  link,
  github,
  img,
  techs,
  status,
}) => {
  const [imgError, setImgError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 group/bento hover:border-white/20 hover:shadow-xl transition duration-200 bg-black/30 backdrop-blur-sm",
        className
      )}
    >
      {mounted && img && !imgError && (
        <div className="absolute inset-0">
          <Image
            src={img}
            alt={`Background for ${title}`}
            className="object-cover object-center opacity-10 group-hover/bento:opacity-20 transition-opacity duration-300"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
            unoptimized
            onError={() => setImgError(true)}
          />
        </div>
      )}
      <div className="relative px-4 py-3 space-y-2">
        {/* Header: title + badges + github icon */}
        <div className="flex items-start gap-2">
          <h2 className="text-sm font-semibold flex-1">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-electricBlue transition-colors duration-200"
              >
                {title}
              </a>
            ) : (
              title
            )}
          </h2>
          {status === "in-progress" && (
            <span className="flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-yellow-300 border border-yellow-500/30 bg-yellow-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              WIP
            </span>
          )}
          {status === "private" && (
            <span className="flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-gray-400 border border-gray-600/30 bg-gray-600/10">
              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 16 16"><path d="M4 4v2h-.25A1.75 1.75 0 002 7.75v5.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-5.5A1.75 1.75 0 0012.25 6H12V4a4 4 0 10-8 0zm6.5 2V4a2.5 2.5 0 00-5 0v2h5zM12.25 7.5a.25.25 0 01.25.25v5.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-5.5a.25.25 0 01.25-.25h8.5z" /></svg>
              Private
            </span>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="View on GitHub"
            >
              <div className="relative w-4 h-4">
                <Image
                  src="/assets/git.svg"
                  alt="GitHub"
                  fill
                  sizes="16px"
                  priority={false}
                />
              </div>
            </a>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-gray-400">{description}</p>

        {techs && techs.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {techs.map((tech) => (
              <span
                key={tech}
                className="text-[10px] text-gray-300 bg-white/5 px-2 py-0.5 rounded-full border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
