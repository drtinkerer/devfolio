import Button from "./Button";
import Reveal from "./ui/Reveal";
import Image from "next/image";
import { personalInfo, socialMedia } from '@/data';

const Contact = () => {
  return (
    <section className="w-full py-20 sm:py-40 justify-center flex items-center z-20" id="contact">
      <div className="flex flex-col items-center text-center">
        <Reveal>
          <h2>
            Contact <span className="bg-gradient-to-r from-steelGray-light to-brushedAluminum bg-clip-text text-transparent">
              me.</span>
          </h2>
        </Reveal>
        <p className="max-w-[700px] mt-10 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          {"Let's collaborate on your next project!"}
        </p>
        <p className="max-w-[700px] mt-10 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          Check out my work on <a
            className="text-steelGray-light font-extrabold hover:text-brushedAluminum transition-colors duration-200"
            target="_blank"
            href={`https://github.com/${personalInfo.github}`}
          >
            GitHub
          </a>
        </p>

        <a className="mt-10" href={`mailto:${personalInfo.email}`}>
          <Button
            title="Let's connect"
            icon={
              <div className="relative w-6 h-6">
                <Image 
                  src="/assets/send.svg" 
                  alt="Send email" 
                  fill
                  priority={true}
                />
              </div>
            }
            position="right"
          />
        </a>
      </div>
    </section>
  );
};

export default Contact;
