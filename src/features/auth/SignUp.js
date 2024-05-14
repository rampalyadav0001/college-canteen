import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createUserAsync,selectloggedInUser } from './authSlice';
import { Link,Navigate } from 'react-router-dom';
function SignUp() {
  const dispatch = useDispatch();
  const user = useSelector(selectloggedInUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
    
    <section className='h-screen bg-fixed flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0'>
    {user && <Navigate to="/" replace={true}></Navigate>}
      <div className='md:w-1/3 max-w-sm'>
        <img
          src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
          alt='Sample image'
        />
      </div>
      <div className='md:w-1/3 max-w-sm'>
        <div className='text-center md:text-left'>
          <label className='mr-1'>Sign in with</label>
          <button
            type='button'
            className='mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='mx-auto h-3.5 w-3.5'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' />
            </svg>
          </button>
          <button
            type='button'
            className='inlne-block mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='mx-auto h-3.5 w-3.5'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
            </svg>
          </button>
        </div>
        <div className='my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300'>
          <p className='mx-4 mb-0 text-center font-semibold text-slate-500'>
            Or
          </p>
        </div>
        <form
          noValidate
          className='space-y-6'
          onSubmit={handleSubmit((data) => {
            dispatch(
              createUserAsync({
                email: data.email,
                password: data.password,
                // addresses: [],
                role: 'user',
                //TODO: this role can be directly given on backend
              })
            );
          
          })}
        >
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Email address
            </label>
            <div className='mt-2'>
              <input
                id='email'
                {...register('email', {
                  required: 'email is required',
                  pattern: {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: 'email not valid',
                  },
                })}
                type='email'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
              {errors.email && (
                <p className='text-red-500'>{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Password
              </label>
            </div>
            <div className='mt-2'>
              <input
                id='password'
                {...register('password', {
                  required: 'password is required',
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                  },
                })}
                type='password'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
              {errors.password && (
                <p className='text-red-500'>{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Confirm Password
              </label>
            </div>
            <div className='mt-2'>
              <input
                id='confirmPassword'
                {...register('confirmPassword', {
                  required: 'confirm password is required',
                  validate: (value, formValues) =>
                    value === formValues.password || 'password not matching',
                })}
                type='password'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
              {errors.confirmPassword && (
                <p className='text-red-500'>{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className='mt-4 flex justify-end font-semibold text-sm'>
          <a
            className='text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4'
            href='#'
          >
            Forgot Password?
          </a>
        </div>

        <div className='mt-4 font-semibold text-sm text-slate-500 text-center md:text-left'>
          Already have an account?{' '}
          <a
            className='text-red-600 hover:underline hover:underline-offset-4'
            href='#'
          >
            signIn
          </a>
        </div>
      </div>
    </section>
    </>
  );
}

export default SignUp;
