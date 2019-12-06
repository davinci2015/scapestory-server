export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Upload: any,
};

export type Additive = {
   __typename?: 'Additive',
  id: Scalars['Int'],
  brand?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
};

export type Aquascape = {
   __typename?: 'Aquascape',
  id: Scalars['Int'],
  createdAt: Scalars['String'],
  updatedAt: Scalars['String'],
  title: Scalars['String'],
  featured: Scalars['Boolean'],
  trending: Scalars['Boolean'],
  slug: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  userId: Scalars['Int'],
  user?: Maybe<User>,
  co2?: Maybe<Co2>,
  tank?: Maybe<Tank>,
  photoperiod: Scalars['Int'],
  mainImage?: Maybe<Scalars['String']>,
  images?: Maybe<Array<AquascapeImage>>,
  tags: Array<Tag>,
  plants: Array<Plant>,
  hardscape: Array<Hardscape>,
  livestock: Array<Livestock>,
  filters: Array<Filter>,
  lights: Array<Light>,
  substrates: Array<Substrate>,
  additives: Array<Additive>,
  comments: Array<Comment>,
  likesCount: Scalars['Int'],
  isLikedByMe: Scalars['Boolean'],
  viewsCount: Scalars['Int'],
};

export type AquascapeImage = {
   __typename?: 'AquascapeImage',
  id: Scalars['Int'],
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  url: Scalars['String'],
};

export type AquascapesFilter = {
  trending?: Maybe<Scalars['Boolean']>,
};

export type AquascapesResult = {
   __typename?: 'AquascapesResult',
  rows: Array<Aquascape>,
  count: Scalars['Int'],
};

export type AuthPayload = {
   __typename?: 'AuthPayload',
  token?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
};

export type Co2 = {
   __typename?: 'CO2',
  id: Scalars['Int'],
  type?: Maybe<Scalars['String']>,
  bps?: Maybe<Scalars['Int']>,
};

export type Comment = {
   __typename?: 'Comment',
  id: Scalars['Int'],
  createdAt: Scalars['String'],
  content: Scalars['String'],
  parentCommentId?: Maybe<Scalars['Int']>,
  likes: Array<Like>,
  user: User,
  aquascapeImageId?: Maybe<Scalars['Int']>,
  aquascapeId?: Maybe<Scalars['Int']>,
  commentId?: Maybe<Scalars['Int']>,
};

export enum CommentEntityType {
  Aquascape = 'AQUASCAPE',
  Image = 'IMAGE'
}

export type Filter = {
   __typename?: 'Filter',
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
  brand: Scalars['String'],
  model: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
};

export type Follow = {
   __typename?: 'Follow',
  id: Scalars['Int'],
  followedUserId: Scalars['Int'],
  followerUserId: Scalars['Int'],
  followed: User,
  follower: User,
  updatedAt: Scalars['String'],
  createdAt: Scalars['String'],
};

export type Follows = {
   __typename?: 'Follows',
  following?: Maybe<Array<Maybe<Follow>>>,
  followers?: Maybe<Array<Maybe<Follow>>>,
};

export type Hardscape = {
   __typename?: 'Hardscape',
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
};

export type Light = {
   __typename?: 'Light',
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
  brand: Scalars['String'],
  model: Scalars['String'],
  width?: Maybe<Scalars['Float']>,
  height?: Maybe<Scalars['Float']>,
  depth?: Maybe<Scalars['Float']>,
  power?: Maybe<Scalars['Float']>,
  lumenMin?: Maybe<Scalars['Int']>,
  lumenMax?: Maybe<Scalars['Int']>,
  kelvinMin?: Maybe<Scalars['Int']>,
  kelvinMax?: Maybe<Scalars['Int']>,
  dimmable?: Maybe<Scalars['Boolean']>,
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
};

export type Like = {
   __typename?: 'Like',
  id: Scalars['Int'],
  user: User,
  userId: Scalars['Int'],
  aquascapeImageId?: Maybe<Scalars['Int']>,
  aquascapeId?: Maybe<Scalars['Int']>,
  commentId?: Maybe<Scalars['Int']>,
};

export enum LikeEntityType {
  Aquascape = 'AQUASCAPE',
  Image = 'IMAGE',
  Comment = 'COMMENT'
}

export type Livestock = {
   __typename?: 'Livestock',
  id: Scalars['Int'],
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  login?: Maybe<AuthPayload>,
  register?: Maybe<AuthPayload>,
  fbRegister?: Maybe<AuthPayload>,
  googleRegister?: Maybe<AuthPayload>,
  followUser?: Maybe<User>,
  unfollowUser?: Maybe<User>,
  createAquascape: Aquascape,
  updateAquascapeTitle?: Maybe<Scalars['String']>,
  updateAquascapeMainImage?: Maybe<Scalars['String']>,
  addComment?: Maybe<Comment>,
  removeComment?: Maybe<Comment>,
  like?: Maybe<Like>,
  dislike?: Maybe<Like>,
  addPlant: Plant,
  removePlant?: Maybe<Plant>,
  visitAquascape: VisitAquascapeResult,
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


export type MutationUpdateAquascapeTitleArgs = {
  aquascapeId: Scalars['Int'],
  title: Scalars['String']
};


export type MutationUpdateAquascapeMainImageArgs = {
  aquascapeId: Scalars['Int'],
  file: Scalars['Upload']
};


export type MutationAddCommentArgs = {
  entity: CommentEntityType,
  entityId: Scalars['Int'],
  content: Scalars['String'],
  parentCommentId?: Maybe<Scalars['Int']>
};


export type MutationRemoveCommentArgs = {
  id: Scalars['Int']
};


export type MutationLikeArgs = {
  entity: LikeEntityType,
  entityId: Scalars['Int']
};


export type MutationDislikeArgs = {
  entity: LikeEntityType,
  entityId: Scalars['Int']
};


export type MutationAddPlantArgs = {
  plantId?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  aquascapeId: Scalars['Int']
};


export type MutationRemovePlantArgs = {
  plantId: Scalars['Int'],
  aquascapeId: Scalars['Int']
};


export type MutationVisitAquascapeArgs = {
  aquascapeId: Scalars['Int']
};

export type Pagination = {
  limit: Scalars['Int'],
  cursor?: Maybe<Scalars['String']>,
};

export type Plant = {
   __typename?: 'Plant',
  id: Scalars['Int'],
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  origin?: Maybe<Scalars['String']>,
  minHeight?: Maybe<Scalars['Int']>,
  maxHeight?: Maybe<Scalars['Int']>,
  position?: Maybe<Scalars['String']>,
  luminosity?: Maybe<Scalars['String']>,
  growthSpeed?: Maybe<Scalars['String']>,
  difficulty?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  me: User,
  user?: Maybe<User>,
  userBySlug?: Maybe<User>,
  users: Array<Maybe<User>>,
  userProfileSlugExists?: Maybe<Scalars['Boolean']>,
  aquascapes: AquascapesResult,
  trendingAquascapes: Array<Aquascape>,
  featuredAquascape?: Maybe<Aquascape>,
  aquascape?: Maybe<Aquascape>,
  lights: Array<Light>,
  comments: Array<Comment>,
  plants: Array<Plant>,
  hardscape: Array<Hardscape>,
  livestock: Array<Livestock>,
  substrates: Array<Substrate>,
  additives: Array<Additive>,
  filters: Array<Filter>,
};


export type QueryUserArgs = {
  id: Scalars['Int']
};


export type QueryUserBySlugArgs = {
  slug: Scalars['String']
};


export type QueryUserProfileSlugExistsArgs = {
  slug: Scalars['String']
};


export type QueryAquascapesArgs = {
  pagination: Pagination,
  userId?: Maybe<Scalars['Int']>,
  random?: Maybe<Scalars['Boolean']>
};


export type QueryTrendingAquascapesArgs = {
  pagination: Pagination
};


export type QueryAquascapeArgs = {
  id: Scalars['Int']
};


export type QueryCommentsArgs = {
  entity: CommentEntityType,
  entityId: Scalars['Int'],
  pagination: Pagination
};

export type Substrate = {
   __typename?: 'Substrate',
  id: Scalars['Int'],
  brand?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
};

export type Tag = {
   __typename?: 'Tag',
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
  name: Scalars['String'],
};

export type Tank = {
   __typename?: 'Tank',
  id: Scalars['Int'],
  brand?: Maybe<Scalars['String']>,
  model?: Maybe<Scalars['String']>,
  volume?: Maybe<Scalars['Float']>,
  width?: Maybe<Scalars['Float']>,
  height?: Maybe<Scalars['Float']>,
  depth?: Maybe<Scalars['Float']>,
  glassThickness?: Maybe<Scalars['Float']>,
};


export type User = {
   __typename?: 'User',
  id: Scalars['Int'],
  email: Scalars['String'],
  slug: Scalars['String'],
  name: Scalars['String'],
  profileImage?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
  youtubeLink?: Maybe<Scalars['String']>,
  instagramLink?: Maybe<Scalars['String']>,
  createdAt: Scalars['String'],
  updatedAt: Scalars['String'],
  followersCount: Scalars['Int'],
  followingCount: Scalars['Int'],
  isFollowedByMe: Scalars['Boolean'],
  aquascapes: AquascapesResult,
};


export type UserAquascapesArgs = {
  pagination: Pagination,
  random?: Maybe<Scalars['Boolean']>
};

export type VisitAquascapeResult = {
   __typename?: 'VisitAquascapeResult',
  visitor: Visitor,
  created?: Maybe<Scalars['Boolean']>,
};

export type Visitor = {
   __typename?: 'Visitor',
  id: Scalars['Int'],
  visitorId: Scalars['String'],
  aquascapeId: Scalars['Int'],
};

export type AquascapeDetailsQueryVariables = {
  id: Scalars['Int']
};


export type AquascapeDetailsQuery = (
  { __typename?: 'Query' }
  & { aquascapes: (
    { __typename?: 'AquascapesResult' }
    & { rows: Array<(
      { __typename?: 'Aquascape' }
      & AquascapeFieldsFragment
    )> }
  ), aquascape: Maybe<(
    { __typename?: 'Aquascape' }
    & Pick<Aquascape, 'id' | 'title' | 'mainImage' | 'viewsCount' | 'likesCount' | 'isLikedByMe'>
    & { plants: Array<(
      { __typename?: 'Plant' }
      & Pick<Plant, 'id' | 'name'>
    )>, livestock: Array<(
      { __typename?: 'Livestock' }
      & Pick<Livestock, 'id' | 'name'>
    )>, hardscape: Array<(
      { __typename?: 'Hardscape' }
      & Pick<Hardscape, 'id' | 'name'>
    )>, lights: Array<(
      { __typename?: 'Light' }
      & Pick<Light, 'id' | 'brand' | 'model'>
    )>, filters: Array<(
      { __typename?: 'Filter' }
      & Pick<Filter, 'id' | 'brand' | 'model'>
    )>, co2: Maybe<(
      { __typename?: 'CO2' }
      & Pick<Co2, 'id' | 'type' | 'bps'>
    )>, substrates: Array<(
      { __typename?: 'Substrate' }
      & Pick<Substrate, 'id' | 'brand' | 'name'>
    )>, additives: Array<(
      { __typename?: 'Additive' }
      & Pick<Additive, 'id' | 'brand' | 'name'>
    )>, tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'name'>
    )>, images: Maybe<Array<(
      { __typename?: 'AquascapeImage' }
      & Pick<AquascapeImage, 'id' | 'title' | 'url'>
    )>>, user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'profileImage' | 'slug' | 'isFollowedByMe'>
      & { aquascapes: (
        { __typename?: 'AquascapesResult' }
        & { rows: Array<(
          { __typename?: 'Aquascape' }
          & AquascapeFieldsFragment
        )> }
      ) }
    )>, comments: Array<(
      { __typename?: 'Comment' }
      & CommentFieldsFragment
    )> }
  )> }
);

export type AquascapeDetailsEditQueryVariables = {
  id: Scalars['Int']
};


export type AquascapeDetailsEditQuery = (
  { __typename?: 'Query' }
  & { aquascape: Maybe<(
    { __typename?: 'Aquascape' }
    & Pick<Aquascape, 'id' | 'title' | 'mainImage' | 'viewsCount' | 'likesCount' | 'isLikedByMe'>
    & { plants: Array<(
      { __typename?: 'Plant' }
      & Pick<Plant, 'id' | 'name'>
    )>, livestock: Array<(
      { __typename?: 'Livestock' }
      & Pick<Livestock, 'id' | 'name'>
    )>, hardscape: Array<(
      { __typename?: 'Hardscape' }
      & Pick<Hardscape, 'id' | 'name'>
    )>, lights: Array<(
      { __typename?: 'Light' }
      & Pick<Light, 'id' | 'brand' | 'model'>
    )>, filters: Array<(
      { __typename?: 'Filter' }
      & Pick<Filter, 'id' | 'brand' | 'model'>
    )>, co2: Maybe<(
      { __typename?: 'CO2' }
      & Pick<Co2, 'id' | 'type' | 'bps'>
    )>, substrates: Array<(
      { __typename?: 'Substrate' }
      & Pick<Substrate, 'id' | 'brand' | 'name'>
    )>, additives: Array<(
      { __typename?: 'Additive' }
      & Pick<Additive, 'id' | 'brand' | 'name'>
    )>, tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'name'>
    )>, images: Maybe<Array<(
      { __typename?: 'AquascapeImage' }
      & Pick<AquascapeImage, 'id' | 'title' | 'url'>
    )>>, user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'profileImage' | 'slug'>
    )> }
  )> }
);

export type UserBySlugQueryVariables = {
  slug: Scalars['String'],
  pagination: Pagination
};


export type UserBySlugQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'slug' | 'name' | 'country' | 'profileImage' | 'youtubeLink' | 'instagramLink' | 'followersCount' | 'followingCount' | 'isFollowedByMe'>
    & { aquascapes: (
      { __typename?: 'AquascapesResult' }
      & Pick<AquascapesResult, 'count'>
      & { rows: Array<(
        { __typename?: 'Aquascape' }
        & AquascapeFieldsFragment
      )> }
    ) }
  )> }
);

export type AquascapeFieldsFragment = (
  { __typename?: 'Aquascape' }
  & Pick<Aquascape, 'id' | 'createdAt' | 'title' | 'mainImage' | 'viewsCount' | 'likesCount'>
  & { tags: Array<(
    { __typename?: 'Tag' }
    & Pick<Tag, 'name'>
  )>, user: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'profileImage' | 'slug'>
  )> }
);

export type CommentFieldsFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'content' | 'createdAt' | 'parentCommentId'>
  & { likes: Array<(
    { __typename?: 'Like' }
    & Pick<Like, 'id' | 'userId'>
  )>, user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'slug' | 'profileImage'>
  ) }
);

export type User_ProfileQueryVariables = {};


export type User_ProfileQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'slug' | 'name' | 'country' | 'profileImage'>
  ) }
);

export type AquascapesQueryVariables = {
  pagination: Pagination,
  userId?: Maybe<Scalars['Int']>
};


export type AquascapesQuery = (
  { __typename?: 'Query' }
  & { aquascapes: (
    { __typename?: 'AquascapesResult' }
    & Pick<AquascapesResult, 'count'>
    & { rows: Array<(
      { __typename?: 'Aquascape' }
      & AquascapeFieldsFragment
    )> }
  ) }
);

export type FeaturedAquascapesQueryVariables = {};


export type FeaturedAquascapesQuery = (
  { __typename?: 'Query' }
  & { featured: Maybe<(
    { __typename?: 'Aquascape' }
    & AquascapeFieldsFragment
  )> }
);

export type TrendingAquascapesQueryVariables = {
  pagination: Pagination
};


export type TrendingAquascapesQuery = (
  { __typename?: 'Query' }
  & { trending: Array<(
    { __typename?: 'Aquascape' }
    & AquascapeFieldsFragment
  )> }
);
