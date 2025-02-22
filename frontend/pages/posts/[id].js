import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';

const BASE_URL = 'http://127.0.0.1:8000/posts/api/posts/';

const PostDetails = ({ post }) => {
  const router = useRouter();

  // Log post data in console
  useEffect(() => {
    console.log("Fetched Post Data:", post);
  }, [post]);

  // Show loading spinner while waiting for data
  if (router.isFallback) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="primary" size={80} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-red-500 text-lg">Post not found</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-3xl w-full p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-5xl font-extrabold text-indigo-600 mb-6">{post.title}</h1>
        <p className="text-gray-700 text-lg leading-relaxed">{post.content}</p>
        <button
          onClick={() => router.back()}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-all"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

// Fetch data for individual post
export async function getStaticProps({ params }) {
  try {
    console.log("Fetching post for ID:", params.id);
    const res = await fetch(`${BASE_URL}${params.id}/`);
    
    if (!res.ok) {
      console.error("Failed to fetch post:", res.status);
      return { notFound: true };
    }

    const post = await res.json();
    console.log("Post Data:", post);

    return { props: { post }, revalidate: 10 };
  } catch (error) {
    console.error("Error fetching post:", error);
    return { notFound: true };
  }
}

// Generate dynamic paths for pre-rendering
export async function getStaticPaths() {
  try {
    const res = await fetch(BASE_URL);
    const posts = await res.json();

    const paths = posts.map((post) => ({ params: { id: post.id.toString() } }));
    return { paths, fallback: true };
  } catch (error) {
    console.error("Error fetching paths:", error);
    return { paths: [], fallback: true };
  }
}

export default PostDetails;
