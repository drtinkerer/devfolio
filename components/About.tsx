import React from "react";
import { Sparkle } from "./ui/Sparkle";
import { myTechStack } from "@/data";
import Reveal from "./ui/Reveal";

const About = () => (
  <section id="about" className="py-20 w-full space-y-10">
    <Reveal>
      <h3 className="mb-10">
        About{' '}
        <span className="bg-gradient-to-r from-circuitGreen to-electricBlue bg-clip-text text-transparent">
          me.
        </span>
      </h3>
    </Reveal>
    <div className="sm:flex grid-cols-[2fr_1fr] gap-6 space-y-5 sm:space-y-0">
      <Sparkle
        duration={Math.floor(Math.random() * 10000) + 10000}
        className="flex-col text-left p-3 md:p-5 lg:p-10 gap-5 min-h-full"
      >
        <p className="text-white font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          Versatile DevOps, Cloud and Data specialist with 9 years of experience, having a deep understanding of software, analytics, manufacturing processes, and business operations.
        </p>
        <p className="text-white font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          Adept at rapidly assimilating information, drawing conclusions, and confidently presenting insights to both technical and non-technical audiences.
        </p>
        <p className="text-white font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          As a creative, curious and analytical thinker, I excel in approaching technology from a business perspective, with a strong focus on automation and data-driven solutions to drive growth and efficiency.
        </p>
      </Sparkle>

      <Sparkle
        duration={Math.floor(Math.random() * 10000) + 10000}
        className="flex-col text-left p-3 md:p-5 lg:p-10 gap-5 min-h-full"
      >
        <p className="text-lg lg:text-3xl font-extrabold">
          <span className="bg-gradient-to-r from-circuitGreen to-electricBlue bg-clip-text text-transparent">
            Core Expertise
          </span>
        </p>

        <div className="flex flex-wrap gap-3 py-4">
          {myTechStack.map((skill) => (
            <div
              key={skill}
              className="bg-electricBlue/20 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-electricBlue/30 transition duration-200 ease-in-out drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
            >
              {skill}
            </div>
          ))}
        </div>
      </Sparkle>
    </div>
  </section>
);

export default About;
