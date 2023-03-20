import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { dayjs } from '../helpers/date';
import { DB } from '../helpers/firebase';

const collectionName = 'users';
export const usersCollection = collection(DB, collectionName);

export const addUser = async ({ email, uid, name, username }: any) => {
  try {
    const docRef = doc(DB, collectionName, uid);
    const data = {
      email,
      name,
      username,
      createdAt: dayjs().format('x')
    };
    await setDoc(docRef, data);
    return {
      data,
      error: null
    };
  } catch (err) {
    console.log('ERR IN ADD USER: ', err);
    return {
      data: null,
      error: err
    };
  }
};

export const updateUser = async ({
  id,
  email,
  username,
  name,
  picture
}: any) => {
  try {
    const docRef = doc(DB, collectionName, id);
    await updateDoc(docRef, {
      email,
      username,
      name,
      picture
    });
    const updatedDoc = await getDoc(docRef);
    if (updatedDoc.exists()) {
      const data = Object.assign(
        {},
        { id: updatedDoc.id },
        { ...updatedDoc.data() }
      );
      return {
        data,
        error: null
      };
    }
  } catch (err) {
    console.log('ERR IN UPDATE USER: ', err);
    return {
      data: null,
      error: err
    };
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const docRef = doc(DB, collectionName, userId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.log('ERR IN DELETE USER: ', err);
    return false;
  }
};
