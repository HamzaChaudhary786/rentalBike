'use client';
import React, { useEffect, useState } from 'react';
import { useEnhancedDispatch, useEnhancedSelector } from '../../Helpers/reduxHooks';
import FullPageLoader from '../fullPageLoader';
import * as Actions from '../../store/actions';
import Navbar from '../navbar';
import LoginPage from '../../components/login';
import { useRouter } from 'next/navigation';

const UnauthWrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  const dispatch = useEnhancedDispatch();
  const router = useRouter();
  const [IsLoading, setIsLoading] = useState(true);

  const isAuth = useEnhancedSelector((state) => state.user.isAuth);

  useEffect(() => {
    if (!IsLoading) {
      if (isAuth) {
        router.push('/links');
      }
    }
  }, [IsLoading]);

  useEffect(() => {
    if (!!localStorage.getItem('@access-token')) {
      getuserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  async function getuserData() {
    // await dispatch(Actions.getUserDataAction(true));
    setIsLoading(false);
  }

  if (IsLoading) return <FullPageLoader />;

  if (!isAuth) {
    return <div>{props.children}</div>;
  }

  if (isAuth) return <FullPageLoader />;

  return <></>;
};

export default UnauthWrapper;
