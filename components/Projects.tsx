"use client";

import React, { memo } from "react";
import { projects } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import Reveal from "./ui/Reveal";

const Projects = memo(() => {
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
      <BentoGrid className="w-full py-10">
        {projects.map((item) => (
          <BentoGridItem
            key={item.id}
            {...item}
          />
        ))}
      </BentoGrid>
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;
