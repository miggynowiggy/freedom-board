import { RcFile } from 'antd/es/upload';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes
} from 'firebase/storage';
import { STORAGE } from 'src/helpers/firebase';

const profilePicFolder = 'images/users';
const postPicFolder = 'images/posts';

const profilePicRef = (filename: string) =>
  ref(STORAGE, `${profilePicFolder}/${filename}`);

const postPicRef = (filename: string) =>
  ref(STORAGE, `${postPicFolder}/${filename}`);

export const uploadProfilePicture = async (
  uid: string,
  picture: File | RcFile
) => {
  if (!uid) {
    return {
      data: null,
      error: new Error('Missing User Id')
    };
  }

  try {
    const file = picture;
    const fileExtention = file.name.split('.')[1];
    const fileName = `${uid}.${fileExtention}`;
    const mimeType = `image/${fileExtention}`;
    const picRef = postPicRef(fileName);

    await uploadBytes(picRef, file, {
      contentType: mimeType,
      customMetadata: { uid }
    });

    const downloadURL = await getDownloadURL(picRef);
    return {
      data: {
        url: downloadURL,
        filename: fileName
      },
      error: null
    };
  } catch (err) {
    console.error('ERR UPLOADING PROFILE PIC: ', err);
    return {
      data: null,
      error: err
    };
  }
};

export const deleteProfilePicture = async (fileName: string) => {
  if (!fileName) {
    return {
      data: null,
      error: new Error('Missing File name')
    };
  }

  try {
    await deleteObject(profilePicRef(fileName));
    return {
      data: true,
      error: null
    };
  } catch (err) {
    console.error('ERR DELETING PROFILE PIC: ', err);
    return {
      data: null,
      error: err
    };
  }
};

export const uploadPostPicture = async (postId: string, picture: File[]) => {
  if (!postId) {
    return {
      data: null,
      error: new Error('Missing Post Id')
    };
  }

  try {
    const file = picture[0];
    const fileExtention = file.name.split('.')[1];
    const fileName = `${postId}.${fileExtention}`;
    const mimeType = `image/${fileExtention}`;
    const picRef = profilePicRef(fileName);

    await uploadBytes(picRef, file, {
      contentType: mimeType,
      customMetadata: { postId }
    });

    const downloadURL = await getDownloadURL(picRef);
    return {
      url: downloadURL,
      filename: fileName
    };
  } catch (err) {
    console.error('ERR UPLOADING POST PIC: ', err);
    return {
      data: null,
      error: err
    };
  }
};

export const deletePostPicture = async (fileName: string) => {
  if (!fileName) {
    return {
      data: null,
      error: new Error('Missing File name')
    };
  }

  try {
    await deleteObject(profilePicRef(fileName));
    return {
      data: true,
      error: null
    };
  } catch (err) {
    console.error('ERR DELETING POST PIC: ', err);
    return {
      data: null,
      error: err
    };
  }
};
