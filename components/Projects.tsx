"use client";

import React from "react";
import { projects } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import Reveal from "./ui/Reveal";

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <Reveal>
         <h3>
          Recent{" "}
          <span className="bg-gradient-to-r from-circuitGreen to-electricBlue bg-clip-text text-transparent">
            projects.
          </span>
        </h3>
      </Reveal>
      <BentoGrid className="w-full py-20">
        {projects.map((item, i) => (
          <BentoGridItem
            key={item.id}
            {...item}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Projects;
