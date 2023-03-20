import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { AUTH } from '../helpers/firebase';

export async function loginWithEmail(email: string, password: string) {
  try {
    const user = await signInWithEmailAndPassword(AUTH, email, password);
    return {
      data: user,
      error: null
    };
  } catch (err) {
    console.log('ERROR WHILE LOGGING IN: ', err);
    return { data: null, error: err };
  }
}

export async function loginWithGoogle() {
  try {
    const Google = new GoogleAuthProvider();
    const googleUser = await signInWithPopup(AUTH, Google);
    return {
      data: googleUser,
      error: null
    };
  } catch (err) {
    console.log('ERROR WHILE GOOGLE LOGIN: ', err);
    return {
      data: null,
      error: err
    };
  }
}

export async function registerUser(email: string, password: string) {
  try {
    const user = await createUserWithEmailAndPassword(AUTH, email, password);
    return {
      data: user,
      error: null
    };
  } catch (err) {
    console.log('ERROR WHILE REGISTERING USER: ', err);
    return {
      data: null,
      error: err
    };
  }
}

export async function logout() {
  try {
    await signOut(AUTH);
    return true;
  } catch (err) {
    console.log('ERROR WHILE LOGGING OUT: ', err);
    return false;
  }
}
