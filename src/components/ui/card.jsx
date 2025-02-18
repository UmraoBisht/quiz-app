import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div className={`w-full max-w-md p-4 shadow-lg rounded-2xl bg-white ${className}`}>
      {children}
    </div>
  );
};

export default Card;