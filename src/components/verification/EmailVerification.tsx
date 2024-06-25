import { Button, CircularProgress, TextField } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FormValues } from '../../interfaces';
import { useEnhancedDispatch, useEnhancedSelector } from '../../Helpers/reduxHooks';
import * as Actions from '../../store/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const EmailVerification = () => {
  const dispatch = useEnhancedDispatch();
  const email = useEnhancedSelector((state) => state.user.email);

  const router = useRouter();
  const [errors, setErrors] = useState<FormValues>({});
  const [serverError, setServerError] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [seconds, setSeconds] = useState(59);

  const LoginValidation = () => {
    const errors: Partial<FormValues> = {};
    if (!otpCode) errors.otpCode = 'Otp is required';
    return errors;
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const validateError = LoginValidation();
    if (Object.keys(validateError).length > 0) {
      setErrors(validateError);
      setIsLoading(false);
    } else {
      try {
        const response = await dispatch(Actions.VerifyOtpAction(email, otpCode));
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

  useEffect(() => {
    const invalidData = setInterval(() => {
      setSeconds((prev) => (prev === 0 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(invalidData);
  }, [seconds]);

  // useEffect(() => {
  //     if (!email) {
  //         router.push('/forgot-password');
  //     }
  // }, [email]);

  const SendOtpCode = async () => {
    setErrors({});
    try {
      const errorFromAction = await dispatch(Actions.forgetPasswordAction(email));
      if (errorFromAction) throw errorFromAction;
    } catch (error: any) {
      setErrors(error as object);
    }
  };

  return (
    <>
      <div className="h-screen w-[100%] grid justify-items-center items-center bg-DARK_BACKGROUND_COLOR_MAIN">
        <form
          onSubmit={handleVerification}
          className="grid gap-y-4 h-fit w-fi justify-items-start border border-WARNING_COLOR  p-8 bg-[#FFFF]  text-[#000]"
          style={{ border: '2px solid white' }}
        >
          <h1 className="text-2xl font-bold ">Verify Otp</h1>
          <TextField
            name="email"
            style={{ width: '100%', margin: '5px' }}
            type="number"
            label="Otp"
            variant="outlined"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            error={!!errors.otpCode}
            helperText={errors.otpCode}
          />

          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" sx={{ width: '100%' }}>
              Submit
            </Button>
          )}
          <div className=" gap-x-5">
            <span>{seconds === 0 ? `00` : `Resend OTP in ${seconds} seconds`}</span>
            <span
              className="hover:text-INFO_COLOR hover:cursor-pointer"
              onClick={() => {
                if (seconds !== 0) return;
                SendOtpCode();
                toast.success('Otp sent Succesfully');
                setSeconds(59);
              }}
            >
              Resent Otp
            </span>
          </div>
          <div>{serverError}</div>
        </form>
      </div>
    </>
  );
};

export default EmailVerification;
