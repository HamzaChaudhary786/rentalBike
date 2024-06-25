'use client';

import { Button, CircularProgress, TextField } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { FormValues } from '../../interfaces';
import { useEnhancedDispatch } from '../../Helpers/reduxHooks';
import * as Actions from '../../store/actions';
import { useRouter } from 'next/navigation';
const SignUpPage = () => {
  const dispatch = useEnhancedDispatch();
  const router = useRouter();
  const [errors, setErrors] = useState<FormValues>({});
  const [serverError, setServerError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  const LoginValidation = () => {
    const errors: Partial<FormValues> = {};
    if (!name) errors.name = 'Name is required';
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';
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
        const response = await dispatch(Actions.registerAction(email, password, name));

        if (response) {
          throw response;
        }

        setIsLoading(false);
        router.push('/');
      } catch (error: any) {
        setServerError(error);
        setIsLoading(false);
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
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
