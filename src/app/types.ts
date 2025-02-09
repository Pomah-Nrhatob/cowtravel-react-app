export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  isLikeArticles: string[];
  favoriteArticles: string[];
  token?: string;
  user?: any;
};

export type SingleTravel = any;
export type SingleDate = any;

export type ImageForMainPage = {
  imageId: string;
  imagePath: string;
};

export type Travel = {
  id: string | null;
  title: string | null;
  countries: SingleTravel[] | null;
  dateTravel: SingleDate[] | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  userId: string | null;
  isPublished: boolean | null;
  image: ImageForMainPage | null;
};

export type Chapter = {
  id: string | null;
  title: string | null;
  content: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  travelId: string | null;
  images: Image[] | undefined | null;
  seqNumber: number | null;
};

export type Image = {
  id: string | null;
  filaname: string | null;
  filepath: string | null;
  mimetype: string | null;
  size: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  chapterId: string | null;
  title: string | null;
};

export type ArticleTravel = {
  id: string | null;
  title: string | null;
  countries: string[] | null;
  dateTravel: any[] | null;
  authorId: string | null;
  travelId: string | null;
  createdAt: Date | null;
  updateAt: Date | null;
  userName: string | null;
  imagePath: string | null;
  isFavoriteCount: number | null;
  rating: number | null;
  viewCount: number | null;
};

export type ArticleChapter = {
  id: string | null;
  title: string | null;
  content: string | null;
  authorId: string | null;
  chapterId: string | null;
  publishedTravelsId: string | null;
  createdAt: Date | null;
  updateAt: Date | null;
  images: Image[] | null;
};
