import { RcFile } from 'antd/es/upload';
import { Unsubscribe, User } from 'firebase/auth';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction
} from 'mobx';
import {
  addUser,
  getUserByUID,
  initializeAuthSubscriber,
  isOAuth,
  logout,
  registerUser,
  unsubscribeAuth,
  updateUser,
  uploadProfilePicture
} from 'src/services';
import { CUser } from 'src/types';
import { RootStore } from './RootStore';

export class UserStore {
  private rootStore: RootStore;

  @observable user: CUser = new CUser();
  @observable authUser: User | null = null;
  @observable authSubscriber: Unsubscribe | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @computed
  get isLoggedIn() {
    return !!this.authUser;
  }

  @action
  initializeAuthSub() {
    if (this.authSubscriber) {
      console.warn('auth subs already initialized');
    }

    const subscriber = initializeAuthSubscriber(async (AuthUser) => {
      runInAction(() => {
        this.authUser = AuthUser;
        this.user = new CUser();
      });

      if (AuthUser) {
        const existingUser = await getUserByUID(AuthUser!.uid);
        if (isOAuth(AuthUser) && !existingUser.data) {
          await this.registerUserData(AuthUser);
        }

        if (existingUser.data) {
          runInAction(() => {
            this.user = existingUser.data;
          });
        }
      }
    });

    runInAction(() => {
      this.authSubscriber = subscriber;
    });
  }

  @action
  unsubscribeAuthSub() {
    if (this.authSubscriber) {
      unsubscribeAuth(this.authSubscriber);
    }

    runInAction(() => {
      this.authSubscriber = null;
    });
  }

  @action
  setAuthUser(authUser: any) {
    runInAction(() => {
      this.authUser = authUser;
    });
  }

  @action
  setUser(user: CUser | null) {
    if (!user) return;

    runInAction(() => {
      this.user = user;
    });
  }

  @action
  populateUserStore(authUser: User | null, userData: CUser) {
    runInAction(() => {
      this.authUser = authUser;
      this.user = userData;
    });
  }

  @action
  async updatePicture(img: RcFile) {
    if (!img) {
      return false;
    }

    const uploadedFile = await uploadProfilePicture(this.user.uid, img);
    if (uploadedFile.error || !uploadedFile.data) {
      return false;
    }

    const { url, filename } = uploadedFile['data'];
    runInAction(() => {
      this.user.picture = url;
      this.user.pictureFilename = filename;
    });

    const response = await updateUser(this.user.id, this.user);
    if (response.error || !response.data) {
      return false;
    }

    return true;
  }

  @action
  async register({ email, password, name, username }: Record<string, string>) {
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
          this.authUser = authUser.data.user;
          this.user = createdUser.data;
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
      email: authUser.email || '',
      name: authUser.displayName || '',
      username: authUser.displayName || '',
      photo: authUser.photoURL || ''
    });

    if (userData.data) {
      runInAction(() => {
        this.authUser = authUser;
        this.user = userData.data;
      });
    }
  }

  @action
  async logout() {
    await logout();
    runInAction(() => {
      this.authUser = null;
      this.user = new CUser();
    });
  }
}
