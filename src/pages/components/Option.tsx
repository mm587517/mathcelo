// Option.tsx
import React, { useState, useEffect, ReactNode } from 'react';

export interface OptionProps {
  isAnswer: boolean;
  selected: boolean;
  onSelect: () => void;
  children: ReactNode;
}

const Option: React.FC<OptionProps> = ({
  isAnswer,
  selected,
  onSelect,
  children,
}) => {
  const [wasSelectedCorrectly, setWasSelectedCorrectly] = useState(false);

  useEffect(() => {
    if (selected && isAnswer) {
      setWasSelectedCorrectly(true);
    } else if (!selected) {
      setWasSelectedCorrectly(false);
    }
  }, [selected, isAnswer]);

  useEffect(() => {
    if (selected && !isAnswer) {
      const timer = setTimeout(onSelect, 2000); // Unselect after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [selected, isAnswer, onSelect]);

  const getBorderStyle = () => {
    if (wasSelectedCorrectly) {
      return 'border-green-500';
    } else if (selected) {
      if (isAnswer) {
        return 'border-green-500';
      } else {
        return 'border-red-500';
      }
    } else {
      return 'border-gray-300';
    }
  };

  return (
    <p
      className={`w-1/2 cursor-pointer border-2 p-2 rounded-md transition-all hover:scale-105 hover:bg-gray-100 ${getBorderStyle()}`}
      onClick={onSelect}
    >
      {children}
    </p>
  );
};

export default Option;
