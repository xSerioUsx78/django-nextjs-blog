import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';  // For URL routing and params

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [singlePost, setSinglePost] = useState(null);  // For holding the single post data

  const router = useRouter();  // Hook to manage the router

  useEffect(() => {
    // Fetch all posts initially
    fetch('http://127.0.0.1:8000/posts/posts/')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => alert('Error fetching posts'));

    // If an ID is present in the URL (e.g., for single post), fetch that post
    if (router.query.id) {
      fetchSinglePost(router.query.id);
    }
  }, [router.query.id]);  // Dependency on router.query.id so it re-fetches when the ID changes

  const fetchSinglePost = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/posts/posts/${id}/`);
      const data = await res.json();
      setSinglePost(data);
    } catch (err) {
      alert('Error fetching single post');
    }
  };

  const handleAddPost = async () => {
    if (!newPost.title || !newPost.content) {
      alert('Title and content are required');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/posts/posts/', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: { 'Content-Type': 'application/json' },
      });
      const createdPost = await response.json();
      setPosts([createdPost, ...posts]);
      setNewPost({ title: '', content: '' });
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000); // Alert hides after 3 seconds
    } catch (error) {
      alert('Error adding post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/posts/posts/${postToDelete}/`, {
        method: 'DELETE',
      });
      setPosts(posts.filter((post) => post.id !== postToDelete));
      setPostToDelete(null);
      setShowDeleteModal(false);
    } catch (error) {
      alert('Error deleting post');
    }
  };

  return (
    <>
      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">
          Post created successfully!
        </div>
      )}

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Manage Posts</h2>
      </div>

      {/* Add New Post */}
      <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md max-w-lg mx-auto">
  <h3 className="text-xl font-semibold mb-4">Add a New Post</h3>
  <input
    type="text"
    placeholder="Post Title"
    value={newPost.title}
    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
    className="border p-2 w-full mb-4 rounded-lg bg-gray-700 text-gray-200 font-bold placeholder-gray-400"
  />
  <textarea
    placeholder="Post Content"
    value={newPost.content}
    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
    className="border p-2 w-full mb-4 rounded-lg bg-gray-700 text-gray-200 font-bold placeholder-gray-400"
  />
  <button
    onClick={handleAddPost}
    disabled={isLoading}
    className="px-4 py-2 bg-transparent border border-green-500 text-green-500 rounded-full shadow hover:bg-green-500 hover:text-white transition-all"
  >
    {isLoading ? 'Adding...' : 'Add Post'}
  </button>
</div>

      {/* Display Posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 max-w-sm mx-auto">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">{post.title}</h2>
            <p className="text-gray-700 mb-4">
              {/* Check if post.content exists before slicing */}
              {post.content ? post.content.slice(0, 150) : "No content available..."}...
            </p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => router.push(`/posts/${post.id}`)}  // Use router.push to go to the dynamic URL
                className="px-4 py-2 bg-transparent border border-blue-500 text-blue-500 rounded-full shadow hover:bg-blue-500 hover:text-white transition-all"
              >
                View
              </button>
              <button
                onClick={() => {
                  setPostToDelete(post.id);
                  setShowDeleteModal(true);
                }}
                className="px-4 py-2 bg-transparent border border-red-500 text-red-500 rounded-full shadow hover:bg-red-500 hover:text-white transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this post?</h3>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-transparent border border-gray-500 text-gray-500 rounded-full shadow hover:bg-gray-500 hover:text-white transition-all mr-4"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-transparent border border-red-500 text-red-500 rounded-full shadow hover:bg-red-500 hover:text-white transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display Single Post */}
      {singlePost && (
        <div className="container mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold">{singlePost.title}</h2>
          <p className="mt-4">{singlePost.content}</p>
        </div>
      )}
    </>
  );
};

export default Posts;
