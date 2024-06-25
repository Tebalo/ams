
// components/PulaSign.tsx

import React from 'react';

interface PulaSignProps {
  className?: string;
}

export const PulaSign: React.FC<PulaSignProps> = ({ className = '' }) => {
  return (
    <span className={`font-semibold ${className}`}>
      P
    </span>
  );
};