// import React from 'react'

// const Model = ({ children, isOpen,onClose,title}) => {

//  if (!isOpen) return null

//   return (
//   <div className='fixed top-0 left-0 z-50 justify-center items-center w-full h-[calc(100%-1 rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/40 bg-opacity-500'>

//     <div className='relative p-4 max-w-2xl max-h-full w-full'>
//          {/* Model content */}
//         <div className='relative bg-white rounded-lg shadow-sm dark:bg-gray-500'>
//             {/* // model header */}
       

//     <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200 '>
//         <h3 className='text-lg font-medium text-gray-900 dark:text-white'>{title}</h3>

//         <button type='button'
//         className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer
//  '
// //         onClick={onClose}>X</button>
//     </div>
    

//     {/* //Modal Body  */}
//     <div className='p-4 md:p-5 space-y-4'>
//         {children}
//     </div>  

//   </div>
//    </div>
//     </div>
//   )
// }

// export default Model


// import React from 'react';

// const Model = ({ children, isOpen, onClose, title }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4">
        
//         {/* Modal Header */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600 dark:bg-gray-700 rounded-t">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             {title}
//           </h3>
//           <button
//             type="button"
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Modal Body */}
//         <div className="p-4 dark:bg-gray-200 dark:text-white">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Model;


import React from 'react';

const Model = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 text-black">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t">
          <h3 className="text-lg font-semibold">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 hover:text-black hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Model;
