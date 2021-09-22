import Header from '../components/Header';
import Posts from '../components/Posts';
import axios from '../utils/axios';
import requests from '../utils/requests';


export default function Home({posts}) {
  return (
    <div className="container mx-auto mt-8 px-2">
      <Header />
      <Posts posts={posts} />
    </div>
  )
}


export const getServerSideProps = async () => {
  let posts = [];
  try {
    const res = await axios.get(`${requests.fetchPosts}`);
    posts = res.data;
  } catch(e) {};
  return {
    props: {
      posts
    }
  }
}


// export const getStaticProps = async () => {
//   const res = await axios.get(`${requests.fetchPosts}`);
//   const posts = res.data;
//   return {
//     props: {
//       posts
//     }
//   }
// }

// export const getStaticPaths = async () => {
//   const res = await axios.get(`${requests.fetchPosts}`);
//   const posts = res.data;
//   const paths = posts.map((post) => ({
//     params: {id: post.id}
//   }));
//   return {
//     paths, fallback: true
//   }
// }