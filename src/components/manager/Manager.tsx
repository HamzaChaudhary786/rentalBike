'use client';
import { IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TableComp } from '../../commonComponents/table/index';
import { BikeData } from '../../Helpers/BikeDummyData';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CheckBox, Delete, VisibilityOff } from '@mui/icons-material';
import { Bike } from '../../interfaces';

const Manager = () => {
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [location, setLocation] = useState('');
  const [IsLoadingData, setIsLoadingData] = useState(false);
  const [Id, setId] = useState('');
  const [Status, setStatus] = useState<Boolean>();
  const [Filter, setFilter] = useState(BikeData);
  const handleEdit = (id: any) => {
    setId(id);
  };

  useEffect(() => {
    const singleData = BikeData.find((itm: any) => itm.id === Id);

    if (singleData) {
      setModel(singleData.model);
      setColor(singleData.color);
      setLocation(singleData.location);
    }
  }, [Id]);

  const handleStatus = (id: string | undefined) => {
    if (!id) return;

    const updatedBikeData = BikeData?.map((bike: any) => {
      if (bike.id === id) {
        return { ...bike, status: !bike.status }; // Toggle status for the clicked bike
      }
      return bike;
    });

    setFilter(updatedBikeData);
  };

  return (
    <>
      <div>
        <div className="addbike">
          <div className="grid w-full h-28 items-center justify-items-center">
            <h2>Manager Dashboard</h2>
          </div>
          <div>
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
          </div>
        </div>

        <div>
          <TableComp
            data={Filter}
            isLoading={IsLoadingData}
            columns={[
              {
                Heading: 'Model',
                accessor: 'model',
              },
              {
                Heading: 'Color',
                accessor: 'color',
              },
              {
                Heading: 'Location',
                accessor: 'location',
              },
              {
                Heading: 'Rating',
                accessor: 'rating',
              },
              {
                Heading: 'Reservation',
                Cell: (row: Bike, index) => {
                  //   if (EventBeingDeletedId === row.id)
                  //     return <CircularProgress />;
                  return (
                    <>
                      <IconButton className="mt-4 mr-5" onClick={() => handleStatus(row.id)}>
                        {row.status === false ? <VisibilityOff /> : <VisibilityIcon />}
                      </IconButton>
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
                      <IconButton className="mt-4 mr-5">
                        <CheckBox />
                      </IconButton>
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
