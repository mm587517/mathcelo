import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import Link from 'next/link';

export default function Home() {
  const blogDir = 'posts';

  const files = fs.readdirSync(path.join(blogDir));

  const posts = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(blogDir, filename), 'utf-8');

    const { data: frontMatter } = matter(fileContent);

    return {
      meta: frontMatter,
      slug: filename.replace('.mdx', ''),
    };
  });

  return (
    <div className='mt-4 max-w-lg mx-auto container flex justify-center items-center'>
      {posts.map((blog) => (
        <Link href={'/posts/' + blog.slug} passHref key={blog.slug}>
          <div className='flex justify-between items-center gap-2 bg-gray-100 p-4 rounded hover:bg-violet-500 hover:text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105'>
            <div className='w-full'>
              <h3 className='text-lg font-bold'>{blog.meta.title}</h3>
              <p className='hover:text-white'>{blog.meta.description}</p>
              <p className='text-sm font-semibold hover:text-white'>
                {blog.meta.class}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
