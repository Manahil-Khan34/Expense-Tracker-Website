import React from 'react'
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const ExpanceList = ({ transections, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">All Expanses</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {transections?.map((expance) => (
          <TransactionInfoCard
            key={expance._id}
            title={expance.category}
            icon={expance.icon}
            date={moment(expance.date).format('Do MMM YYYY')}
            amount={expance.amount}
            type="expance"
            onDelete={() => onDelete(expance._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpanceList
