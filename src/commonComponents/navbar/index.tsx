'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useEnhancedSelector } from '../../Helpers/reduxHooks';
import { useDevice } from '../../Helpers/useDevice';
import Link from 'next/link';

const Navbar = () => {
  const { IsWeb } = useDevice();

  // const isAuth = useEnhancedSelector((state) => state.user.isAuth);
  let isAuth = true;
  if (!isAuth) return <></>;

  let type = 'user';

  return (
    <nav className="py-12 bg-[white] text-[black]">
      <div className="flex justify-around items-center">
        <div>Heloo Hamza</div>
        <div>
          {type === 'user' ? (
            <Link href={`/my-reservation`}>
              <button className="mr-3 py-3 px-3 bg-[blue]" >My Reservation</button>
            </Link>
          ) : (
            <Link href="/users">
              <button className="mr-3 py-3 px-3 bg-[blue]">User</button>
            </Link>
          )}

          <button className="mr-3 py-3 px-3 bg-[blue]">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
