import React, { useEffect, useState } from 'react';
import { LuPlus } from "react-icons/lu";
import { prepareExpanceLineChartData } from '../../utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpanceOverview = ({ transactions, onExpanceIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpanceLineChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
   <div className='card'>
    <div className='flex items-center justify-between'>
        <div className=''>
            <h5 className='text-lg'>Expense Overview</h5>
            <p className='text-xs text-gray-400 mt-0.5'> Track Your Spending trends over time and agin inshights into whare your money goes.</p>
        </div>

     <button className='add-btn' onClick={onExpanceIncome}>
        <LuPlus className='text-lg' />
        Add Expense
     </button>
    </div>

    <div className='mt-10'>
        <CustomLineChart data={chartData} />
    </div>
 
   </div>
  );
};

export default ExpanceOverview;
