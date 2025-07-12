import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";
import { getTestimonials } from "./contexts/firestore";
import { trackPageView } from "../lib/analytics";
import LoadingSpinner from "../utils/ui";


const FeedbackCard = ({
  index,
  text,
  name,
  designation,
  company,
  photoUrl,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className='bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full'
  >
    <p className='text-white font-black text-[48px]'>"</p>

    <div className='mt-1'>
      <p className='text-white tracking-wider text-[18px]'>{text}</p>

      <div className='mt-7 flex justify-between items-center gap-1'>
        <div className='flex-1 flex flex-col'>
          <p className='text-white font-medium text-[16px]'>
            <span className='blue-text-gradient'>@</span> {name}
          </p>
          <p className='mt-1 text-secondary text-[12px]'>
            {designation} of {company}
          </p>
        </div>

        <img
          src={photoUrl}
          alt={`feedback_by-${name}`}
          className='w-10 h-10 rounded-full object-cover'
        />
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {

  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    trackPageView("/testimonials")
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const data = await getTestimonials("approved")
      setTestimonials(data)
    } catch (error) {
      console.error("Error fetching testimonials:", error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className={`mt-12 bg-black-100 rounded-[20px]`}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
          <p className={styles.sectionSubText}>What others say</p>
        </motion.div>
      </div>

      {
        loading ?
          <div className="py-16">
            <LoadingSpinner size="lg" />
          </div>
          :
          <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
            {testimonials.map((testimonial, index) => (
              <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
            ))}
          </div>
      }
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
