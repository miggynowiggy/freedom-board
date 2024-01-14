import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore';
import { dayjs } from 'src/helpers/date';
import { DB } from 'src/helpers/firebase';
import { CUser } from 'src/types';

const collectionName = 'users';
export const usersCollection = collection(DB, collectionName);

class UserConverter implements FirestoreDataConverter<CUser> {
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions | undefined
  ): CUser {
    const data = snapshot.data(options);
    const user = new CUser();
    user.id = snapshot.id;
    user.uid = data!.uid;
    user.email = data!.email;
    user.name = data!.name;
    user.username = data!.username;
    user.picture = data!.picture;
    user.pictureFilename = data!.pictureFilename;
    user.createdAt = dayjs(data!.createdAt.toDate());
    return user;
  }
  toFirestore(modelObject: CUser): DocumentData {
    return {
      ...modelObject,
      id: modelObject.uid,
      createdAt: modelObject!.createdAt!.toDate()
    };
  }
}

export const userConverter = new UserConverter();

export const getUserByUID = async (uid: string) => {
  if (!uid) {
    return {
      data: null,
      error: new Error('User not found')
    };
  }

  try {
    const docRef = doc(DB, collectionName, uid).withConverter(userConverter);
    const userRef = await getDoc(docRef);

    if (!userRef.exists()) {
      return {
        data: null,
        error: new Error('User not found')
      };
    }

    const userData = userRef.data();
    return {
      data: userData,
      error: null
    };
  } catch (err) {
    console.log('ERR IN FINDING USER BY UID: ', err);
    return {
      data: null,
      error: err
    };
  }
};

export const getAllUsers = async () => {
  try {
    const users = await getDocs(usersCollection.withConverter(userConverter));
    return {
      data: !users.empty ? users.docs.map((x) => x.data()) : ([] as CUser[]),
      error: null
    };
  } catch (err) {
    console.error('ERR GETTING ALL USERS: ', err);
    return {
      data: null,
      error: err
    };
  }
};

export const searchUser = async (searchTerm: string) => {
  try {
    const arraySearchTerm = searchTerm.split(' ');

    const queryRef = query(
      usersCollection,
      where('name', 'in', arraySearchTerm),
      where('username', 'in', arraySearchTerm)
    ).withConverter(userConverter);

    const users = await getDocs(queryRef);

    return {
      data: !users.empty ? users.docs.map((x) => x.data()) : ([] as CUser[]),
      error: null
    };
  } catch (err) {
    console.error('ERR SEARCHING FOR USER: ');
    return {
      data: null,
      error: err
    };
  }
};

export const addUser = async ({
  email,
  uid,
  name,
  username,
  photo = ''
}: Record<string, string>) => {
  try {
    const docRef = doc(DB, collectionName, uid);

    const data = new CUser();
    data.uid = uid;
    data.name = name;
    data.email = email;
    data.username = username;
    data.picture = photo;

    await setDoc(docRef, {
      ...data,
      createdAt: data.createdAt.toDate()
    });

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

export const updateUser = async (id: string, user: Partial<CUser>) => {
  if (!id) {
    return {
      data: null,
      error: new Error('Missing User Id')
    };
  }

  try {
    const docRef = doc(DB, collectionName, id).withConverter(userConverter);
    await updateDoc(docRef, {
      ...user,
      createdAt: user.createdAt?.toDate()
    });

    const updatedDoc = await getDoc(docRef);
    return {
      data: updatedDoc.exists() ? updatedDoc.data() : null,
      error: null
    };
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
    return {
      data: true,
      error: null
    };
  } catch (err) {
    console.log('ERR IN DELETE USER: ', err);
    return {
      data: null,
      error: err
    };
  }
};
