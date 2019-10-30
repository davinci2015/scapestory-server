export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Additive = {
  __typename?: "Additive";
  id: Scalars["Int"];
  brand?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
};

export type Aquascape = {
  __typename?: "Aquascape";
  id: Scalars["Int"];
  title: Scalars["String"];
  featured: Scalars["Boolean"];
  trending: Scalars["Boolean"];
  slug: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  user?: Maybe<User>;
  co2?: Maybe<Co2>;
  tank?: Maybe<Tank>;
  photoperiod: Scalars["Int"];
  mainImage?: Maybe<Scalars["String"]>;
  images?: Maybe<Array<AquascapeImage>>;
  viewsCount: Scalars["Int"];
  likesCount: Scalars["Int"];
  tags: Array<Tag>;
  plants?: Maybe<Array<Plant>>;
  hardscape?: Maybe<Array<Hardscape>>;
  livestock?: Maybe<Array<Livestock>>;
  filters?: Maybe<Array<Filter>>;
  lights?: Maybe<Array<Light>>;
  substrates?: Maybe<Array<Substrate>>;
  additives?: Maybe<Array<Additive>>;
  isLikedByMe: Scalars["Boolean"];
};

export type AquascapeImage = {
  __typename?: "AquascapeImage";
  id: Scalars["Int"];
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  url: Scalars["String"];
};

export type AquascapesFilter = {
  trending?: Maybe<Scalars["Boolean"]>;
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  token?: Maybe<Scalars["String"]>;
  user?: Maybe<User>;
};

export type Co2 = {
  __typename?: "CO2";
  id: Scalars["Int"];
  type?: Maybe<Scalars["String"]>;
  bps?: Maybe<Scalars["Int"]>;
};

export type Comment = {
  __typename?: "Comment";
  id: Scalars["Int"];
  content: Scalars["String"];
  parentCommentId?: Maybe<Scalars["Int"]>;
  user: User;
};

export enum CommentEntityType {
  Aquascape = "AQUASCAPE",
  Image = "IMAGE"
}

export type Filter = {
  __typename?: "Filter";
  id: Scalars["Int"];
  brand: Scalars["String"];
  model: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
};

export type Follow = {
  __typename?: "Follow";
  id: Scalars["Int"];
  followedUserId: Scalars["Int"];
  followerUserId: Scalars["Int"];
  followed: User;
  follower: User;
  updatedAt: Scalars["String"];
  craetedAt: Scalars["String"];
};

export type Follows = {
  __typename?: "Follows";
  following?: Maybe<Array<Maybe<Follow>>>;
  followers?: Maybe<Array<Maybe<Follow>>>;
};

export type Hardscape = {
  __typename?: "Hardscape";
  id: Scalars["Int"];
  predefined: Scalars["Boolean"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
};

export type Light = {
  __typename?: "Light";
  id: Scalars["Int"];
  predefined: Scalars["Boolean"];
  brand: Scalars["String"];
  model: Scalars["String"];
  width?: Maybe<Scalars["Float"]>;
  height?: Maybe<Scalars["Float"]>;
  depth?: Maybe<Scalars["Float"]>;
  power?: Maybe<Scalars["Float"]>;
  lumenMin?: Maybe<Scalars["Int"]>;
  lumenMax?: Maybe<Scalars["Int"]>;
  kelvinMin?: Maybe<Scalars["Int"]>;
  kelvinMax?: Maybe<Scalars["Int"]>;
  dimmable?: Maybe<Scalars["Boolean"]>;
  description?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
};

export type Like = {
  __typename?: "Like";
  id: Scalars["Int"];
  user: User;
  userId: Scalars["Int"];
  aquascapeImageId: Scalars["Int"];
  aquascapeId: Scalars["Int"];
  commentId: Scalars["Int"];
};

export enum LikeEntityType {
  Aquascape = "AQUASCAPE",
  Image = "IMAGE",
  Comment = "COMMENT"
}

export type Livestock = {
  __typename?: "Livestock";
  id: Scalars["Int"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  login?: Maybe<AuthPayload>;
  register?: Maybe<AuthPayload>;
  fbRegister?: Maybe<AuthPayload>;
  googleRegister?: Maybe<AuthPayload>;
  followUser?: Maybe<User>;
  unfollowUser?: Maybe<User>;
  createAquascape?: Maybe<Aquascape>;
  visitAquascape: Scalars["String"];
  addComment?: Maybe<Comment>;
  like?: Maybe<Like>;
  dislike?: Maybe<Like>;
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationRegisterArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationFbRegisterArgs = {
  token: Scalars["String"];
};

export type MutationGoogleRegisterArgs = {
  token: Scalars["String"];
};

export type MutationFollowUserArgs = {
  userId: Scalars["Int"];
};

export type MutationUnfollowUserArgs = {
  userId: Scalars["Int"];
};

export type MutationCreateAquascapeArgs = {
  title: Scalars["String"];
};

export type MutationVisitAquascapeArgs = {
  aquascapeId: Scalars["Int"];
};

export type MutationAddCommentArgs = {
  entity: CommentEntityType;
  entityId: Scalars["Int"];
  content: Scalars["String"];
  parentCommentId?: Maybe<Scalars["Int"]>;
};

export type MutationLikeArgs = {
  entity: LikeEntityType;
  entityId: Scalars["Int"];
};

export type MutationDislikeArgs = {
  entity: LikeEntityType;
  entityId: Scalars["Int"];
};

export type Pagination = {
  limit: Scalars["Int"];
  offset: Scalars["Int"];
};

export type Plant = {
  __typename?: "Plant";
  id: Scalars["Int"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
  origin?: Maybe<Scalars["String"]>;
  minHeight?: Maybe<Scalars["Int"]>;
  maxHeight?: Maybe<Scalars["Int"]>;
  position?: Maybe<Scalars["String"]>;
  luminosity?: Maybe<Scalars["String"]>;
  growthSpeed?: Maybe<Scalars["String"]>;
  difficulty?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  me: User;
  user?: Maybe<User>;
  users: Array<Maybe<User>>;
  usernameExists?: Maybe<Scalars["Boolean"]>;
  follows?: Maybe<Follows>;
  aquascapes?: Maybe<Array<Maybe<Aquascape>>>;
  trendingAquascapes?: Maybe<Array<Maybe<Aquascape>>>;
  featuredAquascape?: Maybe<Aquascape>;
  aquascape?: Maybe<Aquascape>;
  lights: Array<Maybe<Light>>;
  comments: Array<Comment>;
};

export type QueryUserArgs = {
  id: Scalars["Int"];
};

export type QueryUsernameExistsArgs = {
  username: Scalars["String"];
};

export type QueryFollowsArgs = {
  userId: Scalars["Int"];
};

export type QueryAquascapesArgs = {
  pagination?: Maybe<Pagination>;
  userId?: Maybe<Scalars["Int"]>;
};

export type QueryTrendingAquascapesArgs = {
  pagination?: Maybe<Pagination>;
};

export type QueryAquascapeArgs = {
  id: Scalars["Int"];
};

export type QueryCommentsArgs = {
  entity: CommentEntityType;
  entityId: Scalars["Int"];
  pagination?: Maybe<Pagination>;
};

export type Substrate = {
  __typename?: "Substrate";
  id: Scalars["Int"];
  brand?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
};

export type Tag = {
  __typename?: "Tag";
  id: Scalars["Int"];
  predefined: Scalars["Boolean"];
  name: Scalars["String"];
};

export type Tank = {
  __typename?: "Tank";
  id: Scalars["Int"];
  brand?: Maybe<Scalars["String"]>;
  model?: Maybe<Scalars["String"]>;
  volume?: Maybe<Scalars["Float"]>;
  width?: Maybe<Scalars["Float"]>;
  height?: Maybe<Scalars["Float"]>;
  depth?: Maybe<Scalars["Float"]>;
  glassThickness?: Maybe<Scalars["Float"]>;
};

export type User = {
  __typename?: "User";
  id: Scalars["Int"];
  email: Scalars["String"];
  username: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  profileImage?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  youtubeLink?: Maybe<Scalars["String"]>;
  instagramLink?: Maybe<Scalars["String"]>;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type Visitor = {
  __typename?: "Visitor";
  id: Scalars["Int"];
  visitorId: Scalars["String"];
};
