import { Request, Response } from 'express';
import Course from '../models/courseModel';

/** Getting Courses */
export const listCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { category } = req.query;
  try {
    const courses =
      category && category !== 'all'
        ? await Course.scan('category').eq(category).exec() // in case we are retrieving courses by category
        : await Course.scan().exec(); // retrieving all the courses
    res.status(200).json({
      message: 'Courses retrieved successfully',
      data: courses,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving courses', error });
  }
};

/** Getting a Single Course */
export const getCourse = async (req: Request, res: Response): Promise<void> => {
  const { courseId } = req.params;
  try {
    const course = await Course.get(courseId);
    if (!course) res.status(404).json({ message: 'Course not found' });
    res.status(200).json({
      message: 'Course retrieved successfully',
      data: course,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving course', error });
  }
};
