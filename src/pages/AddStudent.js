import React from 'react';
import StudentForm from '../components/StudentForm';

const AddStudent = () => {
  return (
    <>
      <div className='flex justify-between items-end mb-8'>
        <div className='font-semibold'>Add Student</div>
        <div className='text-sm'>25 Jul 2022  16:10</div>
      </div>

      <StudentForm></StudentForm>
    </>
  );
};

export default AddStudent;