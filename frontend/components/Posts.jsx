import Link from 'next/link';


const Posts = ({posts}) => {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-2xl text-center font-semibold">Latest Posts</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="
          relative
          rounded-xl
          shadow-md
          transition 
          duration-300 
          p-4 
          border 
          border 
          border-gray-600
          hover:border-blue-400">
            <h2 className="text-lg text-blue-400 text-bold mb-2">{post.title}</h2>
            <p>{post.content}</p>
            <Link href={`/posts/${post.id}`} >
              <a className="absolute w-full h-full top-0 left-0"></a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
 
export default Posts;