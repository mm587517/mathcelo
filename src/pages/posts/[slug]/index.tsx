import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next/types';
import { MDXRemote } from 'next-mdx-remote';

import { Post, getAllPosts, getPostBySlug } from '../../../../util/posts';
import Button from '@/pages/components/Button';
import Image from '@/pages/components/Image';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const components = {
  Button: Button as any,
  Image: Image as any,
};

const PostPage: NextPage<PageProps> = ({ post }) => {
  return (
    <article className='prose prose-sm md:prose-base lg:prose-lg prose-slate mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8'>
      <h1 className='mt-16'>{post.title}</h1>
      <MDXRemote {...post.content} components={components} />
    </article>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  return {
    paths: posts.map((p) => {
      return {
        params: {
          slug: p.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ post: Post }> = async ({
  params,
}) => {
  const slug = params!.slug as string;
  return {
    props: {
      post: await getPostBySlug(slug),
    },
  };
};

export default PostPage;
