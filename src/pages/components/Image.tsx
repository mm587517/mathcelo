import React from 'react';

interface ImageProps {
  src: string;
}

export const Image: React.FC<ImageProps> = ({ src }) => {
  return <img src={src} alt='Image' className='w-32 h-32' />;
};

export default Image;
