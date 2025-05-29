type AuthorAvatar = {
  url: string;
};

type Author = {
  id: number;
  name: string;
  email: string;
  avatar: AuthorAvatar;
};

type Category = {
  name: string;
  slug: string;
  url: string;
};

type Post = {
  Posts: {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  categories: Category[];
  published_at: string | null;
  created_at: string;
  author: Author;
  }[]
};

export default Post