import { action, makeObservable, observable, runInAction } from 'mobx';
import { CPost } from 'src/types';
import { RootStore } from './RootStore';

export class PostStore {
  private rootStore: RootStore;

  @observable post: CPost | null = null;
  @observable posts: CPost[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @action
  setPost(post: CPost | null) {
    this.post = post;
  }

  @action
  setPosts(posts: CPost[] | []) {
    this.posts = posts;
  }

  @action
  clearStore() {
    runInAction(() => {
      this.posts = [];
      this.post = null;
    });
  }

  @action
  addPost(post: CPost) {
    runInAction(() => {
      this.posts.unshift(post);
    });
  }

  @action
  updatePost(post: CPost) {
    const postIndex = this.posts.findIndex((x) => x.id === post.id);

    if (postIndex !== -1) {
      runInAction(() => {
        this.posts.splice(postIndex, 1, post);
      });
    }
  }

  @action
  deletePost(post: CPost) {
    const postIndex = this.posts.findIndex((x) => x.id === post.id);

    if (postIndex !== -1) {
      runInAction(() => {
        this.posts.splice(postIndex, 1);
      });
    }
  }
}
