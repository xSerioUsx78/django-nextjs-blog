import { NextSeo } from "next-seo";
import { FaPen, FaTrashAlt, FaPlusCircle, FaClipboardList } from "react-icons/fa"; // Importing icons
import { motion } from "framer-motion"; // Importing Framer Motion
import { useRouter } from 'next/navigation';

const About = () => {

  const router = useRouter();

  return (
    <>
      <NextSeo
        title="About"
        description="Learn more about how this application allows you to create and manage posts."
      />
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-12"
          >
 <h1 className="text-4xl font-extrabold mt-[10%] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 sm:text-5xl mb-4">
  About the Post Management Application
</h1>


            <p className="mt-4 text-lg text-gray-700">
              This application allows users to create, edit, and delete posts.
              It provides an easy-to-use interface to manage your content
              efficiently.
            </p>
          </motion.div>

          {/* Description Before Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-12"
          >
            <p className="text-lg text-gray-700">
              The following features are designed to help you manage your posts
              in an easy and effective way. Whether you're creating new posts,
              editing, deleting, or organizing them, this platform makes the
              process seamless.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white shadow-xl rounded-lg p-8 hover:bg-blue-50 transition-all"
            >
              <div className="flex items-center mb-4">
                <FaPlusCircle className="text-blue-600 text-3xl mr-4" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Create <span className="bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">Posts</span>
                </h2>
              </div>
              <p className="text-lg text-gray-700">
                Users can easily create posts by entering a title and content.
                After submitting the form, the post will be added to the system.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white shadow-xl rounded-lg p-8 hover:bg-blue-50 transition-all"
            >
              <div className="flex items-center mb-4">
                <FaPen className="text-yellow-600 text-3xl mr-4" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Edit <span className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-transparent bg-clip-text">Posts</span>
                </h2>
              </div>
              <p className="text-lg text-gray-700">
                Editing a post is simple and quick. Just click the edit button,
                update the content, and save the changes to keep your post up-to-date.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white shadow-xl rounded-lg p-8 hover:bg-blue-50 transition-all"
            >
              <div className="flex items-center mb-4">
                <FaTrashAlt className="text-red-600 text-3xl mr-4" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Delete <span className="bg-gradient-to-r from-red-500 to-red-700 text-transparent bg-clip-text">Posts</span>
                </h2>
              </div>
              <p className="text-lg text-gray-700">
                If you no longer need a post, you can delete it with a single click.
                The system will ask for confirmation to ensure that you want to
                remove the post permanently.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white shadow-xl rounded-lg p-8 hover:bg-blue-50 transition-all"
            >
              <div className="flex items-center mb-4">
                <FaClipboardList className="text-green-600 text-3xl mr-4" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Manage <span className="bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text">Your Content</span>
                </h2>
              </div>
              <p className="text-lg text-gray-700">
                The platform provides you with the ability to view all your posts
                in a list, making it easier to manage and organize your content
                in one place.
              </p>
            </motion.div>
          </div>
          <button
              onClick={() =>     router.push('/')
              }
              className=" px-6 py-2 bg-transparent border border-gray-500 mt-10 text-gray-800 rounded-full shadow hover:bg-gray-500 hover:text-white transition-all"
            >
              Go Back
            </button>
        </div>
      </div>
    </>
  );
};

export default About;
