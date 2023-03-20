import { action, makeObservable, observable, runInAction } from 'mobx';
import { RootStore } from './RootStore';

export class GlobalStore {
  private rootStore: RootStore;

  @observable.ref postModal: boolean = false;
  @observable.ref commentModal: boolean = false;
  @observable.ref editorState: 'ADD' | 'EDIT' = 'ADD';
  @observable.ref currentPostId: string = '';

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @action
  openPostModal() {
    runInAction(() => {
      this.editorState = 'ADD';
      this.postModal = true;
    });
  }

  @action
  openEditPostModal(postId: string) {
    runInAction(() => {
      this.editorState = 'EDIT';
      this.currentPostId = postId;
      this.postModal = true;
    });
  }

  @action
  openCommentModal(postId: string) {
    if (!postId) {
      console.log('cannot open comments modal due to missing post id');
      return;
    }
    runInAction(() => {
      this.currentPostId = postId;
      this.commentModal = true;
    });
  }

  @action
  closePostModal() {
    runInAction(() => {
      this.postModal = false;
    });
  }

  @action
  closeCommentModal() {
    runInAction(() => {
      this.commentModal = false;
      this.currentPostId = '';
    });
  }
}
