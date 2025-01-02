import { NextSeo } from "next-seo";

const About = () => {
  return (
    <>
      <NextSeo
        title="About"
        description="Learn more about how this application allows you to create and manage posts."
      />
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              About the Post Management Application
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              This application allows users to create, edit, and delete posts.
              It provides an easy-to-use interface to manage your content
              efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white shadow-xl rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Posts</h2>
              <p className="text-lg text-gray-700">
                Users can easily create posts by entering a title and content.
                After submitting the form, the post will be added to the system.
              </p>
            </div>
            <div className="bg-white shadow-xl rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Posts</h2>
              <p className="text-lg text-gray-700">
                Editing a post is simple and quick. Just click the edit button,
                update the content, and save the changes to keep your post up-to-date.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div className="bg-white shadow-xl rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Delete Posts</h2>
              <p className="text-lg text-gray-700">
                If you no longer need a post, you can delete it with a single click.
                The system will ask for confirmation to ensure that you want to
                remove the post permanently.
              </p>
            </div>
            <div className="bg-white shadow-xl rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Manage Your Content</h2>
              <p className="text-lg text-gray-700">
                The platform provides you with the ability to view all your posts
                in a list, making it easier to manage and organize your content
                in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
