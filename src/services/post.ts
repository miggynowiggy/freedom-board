import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { DB } from '../helpers/firebase';
import { IPost } from '../store/PostStore';

const collectionName = 'posts';
export const postsCollection = collection(DB, 'posts');

export const getPostById = async (id: string) => {
  if (!id) {
    return {
      data: null,
      error: new Error('Post ID not provided')
    };
  }

  try {
    const docRef = doc(DB, collectionName, id);
    const postRef = await getDoc(docRef);

    if (!postRef.exists()) {
      return {
        data: null,
        error: null
      };
    }

    const postData = {
      id: postRef.id,
      ...postRef.data()
    };

    return {
      data: postData,
      error: null
    };
  } catch (err) {
    console.error('ERR GETTING POST BY ID: ', err);
    return {
      data: null,
      error: err
    };
  }
};

export const getPostsByUser = async (uid: string) => {
  if (!uid) {
    return {
      data: null,
      error: new Error('User ID not provided')
    };
  }

  try {
    const postQuery = query(
      postsCollection,
      where('uid', '==', uid),
      orderBy('createdAt', 'desc')
    );

    const postsRef = await getDocs(postQuery);
    if (postsRef.empty) {
      return {
        data: [] as IPost[],
        error: null
      };
    }

    const posts = postsRef.docs.map((x) => ({ id: x.id, ...x.data() }));
    return {
      data: posts,
      error: null
    };
  } catch (err) {
    console.error('ERR GETTING POSTS BY USER: ', err);
    return {
      data: null,
      error: err
    };
  }
};

export const addPost = async (Post: Partial<IPost>) => {
  try {
    const postData = {
      user: Post.user,
      createdAt: Post.createdAt,
      title: Post.title,
      content: Post.content,
      isAnonymous: Post.isAnonymous,
      likes: [],
      comments: []
    };

    const finalData = await addDoc(postsCollection, postData);

    return {
      data: {
        id: finalData.id,
        ...postData
      },
      error: null
    };
  } catch (err) {
    console.error('ERR IN ADDING POST: ', err);
    return {
      data: null,
      error: err
    };
  }
};

export const updatePost = async (id: string, Post: Partial<IPost>) => {
  try {
    const docRef = doc(DB, collectionName, id);
    await updateDoc(docRef, Post);
  } catch (err) {
    console.error('ERR IN UPDATE POST: ', err);
    return {
      data: null,
      error: err
    };
  }
};
