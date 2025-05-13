import React from 'react';
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete
}) => {
  const getAmountStyles = () => 
    type === 'income' ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";
  
  return (
    <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60'>
      <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-200 rounded-full'>
        {icon ? (
          <img src={icon} alt={title} className='w-6 h-6' />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className=' flex-1 flex  items-center justify-between'>
        <div>
          <p className='text-sm text-gray-700 font-medium'>{title}</p>
          <p className='text-xs text-gray-400 mt-1'>{date}</p>
        </div>
        <div className='flex items-center gap-2'>
          {!hideDeleteBtn && (
            <button className='text-gray-400 hover:bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer
' onClick={onDelete}>
              <LuTrash2 size={18} />
            </button>
          )}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>

            <h6 className='text-xs font-medium'>
              {type === 'income' ? '+' : '-'}${amount}
            </h6>
            {type === 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>

        </div>

      </div>

       

    </div>
  );
};

export default TransactionInfoCard;


// import React from 'react';
// import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from "react-icons/lu";

// const TransactionInfoCard = ({
//   title,
//   icon,
//   date,
//   amount,
//   type,
//   hideDeleteBtn
// }) => {
//   return (
//     <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60 bg-white shadow-sm'>
//       {/* Icon */}
//       <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-200 rounded-full'>
//         {icon ? (
//           <img src={icon} alt={title} className='w-6 h-6' />
//         ) : type === 'income' ? (
//           <LuTrendingUp className='text-green-600' />
//         ) : type === 'expense' ? (
//           <LuTrendingDown className='text-red-600' />
//         ) : (
//           <LuUtensils />
//         )}
//       </div>

//       {/* Title & Date */}
//       <div className='flex-1'>
//         <h4 className='text-sm font-medium text-gray-800'>{title}</h4>
//         <p className='text-xs text-gray-500'>{date}</p>
//       </div>

//       {/* Amount */}
//       <div className={`text-sm font-semibold ${type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
//         {type === 'expense' ? '-' : '+'}${amount}
//       </div>

//       {/* Delete Button (conditionally hidden) */}
//       {!hideDeleteBtn && (
//         <button className='invisible group-hover:visible absolute top-2 right-2 text-red-500 hover:text-red-600'>
//           <LuTrash2 />
//         </button>
//       )}
//     </div>
//   );
// };

// export default TransactionInfoCard;

