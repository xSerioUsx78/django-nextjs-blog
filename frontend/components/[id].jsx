import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const BASE_URL = 'http://127.0.0.1:8000/posts/api/posts/';

const PostDetails = ({ post }) => {
  const router = useRouter();

  // Debug: Log post data when component loads
  useEffect(() => {
    console.log("Post Data in Component:", post);
  }, [post]);

  if (router.isFallback) {
    return <p className="text-center text-gray-500">Loading post...</p>;
  }

  if (!post) {
    return <p className="text-center text-red-500">Post not found</p>;
  }

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

// Fetch Data for Each Post
export async function getStaticProps({ params }) {
  try {
    console.log("Fetching post for ID:", params.id); // Debugging

    const res = await fetch(`${BASE_URL}${params.id}/`);
    
    if (!res.ok) {
      console.error("Failed to fetch post:", res.status);
      return { notFound: true };
    }

    const post = await res.json();
    console.log("Fetched post:", post); // Debugging

    return { props: { post }, revalidate: 10 };
  } catch (error) {
    console.error("Error fetching post:", error);
    return { notFound: true };
  }
}

// Generate Paths for Dynamic Routes
export async function getStaticPaths() {
  try {
    const res = await fetch(BASE_URL);
    const posts = await res.json();

    const paths = posts.map((post) => ({
      params: { id: post.id.toString() },
    }));

    return { paths, fallback: false };
  } catch (error) {
    console.error("Error fetching paths:", error);
    return { paths: [], fallback: false };
  }
}

export default PostDetails;
