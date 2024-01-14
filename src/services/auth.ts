import {
  GoogleAuthProvider,
  Unsubscribe,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { AUTH } from 'src/helpers/firebase';

const EnabledOAuthProviders = ['google'];

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

export async function sendPasswordReset(email: string) {
  try {
    await sendPasswordResetEmail(AUTH, email);
    return true;
  } catch (err) {
    console.error('ERR WHILE SENDING PASSWORD RESET: ', err);
    return false;
  }
}

export function initializeAuthSubscriber(
  onUserChange: (authUser: User | null) => Promise<unknown>
) {
  try {
    const subscriber = onAuthStateChanged(AUTH, async (user) => {
      await onUserChange(user);
    });
    return subscriber;
  } catch (err) {
    console.error('ERR INITIALIZING AUTH SUB: ', err);
    return null;
  }
}

export function unsubscribeAuth(subscribe: Unsubscribe) {
  subscribe();
  return true;
}

export const extractOAuthProviders = (authUser: User) => {
  return authUser.providerData.map((x) => x.providerId.replace('.com', ''));
};

export const isOAuth = (authUser: User) => {
  const providers = extractOAuthProviders(authUser);
  return providers.some((x) => EnabledOAuthProviders.includes(x));
};
