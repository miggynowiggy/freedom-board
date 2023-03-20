import { collection } from 'firebase/firestore';
import { DB } from '../helpers/firebase';

export const postsCollection = collection(DB, 'posts');
