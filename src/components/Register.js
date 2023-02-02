import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const Register = () => {

  const { userRegister, setUserLoading, updateUserProfile } = useAuth();

  const navigate = useNavigate();
  const from = '/add-student';

  const handleForm = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;


    userRegister(email, password)
      .then(result => {
        updateUserProfile({ displayName: name })
          .then(() => {
            toast.success('Register Successful..');
            form.reset();
            navigate(from, { replace: true });
            setUserLoading(false);
          })
          .catch(err => {
            toast.error(err.message);
            setUserLoading(false);
          })
      })
      .catch(err => {
        toast.error(err.message);
        setUserLoading(false);
      })
  }

  return (
    <div className="p-8 border border-secondary bg-secondary">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      <form onSubmit={handleForm} className="space-y-6 ng-untouched ng-pristine ng-valid">
        <div className="space-y-1 text-sm">
          <label htmlFor="name" className="block text-gray-600">Full Name</label>
          <input type="text" name="name" placeholder="name" className="input w-full" />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block text-gray-600">Email</label>
          <input type="text" name="email" placeholder="email" className="input w-full" />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block text-gray-600">Password</label>
          <input type="password" name="password" placeholder="Password" className="input w-full" />
        </div>
        <div className='flex justify-between'>
          <button type='submit' className="btn btn-primary btn-sm">Register</button>
        </div>
      </form>

    </div>
  );
};

export default Register;