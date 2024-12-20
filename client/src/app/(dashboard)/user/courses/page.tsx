'use client';

import { useUser } from '@clerk/nextjs';
import React from 'react';

const Courses = () => {
  const { user } = useUser();
  console.log(user);

  return <div>Courses</div>;
};

export default Courses;
