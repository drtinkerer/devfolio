import React from "react";
import Image from "next/image";
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
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* About Me Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 backdrop-blur-sm p-8 flex flex-col">
        {/* Background GIF */}
        <div className="absolute inset-0 -z-10">
          <div className="relative w-full h-full">
            <Image 
              src="https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif" 
              alt="Background animation"
              className="object-cover opacity-30"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
              unoptimized={true}
            />
          </div>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Content */}
        <div className="space-y-6">
          <p className="text-white font-medium">
            Versatile DevOps, Cloud and Data specialist with 9 years of experience, having a deep understanding of software, analytics, manufacturing processes, and business operations.
          </p>
          <p className="text-white font-medium">
            Adept at rapidly assimilating information, drawing conclusions, and confidently presenting insights to both technical and non-technical audiences.
          </p>
          <p className="text-white font-medium">
            As a creative, curious and analytical thinker, I excel in approaching technology from a business perspective, with a strong focus on automation and data-driven solutions to drive growth and efficiency.
          </p>
        </div>
      </div>
      
      {/* Expertise Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 backdrop-blur-sm p-8">
        {/* Background GIF */}
        <div className="absolute inset-0 -z-10">
          <div className="relative w-full h-full">
            <Image 
              src="https://i.pinimg.com/originals/84/f6/d1/84f6d14f1f88d34d3956150d19060d3a.gif" 
              alt="Background animation"
              className="object-cover opacity-30"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
              unoptimized={true}
            />
          </div>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <h4 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-[#00ff66]">Core Expertise</span>
          </h4>
          
          <div className="flex flex-wrap gap-3">
            {myTechStack.map((skill) => (
              <div
                key={skill}
                className="bg-[#16463e]/60 text-white text-sm font-medium px-4 py-2 rounded-full border border-[#00ff66]/20"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
