import { collection } from 'firebase/firestore';
import { DB } from '../helpers/firebase';

export const usersCollection = collection(DB, 'users');
