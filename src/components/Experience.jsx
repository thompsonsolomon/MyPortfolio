import React, { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { formatDateRange } from "../lib/utils";
import { trackPageView } from "../lib/analytics";
import { getExperiences } from "./contexts/firestore";
import LoadingSpinner from "../utils/ui";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={formatDateRange(experience.startDate, experience.endDate)}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {

  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    trackPageView("/experience")
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const data = await getExperiences()
      setExperiences(data)
    } catch (error) {
      console.error("Error fetching experiences:", error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>

        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
      </motion.div>
      {
        loading ?
          <div className="py-16">
            <LoadingSpinner size="lg" />
          </div>
          :
          <div className='mt-20 flex flex-col'>
            <VerticalTimeline>
              {experiences.map((experience, index) => (
                <ExperienceCard
                  key={`experience-${index}`}
                  experience={experience}
                />
              ))}
            </VerticalTimeline>
          </div>
      }
    </>
  );
};

export default SectionWrapper(Experience, "work");
