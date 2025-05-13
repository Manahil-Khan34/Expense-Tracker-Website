import React from 'react'
import CustomPiChart from '../Charts/CustomPiChart';


const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];


const FinanceOverview = ({ totalBalance, totalIncome, totalExpance }) => {


    const BalanceData = [
        {
            name: "Total Balance", amount: totalBalance,

        },
        {
            name: "Total Income",
            amount: totalIncome,
        },
        {
            name: "Total Expense",
            amount: totalExpance,
        }
    ];
  return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>
                    Finance Overview
                </h5>
            </div>
            <CustomPiChart
                data={BalanceData}
                label="Total Balance"
                totalAmount={`${totalBalance}`}
                colors={COLORS}
                showTextAnchor={true} />
        </div>
    )
}

export default FinanceOverview
