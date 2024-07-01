'use client'

import React, { useState } from 'react'
import { getUserData } from '../../Helpers/GetUserData'
import { Delete } from '@mui/icons-material'
import { IconButton, Rating } from '@mui/material'

const MyReservation = () => {

    const [rating, setRating] = useState<number | null>(null);
    const [rateColor, setRateColor] = useState<string | null>(null);



    const numericRateColor = rateColor ? parseInt(rateColor, 5) : null;

    const effectiveRateColor = numericRateColor !== null ? numericRateColor : rating;
    return (
        <>
            <div>

                <h1>
                    MyReservation
                </h1>


                <div>
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Bike Model</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Bike Color</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Bike Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Start Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">End Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Action</th>

                            </tr>
                        </thead>

                        {getUserData && getUserData.map((item: any) => {



                            return (
                                <>




                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {item.previousReservations.map((reserve: any) => {
                                            const startDate = new Date(reserve.startDate);
                                            const endDate = new Date(reserve.endDate);
                                            const currentDate = new Date();

                                            const InRange = (startDate <= currentDate && endDate >= currentDate) || (startDate > currentDate || endDate > currentDate);

                                            return (
                                                <tr key={reserve.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{reserve.bikeModel}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{reserve.bikeColor}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{reserve.location}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{reserve.startDate}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{reserve.endDate}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                                                        {InRange ? (
                                                            <IconButton>
                                                                <Delete className='text-[red]' />
                                                            </IconButton>
                                                        ) : (
                                                            reserve.rating ? (
                                                                <div>
                                                                    {reserve.rating}
                                                                </div>
                                                            ) : (
                                                                <span className='flex h-4 w-4 ml-1 mr-1'>
                                                                    {[...Array(1)].map((star, index) => {
                                                                        const currentRate = index + 1;
                                                                        return (
                                                                            <label key={index}>
                                                                                <input
                                                                                    type="radio"
                                                                                    value={currentRate}
                                                                                    className='opacity-5'
                                                                                    onClick={() => setRating(currentRate)}
                                                                                />
                                                                                <Rating
                                                                                    className='-mt-6'
                                                                                    color={currentRate <= (effectiveRateColor || 0) ? "grey" : "yellow"}
                                                                                />
                                                                            </label>
                                                                        );
                                                                    })}
                                                                </span>
                                                            )
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}

                                    </tbody>




                                </>
                            )

                        })}
                    </table>
                </div>


            </div>
        </>
    )
}

export default MyReservation