'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Experience } from '@/data/experience';
import { Education } from '@/data/education';
import TimelineDot from './TimelineDot';

interface TimelineItemProps {
  item: Experience | Education;
  index: number;
  isExperience: boolean;
  isExpanded: boolean;
  onToggleExpand: (id: number) => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  item,
  index,
  isExperience,
  isExpanded,
  onToggleExpand
}) => {
  // Determine if this is the left or right side (alternating)
  const isLeftSide = index % 2 === 0;
  
  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      x: isLeftSide ? -30 : 30
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: index * 0.2 + 0.3
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      x: isLeftSide ? -20 : 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const connectorVariants = {
    hidden: { 
      scaleX: 0,
      opacity: 0
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Get item-specific data
  const experienceItem = isExperience ? item as Experience : null;
  const educationItem = !isExperience ? item as Education : null;

  const title = isExperience ? experienceItem!.title : educationItem!.degree;
  const organization = isExperience ? experienceItem!.company : educationItem!.institution;
  const logo = isExperience ? experienceItem!.companyLogo : educationItem!.institutionLogo;
  const url = isExperience ? experienceItem!.companyUrl : educationItem!.institutionUrl;
  const companyColor = isExperience ? experienceItem!.companyColor : educationItem!.institutionColor;
  const isCurrentPosition = isExperience ? experienceItem!.isCurrentPosition : false;

  return (
    <motion.div
      className="mb-16 relative"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Timeline dot */}
      <TimelineDot
        isCurrentPosition={isCurrentPosition}
        companyColor={companyColor}
        index={index}
      />

      {/* Horizontal connector line */}
      <motion.div
        className="hidden md:block absolute h-px bg-gradient-to-r from-electricBlue to-transparent w-8 top-0 z-0"
        style={{
          left: isLeftSide ? '50%' : 'auto',
          right: isLeftSide ? 'auto' : '50%',
          transform: 'translateY(-50%)',
          transformOrigin: isLeftSide ? 'left' : 'right'
        }}
        variants={connectorVariants}
      />

      {/* Content container with alternating layout */}
      <div className="ml-8 md:ml-0 md:grid md:grid-cols-2 md:gap-8 relative">
        {/* Date and organization info */}
        <motion.div
          className={`md:text-right mb-4 md:mb-0 md:pr-12 ${!isLeftSide ? 'md:order-2' : ''}`}
          variants={contentVariants}
        >
          <div className="inline-block md:block">
            <span className="text-electricBlue font-mono text-sm md:text-base">
              {item.startDate} - {item.endDate}
            </span>
            <h4 className="text-xl font-semibold text-white mt-1">
              {title}
            </h4>
            
            {/* Logo and Organization */}
            <div className="flex flex-col items-start mt-2 gap-3">
              {logo && (
                <motion.a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-16 h-16 rounded-md overflow-hidden border border-white/20 hover:border-electricBlue/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative w-full h-full bg-white/10 hover:bg-white/20 transition-all duration-300">
                    <Image
                      src={logo}
                      alt={`${organization} Logo`}
                      className="object-contain p-2"
                      fill
                      sizes="64px"
                      priority={index < 3}
                      unoptimized={true}
                    />
                  </div>
                </motion.a>
              )}
            </div>
            
            <div>
              <h5 className="text-lg font-medium text-electricBlue">
                {organization}
              </h5>
              <p className="text-sm text-gray-400">{item.location}</p>
            </div>
          </div>
        </motion.div>

        {/* Content card */}
        <motion.div
          className={`relative overflow-hidden rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm group hover:border-electricBlue/30 hover:shadow-lg transition-all duration-300 ${!isLeftSide ? 'md:order-1' : ''}`}
          variants={contentVariants}
          whileHover={{ 
            y: -5,
            boxShadow: "0 10px 30px rgba(0, 212, 255, 0.1)"
          }}
        >
          {/* Background animation */}
          <div className="absolute inset-0 w-full h-full">
            <div className="relative w-full h-full">
              <Image
                src="https://i.pinimg.com/originals/be/f4/1a/bef41a7d5a877841bbf7d8f9f0d42f14.gif"
                alt={`Background for ${title}`}
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
            {/* Description */}
            <motion.ul 
              className="list-disc list-inside space-y-1 text-gray-300"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {(isExpanded ? item.description : item.description.slice(0, 3)).map((desc: string, idx: number) => (
                <motion.li 
                  key={idx} 
                  className="text-xs"
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  {desc}
                </motion.li>
              ))}
            </motion.ul>

            {/* Show More/Less button */}
            {item.description.length > 3 && (
              <motion.button
                onClick={() => onToggleExpand(item.id)}
                className="mt-2 text-xs text-electricBlue hover:text-circuitGreen transition-colors duration-200 flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isExpanded ? (
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
              </motion.button>
            )}

            {/* Technologies for Experience */}
            {isExperience && experienceItem!.technologies && experienceItem!.technologies.length > 0 && (
              <motion.div 
                className="mt-3 pt-3 border-t border-white/10"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                <div className="flex flex-wrap gap-1">
                  {(isExpanded ? experienceItem!.technologies : experienceItem!.technologies.slice(0, 6)).map((tech: string, idx: number) => (
                    <motion.span
                      key={idx}
                      className="px-1.5 py-0.5 text-xs font-medium bg-black/50 text-electricBlue border border-electricBlue/20 rounded-full"
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 }
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {experienceItem!.technologies.length > 6 && !isExpanded && (
                    <span className="px-1.5 py-0.5 text-xs font-medium bg-black/50 text-gray-400 border border-white/10 rounded-full">
                      +{experienceItem!.technologies.length - 6} more
                    </span>
                  )}
                </div>
              </motion.div>
            )}

            {/* Achievements for Education */}
            {!isExperience && educationItem!.achievements && educationItem!.achievements.length > 0 && (
              <motion.div 
                className="mt-3 pt-3 border-t border-white/10"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                <h6 className="text-xs font-medium text-electricBlue mb-1">Achievements</h6>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  {educationItem!.achievements.map((achievement: string, idx: number) => (
                    <motion.li 
                      key={idx} 
                      className="text-xs"
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;