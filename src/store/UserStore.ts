import { User } from 'firebase/auth';
import { action, makeObservable, observable, runInAction } from 'mobx';
import {
  addUser,
  loginWithEmail,
  loginWithGoogle,
  registerUser
} from '../services';
import { RootStore } from './RootStore';

export interface IUser {
  id: string;
  email: string;
  name: string;
  username: string;
  createdAt: string | Date;
  picture?: string;
}

export class UserStore {
  private rootStore: RootStore;

  @observable user: IUser | null = null;
  @observable authUser: any = null;
  @observable userList: string[] = [
    'maestrowaw',
    'salvadorwawers',
    'bruhWaw12'
  ];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @action
  setAuthUser(authUser: any) {
    runInAction(() => {
      this.authUser = authUser;
    });
  }

  @action
  setUser(user: IUser | null) {
    runInAction(() => {
      this.user = user;
    });
  }

  @action
  populateUserStore(authUser: User | null, userData: IUser) {
    runInAction(() => {
      this.authUser = authUser;
      this.user = userData;
    });
  }

  @action
  setUserList(userList: string[]) {
    runInAction(() => {
      this.userList = userList;
    });
  }

  @action
  async updatePicture(dataUrl: string) {
    // insert logic for cloud storage saving
    if (!dataUrl) {
      console.log('missing dataUrl on update picture');
      return;
    }
  }

  @action
  async login(email: string, password: string) {
    const { data, error } = await loginWithEmail(email, password);

    if (error) {
      return false;
    }

    if (data) {
      runInAction(() => {
        this.authUser = data;
      });
      return true;
    }
  }

  @action
  async googleLogin() {
    const { data, error } = await loginWithGoogle();

    if (error) {
      return error;
    }

    return data;
  }

  @action
  async register({ email, password, name, username }: any) {
    const authUser = await registerUser(email, password);
    if (authUser.data) {
      const createdUser = await addUser({
        uid: authUser.data.user.uid,
        email,
        name,
        username
      });

      if (createdUser.data) {
        runInAction(() => {
          this.authUser = authUser;
          this.user = createdUser.data as IUser;
        });
      }
    }
  }

  @action
  async registerUserData(authUser: User | null) {
    if (!authUser) {
      throw new Error('User has no auth record');
    }

    const userData = await addUser({
      uid: authUser.uid,
      email: authUser.email,
      name: authUser.displayName,
      username: authUser.displayName
    });

    if (userData.data) {
      runInAction(() => {
        this.authUser = authUser;
        this.user = userData.data as IUser;
      });
    }
  }

  @action
  async logout() {
    runInAction(() => {
      this.authUser = null;
      this.user = null;
      this.userList = [];
    });
  }
}
