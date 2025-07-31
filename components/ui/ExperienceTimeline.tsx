'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Experience } from '@/data/experience';
import { Education } from '@/data/education';
import TimelineConnector from './TimelineConnector';
import TimelineItem from './TimelineItem';

interface ExperienceTimelineProps {
  items: Experience[] | Education[];
  isExperience: boolean;
  expandedItems: number[];
  onToggleExpand: (id: number) => void;
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  items,
  isExperience,
  expandedItems,
  onToggleExpand
}) => {
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      className="relative max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Timeline connector with animated progress */}
      <TimelineConnector totalItems={items.length} />

      {/* Timeline items container */}
      <motion.div
        className="relative z-10"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.3
            }
          }
        }}
      >
        {items.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            index={index}
            isExperience={isExperience}
            isExpanded={expandedItems.includes(item.id)}
            onToggleExpand={onToggleExpand}
          />
        ))}
      </motion.div>

      {/* Timeline end indicator */}
      <motion.div
        className="absolute left-0 md:left-1/2 bottom-0 w-6 h-6 rounded-full bg-gradient-to-r from-electricBlue to-circuitGreen transform -translate-x-1/2 z-10"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.5,
          delay: items.length * 0.2 + 0.5
        }}
        viewport={{ once: true }}
      >
        {/* Inner glow */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-r from-electricBlue to-circuitGreen opacity-60" />
        
        {/* Outer glow ring */}
        <motion.div
          className="absolute -inset-1 rounded-full border border-electricBlue/50"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.2, 0.5]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ExperienceTimeline;