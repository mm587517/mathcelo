import React from 'react';

interface ImageProps {
  src: string;
}

export const Image: React.FC<ImageProps> = ({ src }) => {
  return <img src={src} alt='Image' className='w-24 h-24' />;
};

export default Image;
