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
  predefined: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
};

export type Aquascape = {
  __typename?: "Aquascape";
  id: Scalars["Int"];
  title: Scalars["String"];
  volume?: Maybe<Scalars["Int"]>;
  startedAt?: Maybe<Scalars["String"]>;
  featured: Scalars["Boolean"];
  trending: Scalars["Boolean"];
  description?: Maybe<Scalars["String"]>;
  user?: Maybe<User>;
  co2?: Maybe<Co2>;
  photoperiod: Scalars["Int"];
  mainImage?: Maybe<Scalars["String"]>;
  images: Array<Maybe<AquascapeImage>>;
  comments: Array<Maybe<Comment>>;
  viewsCount: Scalars["Int"];
  likesCount: Scalars["Int"];
  tags: Array<Tag>;
};

export type AquascapeImage = {
  __typename?: "AquascapeImage";
  id: Scalars["Int"];
  mainImage: Scalars["Boolean"];
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  gridSize?: Maybe<Scalars["Int"]>;
  gridPosition?: Maybe<Scalars["Int"]>;
  url: Scalars["String"];
  likes?: Maybe<Array<Maybe<User>>>;
  comments: Array<Maybe<Comment>>;
};

export type AquascapesFilter = {
  trending?: Maybe<Scalars["Boolean"]>;
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  token?: Maybe<Scalars["String"]>;
  user?: Maybe<User>;
};

export type Brand = {
  __typename?: "Brand";
  id: Scalars["Int"];
  name: Scalars["String"];
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
  content?: Maybe<Scalars["String"]>;
  userId: Scalars["Int"];
  user?: Maybe<User>;
  aquascapeId?: Maybe<Scalars["Int"]>;
  aquascapeImageId?: Maybe<Scalars["Int"]>;
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
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
};

export type Light = {
  __typename?: "Light";
  id: Scalars["Int"];
  predefined: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
  brand?: Maybe<Brand>;
  model?: Maybe<Scalars["String"]>;
};

export type Like = {
  __typename?: "Like";
  id: Scalars["Int"];
  userId: Scalars["Int"];
  user?: Maybe<User>;
  aquascapeImageId?: Maybe<Scalars["Int"]>;
  aquascapeId?: Maybe<Scalars["Int"]>;
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
  userId?: Maybe<Scalars["String"]>;
};

export type Pagination = {
  limit: Scalars["Int"];
  offset: Scalars["Int"];
};

export type Plant = {
  __typename?: "Plant";
  id: Scalars["Int"];
  predefined: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
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
  featuredAquascape?: Maybe<Aquascape>;
  lights: Array<Maybe<Light>>;
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
  filter?: Maybe<AquascapesFilter>;
};

export type Substrate = {
  __typename?: "Substrate";
  id: Scalars["Int"];
  predefined: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
};

export type Tag = {
  __typename?: "Tag";
  id: Scalars["Int"];
  predefined: Scalars["Boolean"];
  name: Scalars["String"];
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
  following?: Maybe<Array<Maybe<Follow>>>;
  followers?: Maybe<Array<Maybe<Follow>>>;
};

export type Visitor = {
  __typename?: "Visitor";
  id: Scalars["Int"];
  visitorId: Scalars["String"];
};
