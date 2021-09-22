import { NextSeo } from "next-seo";


const Post = ({ post }) => {
  return (
    <>
      <NextSeo title={post.title} description={post.content} />
      <h1 className="text-blue-400 font-bold text-2xl mb-10 text-center">{post.title}</h1>
      <div className="md:px-60">
        <p className="text-justify">{post.content}</p>
      </div>
    </>
  );
}
 
export default Post;