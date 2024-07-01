'use client';
import { IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TableComp } from '../../commonComponents/table/index';
import { BikeData } from '../../Helpers/BikeDummyData';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CheckBox, Delete, VisibilityOff } from '@mui/icons-material';
import { Bike } from '../../interfaces';
import UserData from '../reservation/UserData';
import Link from 'next/link';
import { reservationUserTable } from '../../Helpers/ReservationUserDummyData';
import OptionValue from '../../Helpers/OptionValue';
import { AvailibleValue } from '../../constants';

const Manager = () => {
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [location, setLocation] = useState('');

  const [IsLoadingData, setIsLoadingData] = useState(false);
  const [Id, setId] = useState('');
  const [Status, setStatus] = useState<Boolean>();
  const [Filter, setFilter] = useState(reservationUserTable);
  const [filterModel, setFilterModel] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterRating, setFilterRating] = useState("")
  const [Availible, setAvailible] = useState("Availible");
  const handleEdit = (id: any) => {
    setId(id);
  };

  useEffect(() => {
    const singleData = reservationUserTable.find((itm: any) => itm.id === Id);

    if (singleData) {
      setModel(singleData.bikeModal);
      setColor(singleData.bikeColor);
      setLocation(singleData.bikeLocation);
    }
  }, [Id]);




  const handleBikeFilter = (e: React.FormEvent) => {
    e.preventDefault();
    if (filterModel === '' || filterColor === '' || filterLocation === '' || filterRating === '') {
      setFilter(reservationUserTable)
    }

    const filteredBikeData = reservationUserTable.filter((data: any) => {


      const matchModel = filterModel ? data.bikeModal.toLowerCase().includes(filterModel.toLowerCase()) : true;
      const matchColor = filterColor ? data.bikeColor.toLowerCase().includes(filterColor.toLowerCase()) : true;
      const matchLocation = filterLocation ? data.bikeLocation.toLowerCase().includes(filterLocation.toLowerCase()) : true;
      const matchRating = filterRating ? data.averageRating === parseInt(filterRating) : true;
      return matchModel && matchColor && matchLocation && matchRating

    })


    setFilter(filteredBikeData)



  }

  console.log("filter data is ", Filter)
  return (
    <>
      <div className='space-y-8'>
        <div className="addbike ">
          <div className="grid w-full h-28 items-center justify-items-center">
            <h2>Manager Dashboard</h2>
          </div>
          <div className='flex gap-x-8'>
            <form action="" className=" grid h-96 w-fit bg-[gray] text-[white] justify-items-center items-center p-6">
              {Id ? <h1 className="text-3xl">Edit Bike</h1> : <h1 className="text-3xl">Add Bike</h1>}

              <TextField
                type="text"
                id="Model"
                label="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                variant="outlined"
              />
              <br />
              <TextField
                type="text"
                id="Color"
                label="Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                variant="outlined"
              />
              <br />
              <TextField
                type="text"
                id="Location"
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                variant="outlined"
              />
              <br />
              {Id ? (
                <button className="bg-[blue] text-[white] py-3 px-8 text-xl ">Update</button>
              ) : (
                <button className="bg-[blue] text-[white] py-3 px-8 text-xl ">Add</button>
              )}
            </form>

            <form action="" className=" grid w-fit bg-[gray] text-[white] justify-items-center items-center p-6" onSubmit={handleBikeFilter}>

              <h1 className="text-3xl">Filter Bike</h1>
              <div className='flex gap-x-6'>

                <TextField
                  type="text"
                  id="Model"
                  label="Model"
                  value={filterModel}
                  onChange={(e) => setFilterModel(e.target.value)}
                  variant="outlined"
                />
                <br />
                <TextField
                  type="text"
                  id="Color"
                  label="Color"
                  value={filterColor}
                  onChange={(e) => setFilterColor(e.target.value)}
                  variant="outlined"
                />
                <br />
                <TextField
                  type="text"
                  id="Location"
                  label="Location"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  variant="outlined"
                />
                <TextField
                  type="text"
                  id="Location"
                  label="Rating"
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  variant="outlined"
                />
              </div>
              <br />

              <button className="bg-[blue] text-[white] py-3 px-8 text-xl ">Filter</button>

            </form>

          </div>
        </div>

        <div>
          <TableComp
            data={Filter}
            rowsToShow={8}
            isLoading={IsLoadingData}
            columns={[
              {
                Heading: 'Model',
                accessor: 'bikeModal',
              },
              {
                Heading: 'Color',
                accessor: 'bikeColor',
              },
              {
                Heading: 'Location',
                accessor: 'bikeLocation',
              },
              {
                Heading: 'Rating',
                accessor: 'averageRating',
              },
              {
                Heading: 'Reservation',
                Cell: (row: Bike, index) => {
                  //   if (EventBeingDeletedId === row.id)
                  //     return <CircularProgress />;
                  return (
                    <>
                      <Link href={`/${row.id}`}>
                        <IconButton className="mt-4 mr-5">

                          <VisibilityIcon />

                        </IconButton>
                      </Link>
                    </>
                  );
                },
              },
              {
                Heading: 'Availible',
                Cell: (row: Bike, index) => {
                  //   if (EventBeingDeletedId === row.id)
                  //     return <CircularProgress />;
                  return (
                    <>
                      <OptionValue
                        value={Availible}
                        onChange={setAvailible}
                        menuItems={AvailibleValue}
                      >

                      </OptionValue>
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
                      <IconButton
                        className="mt-4 mr-5 "
                        onClick={() => {
                          handleEdit(row.id);
                          console.log(row.id);
                        }}
                      >
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

export default Manager;
