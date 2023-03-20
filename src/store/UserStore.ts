import { action, makeObservable, observable, runInAction } from 'mobx';
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
  async populateUser(userId: string) {}

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
  async logout() {
    runInAction(() => {
      this.authUser = null;
      this.user = null;
      this.userList = [];
    });
  }
}
