import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PostDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Get the post ID from the route
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/posts/posts/${id}/`)
        .then((res) => res.json())
        .then((data) => setPost(data))
        .catch((err) => alert('Error fetching post'));
    }
  }, [id]);

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
