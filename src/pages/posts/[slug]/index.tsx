import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next/types';
import { MDXRemote } from 'next-mdx-remote';
import { Button } from '@/pages/components/Button';
import { Image } from '@/pages/components/Image';
import { Post, getAllPosts, getPostBySlug } from '../../../../util/posts';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const components = {
  Button: Button as any,
  Image: Image as any,
};

const PostPage: NextPage<PageProps> = ({ post }) => {
  return (
    <div>
      <MDXRemote {...post.content} components={components} />
    </div>
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
