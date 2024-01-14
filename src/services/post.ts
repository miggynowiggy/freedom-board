import dayjs from 'dayjs';
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { DB } from 'src/helpers/firebase';
import { CPost } from 'src/types';

const collectionName = 'posts';
export const postsCollection = collection(DB, collectionName);

class PostConverter implements FirestoreDataConverter<CPost> {
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions | undefined
  ): CPost {
    const data = snapshot.data(options);
    const post = new CPost();
    post.id = snapshot.id;
    post.title = data!.title;
    post.contents = data!.contents;
    post.isAnonymous = data!.isAnonymous;
    post.createdAt = dayjs(data!.createdAt.toDate());
    post.likes = data!.likes;
    post.user = data!.user;
    return post;
  }
  toFirestore(modelObject: CPost): DocumentData {
    return {
      ...modelObject,
      createdAt: modelObject!.createdAt!.toDate()
    };
  }
}

export const postConverter = new PostConverter();

export const getPostById = async (id: string) => {
  if (!id) {
    return {
      data: null,
      error: new Error('Post ID not provided')
    };
  }

  try {
    const docRef = doc(DB, collectionName, id).withConverter(postConverter);
    const postRef = await getDoc(docRef);

    return {
      data: postRef.exists() ? postRef.data() : null,
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
      where('user', '==', uid),
      orderBy('createdAt', 'desc')
    ).withConverter(postConverter);

    const postsRef = await getDocs(postQuery);
    return {
      data: !postsRef.empty
        ? postsRef.docs.map((doc) => doc.data())
        : ([] as CPost[]),
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

export const addPost = async (Post: Partial<CPost>) => {
  try {
    const toAdd = Post;
    const finalData = await addDoc(
      postsCollection.withConverter(postConverter),
      toAdd
    );
    toAdd.id = finalData.id;
    return {
      data: toAdd,
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

export const updatePost = async (id: string, Post: Partial<CPost>) => {
  if (!id) {
    return {
      data: null,
      error: new Error('Missing Post ID')
    };
  }

  try {
    const docRef = doc(DB, collectionName, id).withConverter(postConverter);
    await updateDoc(docRef, Post);

    return {
      data: Post,
      error: null
    };
  } catch (err) {
    console.error('ERR IN UPDATE POST: ', err);
    return {
      data: null,
      error: err
    };
  }
};

export const deletePost = async (id: string) => {
  if (!id) {
    return {
      data: null,
      error: new Error('Missing Post ID')
    };
  }

  try {
    const docRef = doc(DB, collectionName, id);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error('ERR DELETING POST: ', err);
    return {
      data: null,
      error: err
    };
  }
};
