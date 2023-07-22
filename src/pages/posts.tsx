import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import { Post, getAllPosts } from '../../util/posts';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Posts: NextPage<PageProps> = ({ posts }) => {
  return (
    <div>
      <div>
        {posts.map((post, index) => {
          return (
            <Link href={'/posts/' + post.slug} passHref key={post.slug}>
              <div
                key={index}
                className='flex justify-between items-center gap-2 bg-gray-100 p-4 rounded hover:bg-violet-500 hover:text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105'
              >
                <div className='w-full'>
                  <h3 className='text-lg font-bold'>{post.title}</h3>
                  <p className='hover:text-white'>{post.description}</p>
                  <p className='text-sm font-semibold hover:text-white'>
                    {post.class}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
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
