import React from "react";
import { workExperience } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import Reveal from "./ui/Reveal";

const Experience = (): JSX.Element => (
  <section id="experience" className="py-20">
    <Reveal>
      <h3>
        My{' '}
        <span className="bg-gradient-to-r from-purple to-red-700 bg-clip-text text-transparent">
          experience.
        </span>
      </h3>
    </Reveal>

    <BentoGrid className="w-full py-20">
      {workExperience.map((item) => (
        <BentoGridItem
          key={item.id}
          id={item.id}
          title={item.company}
          description={item.desc}
          className="md:col-span-2"
          titleClassName="justify-start"
          img="https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif"
          techs={item.skills}
        />
      ))}
    </BentoGrid>
  </section>
);

export default Experience;
