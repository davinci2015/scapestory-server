export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Aquascape = {
  __typename?: 'Aquascape',
  id: Scalars['Int'],
  title: Scalars['String'],
  volume?: Maybe<Scalars['Int']>,
  startedAt?: Maybe<Scalars['String']>,
  likes: Scalars['Int'],
  votes: Scalars['Int'],
  inContest: Scalars['Boolean'],
  description?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
};

export type AuthPayload = {
  __typename?: 'AuthPayload',
  token?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
};

export type Follow = {
  __typename?: 'Follow',
  id: Scalars['Int'],
  followedUserId: Scalars['Int'],
  followerUserId: Scalars['Int'],
  followed: User,
  follower: User,
  updatedAt: Scalars['String'],
  craetedAt: Scalars['String'],
};

export type Follows = {
  __typename?: 'Follows',
  following?: Maybe<Array<Maybe<Follow>>>,
  followers?: Maybe<Array<Maybe<Follow>>>,
};

export type Mutation = {
  __typename?: 'Mutation',
  login?: Maybe<AuthPayload>,
  register?: Maybe<AuthPayload>,
  fbRegister?: Maybe<AuthPayload>,
  googleRegister?: Maybe<AuthPayload>,
  followUser?: Maybe<User>,
  unfollowUser?: Maybe<User>,
  createAquascape?: Maybe<Aquascape>,
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationRegisterArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationFbRegisterArgs = {
  token: Scalars['String']
};


export type MutationGoogleRegisterArgs = {
  token: Scalars['String']
};


export type MutationFollowUserArgs = {
  userId: Scalars['Int']
};


export type MutationUnfollowUserArgs = {
  userId: Scalars['Int']
};


export type MutationCreateAquascapeArgs = {
  title: Scalars['String']
};

export type Query = {
  __typename?: 'Query',
  me: User,
  user?: Maybe<User>,
  users: Array<Maybe<User>>,
  usernameExists?: Maybe<Scalars['Boolean']>,
  follows?: Maybe<Follows>,
  aquascapes?: Maybe<Array<Maybe<Aquascape>>>,
};


export type QueryUserArgs = {
  id: Scalars['Int']
};


export type QueryUsernameExistsArgs = {
  username: Scalars['String']
};


export type QueryFollowsArgs = {
  userId: Scalars['Int']
};

export type User = {
  __typename?: 'User',
  id: Scalars['Int'],
  email: Scalars['String'],
  username: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  profileImage?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
  youtubeLink?: Maybe<Scalars['String']>,
  instagramLink?: Maybe<Scalars['String']>,
  createdAt: Scalars['String'],
  updatedAt: Scalars['String'],
  following?: Maybe<Array<Maybe<Follow>>>,
  followers?: Maybe<Array<Maybe<Follow>>>,
};
