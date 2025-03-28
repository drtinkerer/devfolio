import { cn } from "@/lib/utils";
import Image from "next/image";

interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ className, children }) => (
  <div
    className={cn(
      "grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mx-auto",
      className
    )}
  >
    {children}
  </div>
);

interface BentoGridItemProps {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  link?: string;
  github?: string;
  img?: string;
  titleClassName?: string;
  techs?: string[];
  companyLogo?: string;
  companyUrl?: string;
}

export const BentoGridItem: React.FC<BentoGridItemProps> = ({
  className,
  id,
  title,
  description,
  link,
  github,
  img,
  titleClassName,
  techs,
  companyLogo,
  companyUrl,
}) => (
  <div
    className={cn(
      "row-span-1 relative overflow-hidden rounded-3xl border border-white/10 group/bento hover:shadow-xl transition duration-200 flex flex-col bg-black/30 backdrop-blur-sm",
      className
    )}
  >
    <div className="h-full relative">
      {img && (
        <div className="absolute inset-0 w-full h-full">
          <div className="relative w-full h-full">
            <Image
              src={img}
              alt={`Image for ${title}`}
              className="object-cover object-center opacity-15 transition-opacity duration-300 group-hover/bento:opacity-25"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-300" />

      <div
        className={cn(
          titleClassName,
          "group-hover/bento:translate-x-2 transition duration-200 relative flex flex-col px-5 py-5 lg:py-10"
        )}
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-5">
            <div className="space-y-10">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <div className="relative w-8 h-8">
                    <Image
                      src="/assets/git.svg"
                      alt="GitHub"
                      className="transform transition-all duration-300 ease-in-out hover:scale-110 hover:fill-red-600 mb-2"
                      fill
                      sizes="32px"
                      priority={false}
                    />
                  </div>
                </a>
              )}

              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <div className="relative w-8 h-8">
                    <Image
                      src="/assets/link.svg"
                      alt="External link"
                      className="transform transition-all duration-300 ease-in-out hover:scale-110 hover:fill-red-600 mb-2"
                      fill
                      sizes="32px"
                      priority={false}
                    />
                  </div>
                </a>
              )}
            </div>

            <div className="flex-1 space-y-6">
              <div className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] z-10">
                {title}
              </div>
              <div className="font-medium text-gray-200 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] z-10">
                {description}
              </div>

              <div className="flex flex-wrap gap-2 py-1">
                {techs?.map((tech) => (
                  <div
                    key={tech}
                    className="bg-electricBlue/15 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-electricBlue/25 transition duration-200 ease-in-out drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {companyLogo && (
              <div className="flex-shrink-0">
                <a
                  href={companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-20 h-20 rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-colors duration-200"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={companyLogo}
                      alt="Company Logo"
                      className="object-contain bg-white/5 hover:bg-white/10 transition-colors duration-200"
                      fill
                      sizes="80px"
                      priority={false}
                    />
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
