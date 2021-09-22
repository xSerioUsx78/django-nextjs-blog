import PostDetail from "../../components/Post";
import axios from '../../utils/axios';
import requests from '../../utils/requests';


const Post = ({post}) => {
  return (
    <div className="container mx-auto px-2 mt-6">
      <PostDetail post={post} />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  let post = {};
  try {
    const res = await axios.get(`${requests.fetchPost(id)}`);
    post = res.data;
  } catch(e) {console.log(e)};
  return {
    props: {
      post
    }
  }
}

export default Post;