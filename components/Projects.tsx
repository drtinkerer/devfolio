"use client";

import React, { memo, useMemo } from "react";
import { projects } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import Reveal from "./ui/Reveal";

const Projects = memo(() => {
  // Memoize the projects list to prevent unnecessary re-renders
  const memoizedProjects = useMemo(() => projects, []);
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
        {memoizedProjects.map((item, i) => (
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
