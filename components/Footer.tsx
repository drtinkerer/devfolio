import { Socials } from "./ui/Socials";
import { personalInfo } from '@/data';

const Footer = () => {
  return (
    <footer className="w-full sm:pt-60 pb-10 relative overflow-hidden ">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-steelGray-dark/50"></div>
        <div className="relative z-10">
          <div className="text-center my-10">
            <p className="mx-auto pt-5 sm:text-3xl">
              ✷ Link to the  <a
                href={`https://github.com/${personalInfo.github}/devfolio`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-electricBlue-light to-circuitGreen bg-clip-text text-transparent font-extrabold hover:scale-105 inline-block transition-transform duration-200"
              >
                github
              </a> repository ✷
            </p>
            <small>If you vibe with it, smash that star button! ⭐</small>
          </div>
          <div className="text-center">
            <p className="md:text-base text-sm md:font-normal font-light mt-5 opacity-60">
              Crafted with ❤ by  <a
                className="bg-gradient-to-r from-electricBlue-light via-electricBlue to-circuitGreen bg-clip-text text-transparent font-extrabold hover:scale-105 inline-block transition-transform duration-200"
                target="_blank"
                href="https://cloudpoet.in"
              >
                Bhushan Rane.
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
