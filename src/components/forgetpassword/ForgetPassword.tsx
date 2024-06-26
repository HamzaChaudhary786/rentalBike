import { Button, CircularProgress, TextField } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { FormValues } from '../../interfaces';
import { useEnhancedDispatch } from '../../Helpers/reduxHooks';
import * as Actions from '../../store/actions';
import { useRouter } from 'next/navigation';
import { EMAIL_REGEX } from '../../constants';

const ForgetPassword = () => {
  const dispatch = useEnhancedDispatch();
  const router = useRouter();
  const [errors, setErrors] = useState<FormValues>({});
  const [serverError, setServerError] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const LoginValidation = () => {
    const errors: Partial<FormValues> = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(email)) {
      errors.email = 'Invalid email format';
    }
    return errors;
  };

  const handleForgetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const validateError = LoginValidation();
    if (Object.keys(validateError).length > 0) {
      setErrors(validateError);
      setIsLoading(false);
    } else {
      try {
        const response = await dispatch(Actions.forgetPasswordAction(email));

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
          onSubmit={handleForgetPassword}
          className="grid gap-y-4 h-fit w-fi justify-items-start border border-WARNING_COLOR  p-8 bg-[#FFFF]  text-[#000]"
          style={{ border: '2px solid white' }}
        >
          <h1 className="text-2xl font-bold ">Forget Password</h1>
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

export default ForgetPassword;
