import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'
 
const ExpanseTransactions = ({transactions, onSeeMore}) => {
  console.log(transactions);
  return (
    <div className='card'>
     <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Expansess</h5>

        <button className='card-btn' onClick={onSeeMore}>See All <LuArrowRight className='text-base' /> </button>
     </div>
     <div className='mt-6'>
      
     {transactions?.slice(0,4)?.map((expance) =>(
        <TransactionInfoCard
        key={expance._id}
        title={expance.category}
        icon={expance.icon}
        date={moment(expance.date).format("Do MMM YYYY")}
        amount={expance.amount}
        type="expance"
        hideDeleteBtn />
     ))}
     </div>
    </div>
  )
}

export default ExpanseTransactions
