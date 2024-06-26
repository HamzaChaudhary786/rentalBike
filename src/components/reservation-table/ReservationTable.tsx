
'use client'


import { useParams } from 'next/navigation'
import React from 'react'
import { reservationUserTable } from '../../Helpers/ReservationUserDummyData';

const ReservationTable = () => {
    const { id } = useParams<{ id: string }>();

    const singleReserveData = reservationUserTable.filter((item: any) => item.id === parseInt(id))


    return (
        <>

            <div>

                <div>

                    {singleReserveData && singleReserveData.map((item) => {

                        return (
                            <>

                                <div>



                                    {item.reservation.map((reserve) => {
                                        return (
                                            <>
                                                <section className='flex gap-x-8'>
                                                    <h1>Bike Color :{item.bikeColor}</h1>
                                                    <h1>Model: {item.bikeModal}</h1>
                                                </section>

                                                <div>
                                                    <table className='min-w-full divide-y divide-gray-200'>
                                                        <thead className='bg-gray-50'>
                                                            <tr>
                                                                <th className='h1x-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                                                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                                                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Types</th>
                                                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Start Date</th>
                                                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>End Date</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className='bg-white divide-y divide-gray-200'>
                                                            <tr>
                                                                <td className='px-6 py-4 whitespace-nowrap'>{reserve.name}</td>
                                                                <td className='px-6 py-4 whitespace-nowrap'>{reserve.email}</td>
                                                                <td className='px-6 py-4 whitespace-nowrap'>{reserve.type}</td>
                                                                <td className='px-6 py-4 whitespace-nowrap'>{reserve.startDate}</td>
                                                                <td className='px-6 py-4 whitespace-nowrap'>{reserve.endDate}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>
                                            </>
                                        );
                                    })}



                                </div>

                            </>
                        )

                    })}

                </div>


                <div>

                </div>



            </div>
        </>
    )
}

export default ReservationTable