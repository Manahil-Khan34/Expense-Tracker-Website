// import React from 'react'
// import { PieChart,
//      Pie, 
//      Cell,
//      Tooltip,
//       ResponsiveContainer ,
//     Legend} from 'recharts';
// import CustomTooltip from './CustomTooltip';
// import CustomLegend from './CustomLegend';

// const CustomPiChart = ({
//     data,
//     label,
//     totalAmount,
//     colors,
//     showTextAnchor 
// }) => {
//   return (
//   <ResponsiveContainer width="100%" height={380}>
//     <PieChart>
//       <Pie
//         data={data}
//         dataKey="amount"
//         nameKey="name"
//         cx="50%"
//         cy="50%"
//         outerRadius={130}
//         innerRadius={100}
//         labelLine={false} >

       
//         {data.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={ colors[index % colors.length]
//            } />
//         ))}
//       </Pie>
//       <Tooltip content={CustomTooltip} />
//       <Legend content={CustomLegend}/>

//      {showTextAnchor && (
//         <>
//         <text
//         x="50%"
//         y="50%"
//         dy={`-25`}
//         textAnchor="middle"
//         fill='#666'
//         fontSize="14px">
//             {label}
//         </text>
//         <text

//         x="50%"
//         y="50%" 
//         dy={8}
//         textAnchor='middle'
//         fill='#333'
//         fontSize="24px"
//         fontWeight="semi-bold">
//             {totalAmount}
//         </text>
// </>
//      )}


//     </PieChart>
//     </ResponsiveContainer>
// )};

// export default CustomPiChart




import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPiChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: 380 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>

      {showTextAnchor && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 14, color: '#666' }}>{label}</div>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>
            ${totalAmount}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomPiChart;
