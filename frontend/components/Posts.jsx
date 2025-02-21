import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; // Import Axios
import { FaTrash, FaEye, FaPlus } from 'react-icons/fa'; // React Icons
import { motion } from 'framer-motion'; // Framer Motion

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [singlePost, setSinglePost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const router = useRouter();
  const API_URL = "http://127.0.0.1:8000/posts/api/posts/"

  useEffect(() => {
    // Fetch all posts initially using Axios
    axios
      .get(API_URL)
      .then((response) => setPosts(response.data))
      .catch((err) => alert('Error fetching posts'));

    // If an ID is present in the URL, fetch the single post
    if (router.query.id) {
      fetchSinglePost(router.query.id);
    }
  }, [router.query.id]);

  const fetchSinglePost = async (id) => {
    try {
      const response = await axios.get(`${API_URL}${id}/`);
      setSinglePost(response.data);
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
      const response = await axios.post(API_URL, newPost, {
        headers: { 'Content-Type': 'application/json' },
      });
      setPosts([response.data, ...posts]);
      setNewPost({ title: '', content: '' });
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    } catch (error) {
      alert('Error adding post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}${postToDelete}/`);
      setPosts(posts.filter((post) => post.id !== postToDelete));
      setPostToDelete(null);
      setShowDeleteModal(false);
    } catch (error) {
      alert('Error deleting post');
    }
  };

  // Logic for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(posts.length / postsPerPage)));

  return (
    <>
      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">
          Post created successfully!
        </div>
      )}

      <div className="my-12 sm:my-16 md:my-20 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Manage Posts
        </h2>
      </div>

      {/* Add New Post */}
      <div className="mb-6 p-6 bg-white border w-full md:w-[70%] lg:w-[55%] border-gray-300 rounded-lg shadow-md mx-auto text-center">
        <h3 className="text-2xl font-bold mb-6">Add a New Post</h3>

        {/* Input Wrapper */}
        <div className="w-full md:w-[70%] mx-auto">
          <input
            type="text"
            placeholder="Post Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="border-2 p-3 w-full mb-4 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 placeholder:text-lg placeholder:font-semibold focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-lg transition-all"
          />
          <textarea
            placeholder="Post Content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className="border-2 p-3 w-full mb-4 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 placeholder:text-lg placeholder:font-semibold focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-lg transition-all"
          />
        </div>

        <motion.button
          onClick={handleAddPost}
          disabled={isLoading}
          className="px-6 py-3 bg-transparent border border-green-500 text-green-500 rounded-full shadow-md hover:bg-green-500 hover:text-white transition-all mt-4"
          whileHover={{ scale: 1.02 }}
        >
          {isLoading ? 'Adding...' : 'Add Post'} <FaPlus className="inline-block ml-2" />
        </motion.button>
      </div>

      {/* Display Posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {currentPosts.map((post) => (
          <motion.div
            key={post.id}
            className="bg-slate-100 shadow-xl rounded-lg p-6 border border-gray-300 max-w-sm mx-auto"
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.1 }}
          >
            <h2 className="text-xl font-bold text-slate-600 mb-4">{post.title}</h2>
            <p className="text-slate-800 mb-4">
              {post.content ? post.content.slice(0, 150) : 'No content available...'}...
            </p>
            <div className="flex justify-between items-center">
              <motion.button
                onClick={() => router.push(`/posts/${post.id}/`)}
                className="px-4 py-2 bg-transparent border border-blue-500  rounded-md shadow-sm hover:shandow-md  transition-all"
                
              >
                View 
              </motion.button>
              <motion.button
                onClick={() => {
                  setPostToDelete(post.id);
                  setShowDeleteModal(true);
                }}
                className="px-4 py-2 bg-transparent border border-black text-slate-900 rounded-md shadow-sm  hover:shandow-md transition-all"
              >
                Delete 
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {/* Previous Button */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 border border-gray-300 rounded-full hover:bg-gray-200 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-black'}`}
        >
          {'<<'}
        </button>

        {/* Page Number Buttons */}
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-1 border border-gray-300 rounded-full hover:bg-gray-200 ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'text-black'
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
          className={`px-4 py-2 mx-1 border border-gray-300 rounded-full hover:bg-gray-200 ${currentPage === Math.ceil(posts.length / postsPerPage) ? 'text-gray-400 cursor-not-allowed' : 'text-black'}`}
        >
          {'>>'}
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this post?</h3>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-transparent border border-gray-500 text-gray-500 rounded-full shadow-md hover:bg-gray-500 hover:text-white transition-all mr-4"
              >
                Cancel
              </button>
              <motion.button
                onClick={handleDelete}
                className="px-4 py-2 bg-transparent border border-red-500 text-red-500 rounded-full shadow-md hover:bg-red-500 hover:text-white transition-all"
                whileHover={{ scale: 1.1 }}
              >
                Confirm
              </motion.button>
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
