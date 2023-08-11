// MultipleChoice.tsx
import React, { useState } from 'react';
import Option, { OptionProps } from './Option';

interface QuestionProps {
  allowMultiple?: boolean;
  children: React.ReactElement<OptionProps>[] | React.ReactElement<OptionProps>;
}

const MultipleChoice: React.FC<QuestionProps> = ({
  allowMultiple = false,
  children,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const handleSelect = (index: number, isAnswer: boolean) => {
    if (selectedOptions.includes(index)) {
      if (allowMultiple || !isAnswer) {
        setSelectedOptions(
          selectedOptions.filter((option) => option !== index)
        );
      }
    } else {
      if (allowMultiple) {
        setSelectedOptions([...selectedOptions, index]);
      } else {
        setSelectedOptions([index]);
      }
    }
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <div className='p-4'>
      {childrenArray[0]}
      <div className='ml-6'>
        {childrenArray.slice(1).map((child: any, index) => {
          return React.cloneElement(child as React.ReactElement<OptionProps>, {
            selected: selectedOptions.includes(index),
            onSelect: () => handleSelect(index, child.props.isAnswer),
          });
        })}
      </div>
    </div>
  );
};

export default MultipleChoice;
