'use client';

import { Button, CircularProgress, TextField } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { FormValues } from '../../interfaces';
import { useEnhancedDispatch } from '../../Helpers/reduxHooks';
import * as Actions from '../../store/actions';
import { useRouter } from 'next/navigation';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constants';
import { toast } from 'react-toastify';

const SignUpPage = () => {
  const dispatch = useEnhancedDispatch();
  const router = useRouter();
  const [errors, setErrors] = useState<FormValues>({});
  const [serverError, setServerError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');

  const LoginValidation = () => {
    const errors: Partial<FormValues> = {};
    if (!userName) errors.userName = 'Name is required';
    if (!email) {
      errors.email = 'Email is required';
    }
    // else if (!EMAIL_REGEX.test(email)) {
    //   errors.email = 'Invalid email format';
    // }
    if (!password) {
      errors.password = 'Password is required';
    }
    // else if (!PASSWORD_REGEX.test(password)) {
    //   errors.password = 'Invalid password format';
    // }
    return errors;
  };

  const handleRegisterForm = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const validateError = LoginValidation();
    if (Object.keys(validateError).length > 0) {
      setErrors(validateError);
      setIsLoading(false);
    } else {
      try {
        console.log("email:", email, "password:", password, "name:", userName)
        const response = await dispatch(Actions.registerAction(userName, email, password));

        if (response) throw response;


        setIsLoading(false);
        toast.success("Register Sucessfully")
        router.push('/');
      } catch (error: any) {

        setIsLoading(false);
        if (typeof error === 'string') {
          setServerError(error);
        } else {
          setServerError('Something went wrong, please try again later');
        }

      }
    }
  };

  return (
    <>
      <div className="h-screen w-[100%] grid justify-items-center items-center bg-DARK_BACKGROUND_COLOR_MAIN">
        <form
          onSubmit={handleRegisterForm}
          className="grid gap-y-4 h-fit w-fi justify-items-start border border-WARNING_COLOR  p-8 bg-[#FFFF]  text-[#000]"
          style={{ border: '2px solid white' }}
        >
          <h1 className="text-2xl font-bold">Register</h1>
          <TextField
            name="text"
            style={{ width: '100%', margin: '5px' }}
            type="text"
            label="Name"
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            error={!!errors.userName}
            helperText={errors.userName}
          />
          <TextField
            name="email"
            style={{ width: '100%', margin: '5px' }}
            type="text"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            name="password"
            style={{ width: '100%', margin: '5px' }}
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />

          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" sx={{ width: '100%' }}>
              Submit
            </Button>
          )}

          <div>{serverError}</div>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
