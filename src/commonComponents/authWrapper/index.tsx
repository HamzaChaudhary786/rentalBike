'use client';
import React, { useEffect, useState } from 'react';
import { useEnhancedDispatch, useEnhancedSelector } from '../../Helpers/reduxHooks';
import FullPageLoader from '../fullPageLoader';
import * as Actions from '../../store/actions';
import Navbar from '../navbar';
import LoginPage from '../../components/login';
import { usePathname, useRouter } from 'next/navigation';

const AuthWrapper: React.FC<{ children: React.ReactNode; hideNav?: boolean }> = (props) => {
  const dispatch = useEnhancedDispatch();
  const router = useRouter();
  const pathname = usePathname();

  let isAuth = true;

  let type = 'manager';

  useEffect(() => {
    if (pathname === '/manager' && type !== 'manager') {
      router.push('/not-authorized');
    }
  }, [pathname, type]);

  // const isAuth = useEnhancedSelector((state) => state.user.isAuth);
  const userData = useEnhancedSelector((state) => state.user.userData);
  const [IsLoading, setIsLoading] = useState(!isAuth);

  useEffect(() => {
    if (!!localStorage.getItem('@access-token')) {
      getuserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  async function getuserData() {
    if (userData) return;
    // await dispatch(Actions.getUserDataAction(true));
    setIsLoading(false);
  }

  if (IsLoading) return <FullPageLoader />;

  if (!isAuth) {
    return <LoginPage />;
  }

  if (isAuth)
    return (
      <>
        {!props.hideNav && <Navbar />}

        <div
          style={{
            paddingLeft: '5%',
            paddingRight: '5%',
          }}
        >
          {props.children}
        </div>
      </>
    );
  return <></>;
};

export default AuthWrapper;
