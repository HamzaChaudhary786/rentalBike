'use client';

import { Box, IconButton, Modal, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TableComp } from '../../commonComponents/table/index';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CheckBox, Delete, VisibilityOff } from '@mui/icons-material';
import { Bike } from '../../interfaces';
import { UserData } from '../../Helpers/UserDummyData';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '704px',
  maxHeight: '90vh', // Set the maximum height of the Box
  bgcolor: '#FFF',
  boxShadow: 24,
  p: '24px',
  overflow: 'auto',
  borderRadius: '12px',
};

const Users = () => {
  const [IsLoadingData, setIsLoadingData] = useState(false);
  const [openStatusBox, setOpenStatusBox] = useState(false);
  const [Type, setType] = useState('');
  const [userData, setUserData] = useState(UserData);

  const handleStatus = (id: string | undefined) => {
    // Find the clicked row's data by ID
    const singleTypeData = userData?.find((data: any) => data.id === id);

    if (singleTypeData) {
      // Toggle the type between 'user' and 'manager'
      const newType = singleTypeData.type === 'user' ? 'manager' : 'user';

      // Update the row with the new type
      const updatedUserData = userData.map((data: any) => (data.id === id ? { ...data, type: newType } : data));

      console.log(updatedUserData, 'updatedUserData');

      // Update the state with the new user data
      setUserData(updatedUserData);
    }
  };

  return (
    <>
      <div>
        <div>Heloo Users</div>
        <div>
          <TableComp
            data={userData}
            isLoading={IsLoadingData}
            columns={[
              {
                Heading: 'Id',
                accessor: 'id',
              },
              {
                Heading: 'Name',
                accessor: 'name',
              },
              {
                Heading: 'Email',
                accessor: 'email',
              },
              {
                Heading: 'Type',

                Cell: (row: Bike, index) => {
                  return (
                    <>
                      <div className="cursor-pointer text-xl hover:text-[blue]" onClick={() => handleStatus(row.id)}>
                        {row.type}
                      </div>
                    </>
                  );
                },
              },

              {
                Heading: 'Actions',
                Cell: (row: Bike, index) => {
                  //   if (EventBeingDeletedId === row.id)
                  //     return <CircularProgress />;

                  return (
                    <>
                      <IconButton className="mt-4 mr-5 ">
                        <EditIcon color="secondary" />
                      </IconButton>
                      <IconButton className="mt-4 mr-5">
                        <Delete color="primary" />
                      </IconButton>
                    </>
                  );
                },
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Users;
