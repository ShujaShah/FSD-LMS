'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCarousel } from '@/hooks/useCarousel';
import { useGetCoursesQuery } from '@/state/api';
import { useRouter } from 'next/navigation';
import CourseCardSearch from '@/components/CourseCardSearch';
import LoadingSkeleton from './LoadingSkeleton';
import { useUser } from '@clerk/nextjs';

const Landing = () => {
  const user = useUser();
  const router = useRouter();
  const currentImage = useCarousel({ totalImages: 3 });
  const { data: courses, isLoading, isError } = useGetCoursesQuery({});

  const handleCourseClick = (courseid: string) => {
    router.push(`/search?id=${courseid}`, {
      scroll: false,
    });
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="landing"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="landing__hero"
      >
        <div className="landing__hero-content">
          <h1 className="landing__title">Courses</h1>
          <p className="landing__description">
            {' '}
            This is a list of the courses you can enroll in.
            <br />
            Courses when you need them and want them.
          </p>
          <div className="landing__cta">
            <Link href="/search" scroll={false}>
              <div className="landing__cta-button">Search for Courses</div>
            </Link>
          </div>
        </div>
        <div className="landing__hero-images">
          {['/hero1.jpg', '/hero2.jpg', '/hero3.jpg'].map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Hero Banner ${index + 1}`}
              fill
              priority={index === currentImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw))"
              className={`landing__hero-image ${
                index === currentImage ? 'landing__hero-image--active' : ''
              }`}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.3, once: true }}
        className="landing__featured"
      >
        <h2 className="landing__featured-title">Featured Courses</h2>
        <p className="landing__featured-description">
          From beginner to advanced, we have the right courses for you
        </p>
        <div className="landing__tags">
          {[
            'web develpment',
            'enterprise IT',
            'data science',
            'machine learning',
          ].map((tag, index) => (
            <span key={index} className="landing__tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="landing__courses">
          {courses &&
            courses.slice(0, 4).map((course, index) => (
              <motion.div
                key={course.courseId}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ amount: 0.3 }}
              >
                <CourseCardSearch
                  course={course}
                  onClick={() => handleCourseClick(course.courseId)}
                />
              </motion.div>
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
