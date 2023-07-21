import Link from 'next/link';

export const Header = () => {
  return (
    <div className='flex justify-between items-center p-4 bg-violet-700'>
      <div>
        <Link href='/'>
          <h1 className='text-3xl font-bold text-white'>mathcelo</h1>
        </Link>
      </div>
      <div className='ml-auto'>
        <p className='text-xl font-bold text-white mr-2'>
          <Link href='/posts'>Apuntes</Link>
        </p>
      </div>
    </div>
  );
};
