import React, { ReactElement, useState } from 'react';
import { OptionProps } from './Option';

interface QuestionProps {
  children: React.ReactElement<OptionProps>[] | React.ReactElement<OptionProps>;
}

const MultipleChoice: React.FC<QuestionProps> = ({
  children,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedOption(index);
  };

  const [question, ...options] = React.Children.toArray(children);

  return (
    <div className='mb-4'>
      <div className='w-full -mb-4 overflow-x-auto'>
        {question}
      </div>
      <div className='ml-8'>
        {options.map((option, index) => {
          return React.cloneElement(option as ReactElement<OptionProps>, {
            selected: selectedOption === index,
            onSelect: () => handleSelect(index),
            key: index,
          });
        })}
      </div>
    </div>
  );
};

export default MultipleChoice;
