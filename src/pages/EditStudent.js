import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData, useLocation } from 'react-router-dom';
import StudentForm from '../components/StudentForm';

const EditStudent = () => {
  const id = useLoaderData();

  const viewMode = useLocation().search === '?view=true';


  const [student, setStudent] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://simple-student-crud.vercel.app/v1/students/single/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status) {
          setStudent(data.data);
          setLoading(false);
        }
      })
      .catch(err => {
        toast.error('Data fetching faild!');
        setLoading(false);
      })
  }, [refetch, id]);


  return (
    <div>
      <div className='flex justify-between items-end mb-8'>
        <div className='font-semibold'>{viewMode ? 'View' : 'Edit'} Student</div>
        <div className='text-sm'>25 Jul 2022  16:10</div>
      </div>

      <StudentForm
        isEdit={true}
        formData={student}
        loading={loading}
        refetch={refetch}
        setRefetch={setRefetch}
        viewMode={viewMode}
      ></StudentForm>
    </div>
  );
};

export default EditStudent;