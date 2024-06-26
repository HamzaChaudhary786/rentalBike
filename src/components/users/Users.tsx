'use client';

import { Box, IconButton, Modal, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TableComp } from '../../commonComponents/table/index';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CheckBox, Delete, Password, VisibilityOff } from '@mui/icons-material';
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
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [singleUserData, setSingleUserData] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [editId, setEditId] = useState<String | undefined>("")
  const [Password, setPassword] = useState("")
  const [types, setTypes] = useState("")

  const handleStatus = (id: string | undefined) => {

    const singleTypeData = userData?.find((data: any) => data.id === id);

    if (singleTypeData) {
      const newType = singleTypeData.type === 'user' ? 'manager' : 'user';
      const updatedUserData = userData.map((data: any) => (data.id === id ? { ...data, type: newType } : data));
      console.log(updatedUserData, 'updatedUserData');
      setUserData(updatedUserData);
    }
  };

  const filterUser = (e: any) => {

    e.preventDefault();

    if (name === '' || email === '' || types === '') {
      setUserData(UserData)
    }

    const filteredData = UserData.filter((data: any) => {


      const matchName = name ? data.name.toLowerCase().includes(name.toLowerCase()) : true;
      const matchEmail = email ? data.email.toLowerCase().includes(email.toLowerCase()) : true;
      const matchType = types ? data.type.toLowerCase().includes(types.toLowerCase()) : true;

      return matchName && matchEmail && matchType

    })


    setUserData(filteredData)
  }


  const handleViewDialog = (id: string | undefined) => {

    setViewDialogOpen(true)

    const viewData = UserData?.filter((view: any) => view.id === id)

    console.log("view data is ", viewData)

    if (viewData.length > 0) {
      setSingleUserData(viewData)
    }



  }

  return (
    <>
      <div className='space-y-10 p-10'>
        <div>Heloo Users</div>



        <button className='bg-[blue] text-[white] rounded-2xl py-3 px-4' onClick={() => {
          setDialogOpen(true)
          setEditId("")
        }}>
          Add User
        </button>

        <div className="filter">

          <div>

            <form action="" onSubmit={filterUser} className='space-y-4'>
              <h1>
                Filter User
              </h1>
              <br />


              <div className='flex gap-5'>
                <TextField
                  type="text"
                  label="Name"
                  id="StartDate"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                />

                <br />
                <TextField
                  type="email"
                  id="EndDate"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                />
                <br />
                <TextField
                  type="text"
                  id="Model"
                  label="Model"
                  value={types}
                  onChange={(e) => setTypes(e.target.value)}
                  variant="outlined"
                />
                <br />
              </div>



              <button type='submit' className='py-2 px-3 bg-[blue] text-[white]'>
                Filter
              </button>



            </form>
          </div>
        </div>
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
                      <IconButton className="mt-4 mr-5 " onClick={() => {
                        setDialogOpen(true)
                        setEditId(row.id)
                      }}>
                        <EditIcon color="secondary" />
                      </IconButton>
                      <IconButton className="mt-4 mr-5">
                        <Delete color="primary" />
                      </IconButton>

                      <IconButton className="mt-4 mr-5" onClick={() => {

                        handleViewDialog(row.id)

                      }}>
                        <VisibilityIcon color="primary" />
                      </IconButton>
                    </>
                  );
                },
              },
            ]}
          />
        </div>



        <div>
          <Modal open={dialogOpen} onClose={() => { setDialogOpen(false) }} >
            <Box sx={style}>

              <div>
                <form action="" onSubmit={filterUser} className='space-y-4'>
                  {
                    editId ? (<h1>Edit User</h1>) : (<h1>Add User</h1>)
                  }
                  <br />


                  <div className='space-y-8'>
                    <TextField
                      type="text"
                      label="Name"
                      id="StartDate"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      variant="outlined"
                    />

                    <br />
                    <TextField
                      type="email"
                      id="EndDate"
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="outlined"
                    />
                    <br />
                    <TextField
                      type="text"
                      id="Type"
                      label="Type"
                      value={types}
                      onChange={(e) => setTypes(e.target.value)}
                      variant="outlined"
                    />
                    <br />
                    <TextField
                      type="password"
                      id="Type"
                      label="Password"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      variant="outlined"
                    />
                    <br />
                  </div>


                  <div>
                    {
                      editId ? (<button type='submit' className='py-2 px-3 bg-[blue] text-[white]'>Edit User</button>) : (<button type='submit' className='py-2 px-3 bg-[blue] text-[white]'>Add User</button>)
                    }
                  </div>







                </form>
              </div>

            </Box>
          </Modal>
        </div>






        <div>

          <Modal open={viewDialogOpen} onClose={() => setViewDialogOpen(false)}>
            <Box sx={style}>
              {
                singleUserData.map((itm: any) => (
                  <div key={itm.id} className='space-y-4'>
                    <h2>{itm.name}</h2>
                    <p>Email: {itm.email}</p>
                    <p>Type: {itm.type}</p>
                    <h3>Reservations:</h3>
                    <ul>
                      {itm.reservation.map((res: any, index: any) => (
                        <li key={index} className='space-y-4'>
                          <p>Model: {res.model}</p>
                          <p>Location: {res.location}</p>
                          <p>Color: {res.color}</p>
                          <p>Start Date: {new Date(res.startDate).toLocaleString()}</p>
                          <p>End Date: {new Date(res.endDate).toLocaleString()}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              }
            </Box>
          </Modal>

        </div>
      </div >
    </>
  );
};

export default Users;
