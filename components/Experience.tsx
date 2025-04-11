import React, { useState } from "react";
import { experience, education } from "@/data";
import Reveal from "./ui/Reveal";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Mini navigation tab component
const TabButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
      active
        ? "bg-gradient-to-r from-circuitGreen to-electricBlue text-white shadow-lg"
        : "bg-black/30 text-gray-400 hover:text-white hover:bg-black/50 border border-white/10"
    )}
  >
    {children}
  </button>
);

const Experience = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  // Get the appropriate data based on the active tab
  const items = activeTab === 'experience' ? experience : education;

  // Toggle expanded state for an item
  const toggleExpand = (id: number) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  return (
    <section id="experience" className="w-full py-20">
      <div className="container mx-auto px-4">
        <Reveal>
          <h3 className="mb-8 text-center text-3xl sm:text-4xl md:text-5xl font-semibold">
            My{" "}
            <span className="bg-gradient-to-r from-circuitGreen to-electricBlue bg-clip-text text-transparent">
              {activeTab === 'experience' ? 'Experience' : 'Education'}
            </span>
          </h3>
        </Reveal>

        {/* Mini navigation bar */}
        <div className="flex justify-center gap-4 mb-12">
          <TabButton
            active={activeTab === 'experience'}
            onClick={() => setActiveTab('experience')}
          >
            Work Experience
          </TabButton>
          <TabButton
            active={activeTab === 'education'}
            onClick={() => setActiveTab('education')}
          >
            Education
          </TabButton>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-electricBlue via-circuitGreen to-electricBlue h-full transform md:-translate-x-px"></div>



          {/* Timeline items */}
          {items.map((item, index) => (
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
                    <h4 className="text-xl font-semibold text-white mt-1">
                      {activeTab === 'experience'
                        ? (item as typeof experience[0]).title
                        : (item as typeof education[0]).degree
                      }
                    </h4>
                    <div className="flex items-center mt-1 gap-2">
                      {activeTab === 'experience' && (item as typeof experience[0]).companyLogo ? (
                        <a
                          href={(item as typeof experience[0]).companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-6 h-6 rounded overflow-hidden"
                        >
                          <div className="relative w-full h-full">
                            <Image
                              src={(item as typeof experience[0]).companyLogo!}
                              alt="Company Logo"
                              className="object-contain bg-white/5"
                              fill
                              sizes="24px"
                              priority={false}
                            />
                          </div>
                        </a>
                      ) : activeTab === 'education' && (item as typeof education[0]).institutionLogo ? (
                        <a
                          href={(item as typeof education[0]).institutionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-6 h-6 rounded overflow-hidden"
                        >
                          <div className="relative w-full h-full">
                            <Image
                              src={(item as typeof education[0]).institutionLogo!}
                              alt="Institution Logo"
                              className="object-contain bg-white/5"
                              fill
                              sizes="24px"
                              priority={false}
                            />
                          </div>
                        </a>
                      ) : null}
                      <h5 className="text-lg font-medium text-electricBlue">
                        {activeTab === 'experience'
                          ? (item as typeof experience[0]).company
                          : (item as typeof education[0]).institution
                        }
                      </h5>
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
                        alt={`Background for ${activeTab === 'experience' ? (item as typeof experience[0]).title : (item as typeof education[0]).degree}`}
                        className="object-cover object-center opacity-15 transition-opacity duration-300 group-hover:opacity-25"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={false}
                        unoptimized={true}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-4 z-10 transition-transform duration-300 group-hover:translate-x-1">
                    {/* Description items with Show More/Less toggle */}
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      {(expandedItems.includes(item.id)
                        ? item.description
                        : item.description.slice(0, 3)
                      ).map((desc: string, idx: number) => (
                        <li key={idx} className="text-xs">{desc}</li>
                      ))}
                    </ul>

                    {/* Show More/Less button */}
                    {item.description.length > 3 && (
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="mt-2 text-xs text-electricBlue hover:text-circuitGreen transition-colors duration-200 flex items-center gap-1"
                      >
                        {expandedItems.includes(item.id) ? (
                          <>
                            Show Less
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </>
                        ) : (
                          <>
                            Show More
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </>
                        )}
                      </button>
                    )}

                    {activeTab === 'experience' && (item as typeof experience[0]).technologies && (item as typeof experience[0]).technologies.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="flex flex-wrap gap-1">
                          {expandedItems.includes(item.id)
                            ? (item as typeof experience[0]).technologies.map((tech: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="px-1.5 py-0.5 text-xs font-medium bg-black/50 text-electricBlue border border-electricBlue/20 rounded-full"
                                >
                                  {tech}
                                </span>
                              ))
                            : (
                              <>
                                {(item as typeof experience[0]).technologies.slice(0, 6).map((tech: string, idx: number) => (
                                  <span
                                    key={idx}
                                    className="px-1.5 py-0.5 text-xs font-medium bg-black/50 text-electricBlue border border-electricBlue/20 rounded-full"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {(item as typeof experience[0]).technologies.length > 6 && !expandedItems.includes(item.id) && (
                                  <span className="px-1.5 py-0.5 text-xs font-medium bg-black/50 text-gray-400 border border-white/10 rounded-full">
                                    +{(item as typeof experience[0]).technologies.length - 6} more
                                  </span>
                                )}
                              </>
                            )
                          }
                        </div>
                      </div>
                    )}

                    {activeTab === 'education' && (item as typeof education[0]).achievements && (item as typeof education[0]).achievements.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <h6 className="text-xs font-medium text-electricBlue mb-1">Achievements</h6>
                        <ul className="list-disc list-inside space-y-1 text-gray-300">
                          {(item as typeof education[0]).achievements.map((achievement: string, idx: number) => (
                            <li key={idx} className="text-xs">{achievement}</li>
                          ))}
                        </ul>
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
