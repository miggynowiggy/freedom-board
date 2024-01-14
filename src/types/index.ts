import dayjs, { Dayjs } from 'dayjs';

export class CUser {
  id: string = '';
  uid: string = '';
  email: string = '';
  name: string = '';
  username: string = '';
  createdAt: Dayjs = dayjs();
  picture: string = '';
  pictureFilename: string = '';
}

export class CPost {
  id: string = '';
  title: string = '';
  contents: string = '';
  isAnonymous: boolean = false;
  createdAt: Dayjs = dayjs();
  likes: string[] = [];
  user: CUser['uid'] = '';
}

export class CComment {
  id: string = '';
  content: string = '';
  likes: string[] = [];
  user: CUser['uid'] = '';
  post: CPost['id'] = '';
  createdAt: Dayjs = dayjs();
}

export class CompleteComment extends CComment {
  userData: CUser = new CUser();
  postData: CPost = new CPost();
}

export class CompletePost extends CPost {
  userData: CUser = new CUser();
  commentsData: CompleteComment[] = [];
}
