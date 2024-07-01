'use client';

import { Button, CircularProgress, TextField } from '@mui/material';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FormValues } from '../../interfaces';
import { useEnhancedDispatch } from '../../Helpers/reduxHooks';
import * as Actions from '../../store/actions';
import { useRouter } from 'next/navigation';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constants';

const LoginPage = () => {
  const dispatch = useEnhancedDispatch();
  const router = useRouter();
  const [errors, setErrors] = useState<FormValues>({});
  const [serverError, setServerError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    if (!email) {
      return 'Email is required';
    } else if (!EMAIL_REGEX.test(email)) {
      return 'Invalid email format';
    }
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return 'Password is required';
    } else if (!PASSWORD_REGEX.test(password)) {
      return 'Invalid password format';
    }
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(e.target.value),
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(e.target.value),
    }));
  };

  const handleLoginForm = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      setIsLoading(false);
    } else {
      try {
        const response = await dispatch(Actions.loginAction(email, password));

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
    <div className="h-screen w-[100%] grid justify-items-center items-center bg-DARK_BACKGROUND_COLOR_MAIN">
      <form
        onSubmit={handleLoginForm}
        className="grid gap-y-4 h-fit w-fi justify-items-start border border-WARNING_COLOR  p-8 bg-[#FFFF]  text-[#000]"
        style={{ border: '2px solid white' }}
      >
        <h1 className="text-2xl font-bold ">Login Form</h1>
        <TextField
          name="email"
          style={{ width: '100%', margin: '5px' }}
          type="text"
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
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
          onChange={handlePasswordChange}
          error={!!errors.password}
          helperText={errors.password}
        />
        <p>
          Create Account <Link href="/sign-up">Register</Link>
        </p>

        <p>
          Forget Password <Link href="/forgot-password">Forget Password</Link>
        </p>

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
  );
};

export default LoginPage;
