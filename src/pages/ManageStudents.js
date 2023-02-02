import React, { useEffect, useState } from 'react';
import editIcon from '../assets/edit.svg';
import viewIcon from '../assets/view.svg';
import deleteIcon from '../assets/delete.svg';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const ManageStudents = () => {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [askDelete, setAskDelete] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://simple-student-crud.vercel.app/v1/students/list')
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => {
        toast.error('Data fetching faild!');
        setLoading(false);
      })
  }, [refetch]);


  const handleDelete = (id) => {

    fetch(`https://simple-student-crud.vercel.app/v1/students/delete/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if (data?.status) {
          toast.success('Delete successful!');
          setRefetch(!refetch);
        }
      })
      .catch(err => toast.error('Data fetching faild!'))
  }


  if (loading) {
    return (
      <Loading></Loading>
    );
  }

  return (
    <>
      <div className='flex justify-between items-end mb-8'>
        <div className='font-semibold'>Manage Students</div>
        <div className='text-sm'>25 Jul 2022  16:10</div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-left">
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Roll No.</th>
              <th className='text-right'>View / Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              students?.data?.map(student => {
                return (
                  <tr key={student?._id}>
                    <td>{`${student?.firstName} ${student?.lastName}`}</td>
                    <td className='capitalize'>{student?.className}</td>
                    <td>{student?.roll}</td>
                    <td className='text-right'>
                      <Link to={`/manage-students/${student?._id}?view=true`}><img src={viewIcon} alt="" /></Link>
                      <Link to={`/manage-students/${student?._id}`}><img src={editIcon} alt="" /></Link>
                      <label htmlFor="delete-modal" onClick={() => setAskDelete(student?._id)}><img src={deleteIcon} alt="" /></label>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
      <div>
        <input type="checkbox" id="delete-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Alert!</h3>
            <p className="py-4">Are you sure you want to delete?</p>
            <div className="modal-action">
              <label htmlFor="delete-modal" onClick={() => setAskDelete(false)} className="btn btn-primary btn-sm">Cancle</label>
              <label htmlFor="delete-modal" onClick={() => handleDelete(askDelete)} className="btn btn-primary btn-sm">Delete</label>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ManageStudents;