import React, { useState } from 'react';

interface ObscureSectionProps {
  children: React.ReactNode;
}

const ObscureSection: React.FC<ObscureSectionProps> = ({ children }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div>
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded-md'
        onClick={toggleAnswer}
      >
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
      </button>
      <div
        className={`transition-all ease-in-out duration-700 overflow-hidden 
          ${showAnswer ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className='mt-4 bg-white p-4 rounded-md'>{children}</div>
      </div>
    </div>
  );
};

export default ObscureSection;
