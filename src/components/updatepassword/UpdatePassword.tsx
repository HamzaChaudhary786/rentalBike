import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import * as Actions from '../../store/actions';
import { useEnhancedDispatch, useEnhancedSelector } from '../../Helpers/reduxHooks';
import { PASSWORD_REGEX } from '../../constants';
import { useRouter } from 'next/navigation';
import { FormValues } from '../../interfaces';

const UpdatePassword = () => {
  const router = useRouter();
  const dispatch = useEnhancedDispatch();
  const email = useEnhancedSelector((state) => state.user.email);
  const otpCode = useEnhancedSelector((state) => state.user.otpCode);

  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState('');
  const [rePassword, setRePassword] = useState('');

  const LoginValidation = () => {
    const errors: Partial<FormValues> = {};
    if (!password) errors.password = 'Password is required';
    if (!rePassword) errors.rePassword = 'Re-Password is required';
    return errors;
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
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
          onSubmit={handleUpdatePassword}
          className="grid gap-y-4 h-fit w-fi justify-items-start border border-WARNING_COLOR  p-8 bg-[#FFFF]  text-[#000]"
          style={{ border: '2px solid white' }}
        >
          {' '}
          <TextField
            fullWidth
            label="Password"
            style={{ marginTop: '25px' }}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            style={{ marginTop: '15px' }}
            type={showPassword ? 'text' : 'password'}
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            error={!!errors.rePassword}
            helperText={errors.rePassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br />
          {isLoading ? <CircularProgress /> : <Button type="submit">Submit</Button>}
          <div>{serverError}</div>
        </form>
      </div>
    </>
  );
};

export default UpdatePassword;
