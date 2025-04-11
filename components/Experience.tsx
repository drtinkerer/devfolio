import React from "react";
import { experience } from "@/data";
import Reveal from "./ui/Reveal";
import Image from "next/image";
import { motion } from "framer-motion";

const Experience = () => {
  return (
    <section id="experience" className="w-full py-20">
      <div className="container mx-auto px-4">
        <Reveal>
          <h3 className="mb-16 text-center text-3xl sm:text-4xl md:text-5xl font-semibold">
            My{" "}
            <span className="bg-gradient-to-r from-circuitGreen to-electricBlue bg-clip-text text-transparent">
              Experience
            </span>
          </h3>
        </Reveal>

        <div className="relative max-w-4xl mx-auto">
          {/* Main timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-electricBlue via-circuitGreen to-electricBlue h-full transform md:-translate-x-px"></div>

          {/* Animated timeline line overlay */}
          <motion.div
            className="absolute left-0 md:left-1/2 top-0 w-px bg-electricBlue/70 transform md:-translate-x-px"
            initial={{ height: 0, opacity: 0.3 }}
            animate={{ height: '100%', opacity: [0.3, 0.6, 0.3] }}
            transition={{
              height: { duration: 2, ease: "easeOut" },
              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          />

          {/* Timeline items */}
          {experience.map((item, index) => (
            <div key={item.id} className="mb-16 relative">
              {/* Timeline dot */}
              <motion.div
                className={`absolute left-0 md:left-1/2 w-5 h-5 rounded-full border-2 ${index === 0 ? 'border-electricBlue' : 'border-circuitGreen'} bg-black transform -translate-x-1/2 z-10 ${index === 0 ? 'shadow-glow' : ''}`}
                initial={{ scale: 0.8, opacity: 0.5 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {/* Inner dot */}
                <motion.div
                  className={`absolute inset-0 m-auto w-2 h-2 rounded-full ${index === 0 ? 'bg-electricBlue' : 'bg-circuitGreen'}`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                />

                {/* Pulsing effect for current position */}
                {index === 0 && (
                  <motion.div
                    className="absolute -inset-1 rounded-full border border-electricBlue opacity-50"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </motion.div>

              {/* Horizontal connector line */}
              <div className="hidden md:block absolute h-px bg-gradient-to-r from-electricBlue to-transparent w-8 top-0 z-0"
                style={{
                  left: index % 2 === 0 ? '50%' : 'auto',
                  right: index % 2 === 0 ? 'auto' : '50%',
                  transform: 'translateY(-50%)'
                }}
              />

              {/* Content container */}
              <div className="ml-8 md:ml-0 md:grid md:grid-cols-2 md:gap-8 relative">
                {/* Date - visible on mobile, hidden on desktop for odd items */}
                <div className={`md:text-right mb-4 md:mb-0 md:pr-12 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <div className="inline-block md:block">
                    <span className="text-electricBlue font-mono text-sm md:text-base">
                      {item.startDate} - {item.endDate}
                    </span>
                    <h4 className="text-xl font-semibold text-white mt-1">{item.title}</h4>
                    <div className="flex items-center mt-1 gap-2">
                      {item.companyLogo && (
                        <a
                          href={item.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-6 h-6 rounded overflow-hidden"
                        >
                          <div className="relative w-full h-full">
                            <Image
                              src={item.companyLogo}
                              alt="Company Logo"
                              className="object-contain bg-white/5"
                              fill
                              sizes="24px"
                              priority={false}
                            />
                          </div>
                        </a>
                      )}
                      <h5 className="text-lg font-medium text-electricBlue">{item.company}</h5>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{item.location}</p>
                  </div>
                </div>

                {/* Content card - with preserved background animation */}
                <motion.div
                  className={`relative overflow-hidden rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm group hover:border-electricBlue/30 hover:shadow-lg transition-all duration-300 ${index % 2 !== 0 ? 'md:order-1' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Background animation */}
                  <div className="absolute inset-0 w-full h-full">
                    <div className="relative w-full h-full">
                      <Image
                        src="https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif"
                        alt={`Background for ${item.title}`}
                        className="object-cover object-center opacity-15 transition-opacity duration-300 group-hover:opacity-25"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={false}
                        unoptimized={true}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-6 z-10 transition-transform duration-300 group-hover:translate-x-1">
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                      {item.description.map((desc: string, idx: number) => (
                        <li key={idx} className="text-sm">{desc}</li>
                      ))}
                    </ul>

                    {item.technologies && item.technologies.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs font-medium bg-black/50 text-electricBlue border border-electricBlue/20 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
