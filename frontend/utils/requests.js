import { endpoint } from './utils';

const requests = {
    fetchPosts: `${endpoint}posts/`,
    fetchPost: (pk) => `${endpoint}posts/${pk}/`
}

export default requests