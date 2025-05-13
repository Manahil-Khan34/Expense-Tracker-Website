import React from 'react';
import { getInitials } from '../../utils/helper';

const CharAvatar = ({ fulName, height, width, style }) => {
  return (
    <div className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''}
    text-gray-900 font-medium rounded-full flex items-center justify-center bg-gray-100`}>
      {getInitials(fulName || "")}
    </div>
  );
};

export default CharAvatar;
