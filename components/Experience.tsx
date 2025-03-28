import React from "react";
import { experience } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import Reveal from "./ui/Reveal";

const Experience = () => {
  return (
    <section id="experience" className="w-full py-20">
      <div className="container mx-auto px-4">
        <Reveal>
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Experience</h2>
        </Reveal>

        <BentoGrid className="w-full py-20">
          {experience.map((item) => (
            <BentoGridItem
              key={item.id}
              id={item.id}
              title={
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <h4 className="text-lg font-medium text-electricBlue">{item.company}</h4>
                  <p className="text-sm text-gray-400">{item.location}</p>
                  <p className="text-sm text-gray-400">
                    {item.startDate} - {item.endDate}
                  </p>
                </div>
              }
              description={
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {item.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              }
              techs={item.technologies}
              className="md:col-span-2"
              titleClassName="justify-start"
              img="https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif"
              companyLogo={item.companyLogo}
              companyUrl={item.companyUrl}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default Experience;
