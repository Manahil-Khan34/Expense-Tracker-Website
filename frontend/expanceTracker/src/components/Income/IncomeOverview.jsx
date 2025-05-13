import React from 'react'
import { LuPlus } from "react-icons/lu";
import CustomBarChart from '../Charts/CustomBarChart';
import { useState } from 'react';
import { useEffect } from 'react';
import { prepareIncomebarChartData } from '../../utils/helper';

const IncomeOverview = ({transections,onAddIncome}) => {

const [chartData, setChartData] =
useState([])

useEffect(() =>{
    const result = prepareIncomebarChartData(transections);
    setChartData(result);

    return () =>{};

}, [transections]);

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div className=''>
            <h5 className='text-lg'>
             Income Overview
            </h5>
            <p className='text-xs text-gray-400 mt-0.5'> Track Your earning over time and analyze your income  trads</p>
        </div>

        <button className='add-btn' onClick={onAddIncome}> <LuPlus className='text-lg' />  Add Income</button>
       </div>

       <div className='mt-10'>
         <CustomBarChart data={chartData} />
       </div>
      
    </div>
  )
}

export default IncomeOverview
