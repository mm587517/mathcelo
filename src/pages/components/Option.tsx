import React, { ReactNode, FC } from 'react';

export interface OptionProps {
  isAnswer: boolean;
  selected: boolean;
  onSelect: () => void;
  children: ReactNode;
}

const Option: FC<OptionProps> = ({ isAnswer, selected, onSelect, children }) => {
  const bubbleColor = selected
    ? isAnswer ? 'bg-emerald-400' : 'bg-rose-400'
    : 'bg-gray-200';

  // Hover effect changes the background to a light blue
  const hoverEffect = 'hover:bg-blue-200';

  return (
    <div className="flex items-center space-x-2">
      <div
        className={`
          h-6 w-6
          rounded-full
          cursor-pointer
          transition duration-300 ease-in-out
          mr-2
          mt-2 mb-2
          ${bubbleColor}
          ${hoverEffect}
        `}
        onClick={onSelect}
        aria-selected={selected}
      />
      <span className="select-none text-gray-700">{children}</span>
    </div>
  );
};

export default Option;

