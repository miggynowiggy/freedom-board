import { FirebaseError } from 'firebase/app';

function firebaseErrorMessageMapper(errorObj: FirebaseError) {
  switch (errorObj.code) {
    case 'auth/invalid-email':
    case 'auth/invalid-password':
    case 'auth/user-not-found': {
      return 'Invalid email and password';
    }

    case 'auth/too-many-requests': {
      return 'You have reached the request limit, please try again later';
    }

    case 'auth/email-already-exists': {
      return 'Email already exists!';
    }

    case 'auth/popup-closed-by-user': {
      return 'Oopppss, you cancelled your sign in...';
    }

    default: {
      return 'Something went wrong, try again later';
    }
  }
}

export default firebaseErrorMessageMapper;
