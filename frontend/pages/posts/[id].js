import PostDetail from "../../components/[id]";  // Adjusted path for PostDetail
import axios from "../../utils/axios";  // Adjusted axios path
import requests from "../../utils/requests";  // Adjusted requests path

const Post = ({ post }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Check if the post exists */}
      {post ? (
        // Render the post details if the post exists
        <PostDetail post={post} />
      ) : (
        // Show an error message if the post doesn't exist
        <div className="text-center text-gray-500">
          <p>Post not found or an error occurred.</p>
          <button
            onClick={() => window.history.back()}  // Go back to the previous page
            className="px-6 py-2 bg-transparent border border-green-500 text-gray-800 rounded-full shadow hover:bg-gray-500 hover:text-white transition-all"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

// Fetch post data on the server-side (before rendering the page)
export const getServerSideProps = async (context) => {
  const { id } = context.params;  // Extract the ID from the URL params
  let post = null;

  try {
    // Make the request to fetch the post by ID
    const res = await axios.get(requests.fetchPost(id));
    post = res.data;  // Store the fetched post data
  } catch (error) {
    // Log any errors to the console
    console.error("Error fetching the post:", error);
  }

  // Return the post data as a prop to the component
  return {
    props: {
      post,  // Pass the post data or null if not found
    },
  };
};

export default Post;
