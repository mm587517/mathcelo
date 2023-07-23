import { useState } from 'react';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import { Post, getAllPosts } from '../../util/posts';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Posts: NextPage<PageProps> = ({ posts }) => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const filteredPosts = selectedClass
    ? posts.filter((post) => post.class === selectedClass)
    : posts;

  const classes = Array.from(new Set(posts.map((post) => post.class)));

  const filteredClasses = Array.from(
    new Set(filteredPosts.map((post) => post.class))
  );

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-4'>
        <label htmlFor='classFilter' className='block font-semibold mb-2'>
          Filter by Class:
        </label>
        <select
          id='classFilter'
          value={selectedClass || ''}
          onChange={(e) => setSelectedClass(e.target.value || null)}
          className='block w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value=''>All Classes</option>
          {classes.map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>
      </div>

      {filteredClasses.map((className) => (
        <div key={className} className='mb-6'>
          <h2 className='text-2xl font-bold mb-2'>{className}</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {filteredPosts
              .filter((post) => post.class === className)
              .map((post, index) => (
                <Link href={'/posts/' + post.slug} passHref key={post.slug}>
                  <div className='group bg-gray-100 p-4 rounded-lg hover:bg-violet-500 transition-all duration-300 hover:shadow-lg transform hover:scale-105'>
                    <div className='w-full'>
                      <h3 className='text-lg font-bold group-hover:text-white'>
                        {post.title}
                      </h3>
                      <p className='text-gray-700 group-hover:text-white'>
                        {post.description}
                      </p>
                      <p className='text-sm font-semibold mt-2 text-gray-500 group-hover:text-white'>
                        {post.class}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
};

export default Posts;
