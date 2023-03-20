// Import all your stores here
import { GlobalStore } from './GlobalStore';
import { PostStore } from './PostStore';
import { UserStore } from './UserStore';

// Attach the store here for type declaration
export class RootStore {
  globalStore: GlobalStore;
  userStore: UserStore;
  postStore: PostStore;

  constructor() {
    this.globalStore = new GlobalStore(this);
    this.userStore = new UserStore(this);
    this.postStore = new PostStore(this);
  }
}
