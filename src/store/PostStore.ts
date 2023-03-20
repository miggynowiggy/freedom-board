import { action, makeObservable, observable } from 'mobx';
import { dayjs } from '../helpers';
import { RootStore } from './RootStore';
import { IUser } from './UserStore';

export interface IPost {
  id: string;
  createdAt: string | Date;
  isAnonymous: boolean;
  user: IUser;
  likes: string[];
  comments: string[];
  title: string;
  content: string;
}

function randomNumber(end: number) {
  return Math.floor(Math.random() * end);
}

const filler = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur egestas tellus quis nibh iaculis hendrerit. Integer in hendrerit nunc, a viverra leo. Duis accumsan pellentesque egestas. Aenean orci felis, sodales venenatis orci ac, dignissim ultrices urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer iaculis consectetur ante a pharetra. Phasellus vel facilisis est. Nulla tempus ex ac elit imperdiet, volutpat auctor dui aliquet. In felis urna, venenatis quis egestas ac, auctor sit amet elit. Sed sed odio ut nisl dignissim tincidunt. Vivamus non dictum est.
Sed velit nulla, hendrerit sit amet tincidunt in, tincidunt non purus. Curabitur scelerisque, purus vitae ultrices viverra, ligula ipsum posuere est, eget tristique purus enim nec diam. Phasellus laoreet erat id sagittis venenatis. Vivamus felis nisl, hendrerit eu nunc sed, sollicitudin finibus nulla. Nunc tincidunt magna nec sem malesuada euismod. Curabitur convallis congue velit id interdum. Vestibulum a varius metus, vitae auctor turpis. Curabitur tempor nisl non ex porttitor facilisis. Aliquam finibus lectus commodo molestie aliquet. Donec id consectetur elit. Nulla at metus a libero congue molestie a vel felis. Nam aliquam tortor at est fermentum luctus.
Phasellus vitae sagittis turpis. Vestibulum venenatis quis sapien nec varius. Duis at facilisis lacus. Duis molestie iaculis convallis. Cras venenatis id nulla eu gravida. Suspendisse id nibh mattis, sollicitudin neque eu, viverra arcu. Nunc ac auctor quam. Duis feugiat dignissim lectus. Proin eu est et lacus fringilla lobortis. Aenean dui augue, lobortis cursus mollis non, luctus in leo. Praesent sit amet arcu tortor.
Nullam nec diam elit. Cras pretium, libero eu venenatis consequat, sem mi elementum quam, vel feugiat quam est sed augue. Etiam vehicula massa a ultricies feugiat. Nullam eu diam vitae nisl rutrum volutpat ut vitae sapien. Sed ultricies ullamcorper suscipit. Morbi a odio scelerisque, tempus lectus sed, pulvinar magna. Sed sed pretium nibh. Donec nulla tortor, tincidunt quis porta vitae, malesuada et tellus.
Vestibulum posuere convallis blandit. Etiam sed erat vel dui cursus molestie vel eu orci. Morbi id eros risus. Duis eget dui non nunc lobortis ultricies condimentum vel mauris. Fusce et maximus dolor. Integer ut ex non felis eleifend venenatis. Praesent at tellus at risus tristique consectetur a vel eros. Donec lacinia, odio vel aliquet dictum, odio dui cursus dolor, consectetur gravida neque massa sed quam. Vestibulum dictum dolor massa, eget eleifend ex maximus ut. Curabitur venenatis eu nunc eget ornare. Morbi fringilla enim a condimentum gravida. Maecenas a turpis pharetra, commodo sem tincidunt, pharetra libero.
`;

export class PostStore {
  private rootStore: RootStore;

  @observable post: IPost | null = null;
  @observable posts: IPost[] = new Array(100).fill(null).map((_, index) => ({
    id: index.toString(),
    createdAt: dayjs().add(randomNumber(7), 'day').toString(),
    isAnonymous: true,
    user: {
      id: randomNumber(100).toString(),
      name: filler.slice(0, randomNumber(20)),
      email: '',
      createdAt: new Date().toString(),
      username: filler.slice(0, randomNumber(20))
    },
    comments: [],
    likes: [randomNumber(50).toString()],
    title: filler.slice(0, randomNumber(20)),
    content: filler.slice(0, randomNumber(500))
  }));

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @action
  setPost(post: IPost | null) {
    this.post = post;
  }

  @action
  setPosts(posts: IPost[] | []) {
    this.posts = posts;
  }

  @action
  clearStore() {
    this.posts = [];
    this.post = null;
  }
}
