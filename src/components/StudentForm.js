import React from 'react';
import { toast } from 'react-hot-toast';

const StudentForm = ({ isEdit, formData, loading, refetch, setRefetch, viewMode }) => {

  const createForm = (data, reset) => {

    fetch('https://simple-student-crud.vercel.app/v1/students/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data?.status) {
          toast.success('Data created successful!');
          reset();
        }
      })
      .catch(err => toast.error('Somthing is wrong!'))
  }

  const editForm = (data) => {

    fetch(`https://simple-student-crud.vercel.app/v1/students/update/${formData?._id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data?.status) {
          toast.success('Data update successful!');
          setRefetch(!refetch);
        }
      })
      .catch(err => toast.error('Somthing is wrong!'))
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const firstName = form.first.value;
    const middleName = form.middle.value;
    const lastName = form.last.value;
    const className = form.class.value;
    const divition = form.divition.value;
    const roll = parseInt(Number(form.roll.value));
    const addressOne = form.address_one.value;
    const addressTwo = form.address_two.value;
    const landmark = form.landmark.value;
    const city = form.city.value;
    const pincode = parseInt(Number(form.pincode.value));

    const reset = () => form.reset();


    // validation

    if (isNaN(roll)) return toast.error('Roll should be number!');
    if (roll.toString().length > 2) return toast.error('Roll should be not more than 2 digit!');

    if (isNaN(pincode)) return toast.error('Pincode should be number!');
    if (pincode.toString().length > 6) return toast.error('Pincode should be not more than 6 digit!');


    // action provider

    const data = {
      firstName, middleName, lastName, className, divition, roll, addressOne, addressTwo, landmark, city, pincode
    }

    return isEdit ? editForm(data) : createForm(data, reset);
  }


  const setValue = (fieldName, isSelect) => {
    if (isSelect) {
      return formData && formData[fieldName] ? formData[fieldName] : 'DEFAULT';
    }

    return formData && formData[fieldName] ? formData[fieldName] : null;
  }


  if (loading) {
    return (
      <div>Loading</div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='grid gap-4'>
        <div className='grid grid-cols-3 gap-4'>
          <input type="text" name='first' placeholder="First Name" defaultValue={setValue('firstName')} readOnly={viewMode} required />
          <input type="text" name='middle' placeholder="Middle Name" defaultValue={setValue('middleName')} readOnly={viewMode} />
          <input type="text" name='last' placeholder="Last Name" defaultValue={setValue('lastName')} readOnly={viewMode} required />

          <select name='class' defaultValue={setValue('className', true)} disabled={viewMode} required>
            <option value='DEFAULT' disabled>Select Class</option>
            <option value='one'>One</option>
            <option value='two'>Two</option>
            <option value='three'>Three</option>
            <option value='four'>Four</option>
            <option value='five'>Five</option>
            <option value='six'>Six</option>
            <option value='seven'>Seven</option>
            <option value='eight'>Eight</option>
            <option value='nine'>Nine</option>
            <option value='ten'>Ten</option>
            <option value='eleven'>Eleven</option>
            <option value='twelve'>Twelve</option>
          </select>

          <select name='divition' defaultValue={setValue('divition', true)} disabled={viewMode} required>
            <option value='DEFAULT' disabled>Select Divition</option>
            <option value='A'>A</option>
            <option value='B'>B</option>
            <option value='C'>C</option>
            <option value='D'>D</option>
            <option value='E'>E</option>
          </select>

          <input type="text" name='roll' placeholder="Enter Roll Number in Digits" defaultValue={setValue('roll')} readOnly={viewMode} required />
        </div>
        <div className='grid grid-cols-2 gap-4 pt-8'>
          <textarea name='address_one' placeholder="Address Line 1" defaultValue={setValue('addressOne')} readOnly={viewMode} required></textarea>
          <textarea name='address_two' placeholder="Address Line 2" defaultValue={setValue('addressTwo')} readOnly={viewMode} required></textarea>
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <input type="text" name='landmark' placeholder="Landmark" defaultValue={setValue('landmark')} readOnly={viewMode} required />
          <input type="text" name='city' placeholder="City" defaultValue={setValue('city')} readOnly={viewMode} required />
          <input type="text" name='pincode' placeholder="Pincode" defaultValue={setValue('pincode')} readOnly={viewMode} required />
        </div>
      </div>

      {
        !viewMode &&
        < input type="submit" className='btn btn-primary mt-8 px-28 capitalize' value="Add Student" />
      }
    </form>
  );
};

export default StudentForm;