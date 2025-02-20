import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// This function is used to tell Next.js which paths to pre-render at build time
export async function getStaticPaths() {
  // Fetch all posts to get the dynamic IDs
  const res = await fetch('http://127.0.0.1:8000/posts/api/posts/');
  const posts = await res.json();

  // Generate a list of paths for each post
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() }, // Ensure the id is a string
  }));

  // Return the paths and set fallback to false (other paths will 404)
  return { paths, fallback: false };
}

// This function fetches data for each individual post
export async function getStaticProps({ params }) {
  const res = await fetch(`http://127.0.0.1:8000/posts/api/posts/${params.id}/`);
  const post = await res.json();

  // Return the post data as props to the component
  return { props: { post } };
}

const PostDetails = ({ post }) => {
  // If post is not available (fallback), show a loading message
  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">{post.title}</h1>
      <p className="text-gray-800 text-lg">{post.content}</p>
      <button
        onClick={() => router.back()}
        className="mt-6 px-6 py-2 bg-transparent border border-gray-500 text-gray-800 rounded-full shadow hover:bg-gray-500 hover:text-white transition-all"
      >
        Go Back
      </button>
    </div>
  );
};

export default PostDetails;
