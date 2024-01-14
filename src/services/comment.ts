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
  getDocs,
  orderBy,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { DB } from 'src/helpers/firebase';
import { CComment } from 'src/types';

const collectionName = 'comments';
export const commentsCollection = collection(DB, collectionName);

class CommentConverter implements FirestoreDataConverter<CComment> {
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions | undefined
  ): CComment {
    const data = snapshot.data(options);
    const comment = new CComment();
    comment.id = snapshot.id;
    comment.content = data!.content;
    comment.createdAt = dayjs(data!.createdAt.toDate());
    comment.likes = data!.likes;
    comment.post = data!.post;
    comment.user = data!.user;
    return comment;
  }
  toFirestore(modelObject: CComment): DocumentData {
    return {
      ...modelObject,
      createdAt: modelObject!.createdAt!.toDate()
    };
  }
}

export const commentConverter = new CommentConverter();

export const getCommentsByPost = async (postId: string) => {
  if (!postId) {
    return {
      data: null,
      error: new Error('Missing Post Id')
    };
  }

  try {
    const queryRef = query(
      commentsCollection,
      where('post', '==', postId),
      orderBy('createdAt', 'desc')
    ).withConverter(commentConverter);

    const posts = await getDocs(queryRef);

    return {
      data: !posts.empty ? posts.docs.map((x) => x.data()) : ([] as CComment[]),
      error: null
    };
  } catch (err) {
    console.error('ERR IN GETTING COMMENTS: ', err);
    return {
      data: null,
      error: err
    };
  }
};

export const addComment = async (comment: CComment) => {
  try {
    const toAdd = comment;

    const finalData = await addDoc(
      commentsCollection.withConverter(commentConverter),
      toAdd
    );

    toAdd.id = finalData.id;

    return {
      data: toAdd,
      error: null
    };
  } catch (err) {
    console.error('ERR ADDING COMMENT: ', err);
    return {
      data: null,
      error: err
    };
  }
};

export const updateComment = async (id: string, comment: Partial<CComment>) => {
  if (!id) {
    return {
      data: null,
      error: new Error('Missing Comment Id')
    };
  }

  try {
    const docRef = doc(DB, collectionName, id).withConverter(commentConverter);
    await updateDoc(docRef, comment);

    return {
      data: comment,
      error: null
    };
  } catch (err) {
    console.error('ERR UPDATING COMMENT: ', err);
    return {
      data: null,
      error: err
    };
  }
};

export const deleteComment = async (id: string) => {
  if (!id) {
    return {
      data: null,
      error: new Error('Missing Comment Id')
    };
  }

  try {
    const docRef = doc(DB, collectionName, id);
    await deleteDoc(docRef);

    return {
      data: true,
      error: null
    };
  } catch (err) {
    console.error('ERR DELETING COMMENT: ', err);
    return {
      data: null,
      error: err
    };
  }
};
