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
  predefined: Scalars['Boolean'],
  brand?: Maybe<Brand>,
  model: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
};

export type Aquascape = {
   __typename?: 'Aquascape',
  likesCount: Scalars['Int'],
  isLikedByMe: Scalars['Boolean'],
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
  mainImageUrl?: Maybe<Scalars['String']>,
  mainImagePublicId?: Maybe<Scalars['String']>,
  images: Array<AquascapeImage>,
  tags: Array<Tag>,
  plants: Array<Plant>,
  hardscape: Array<Hardscape>,
  livestock: Array<Livestock>,
  filters: Array<Filter>,
  lights: Array<Light>,
  substrates: Array<Substrate>,
  additives: Array<Additive>,
  comments: Array<Comment>,
  viewsCount: Scalars['Int'],
};

export type AquascapeImage = {
   __typename?: 'AquascapeImage',
  id: Scalars['Int'],
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  url: Scalars['String'],
  publicId: Scalars['String'],
  createdAt: Scalars['String'],
  updatedAt: Scalars['String'],
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

export type Brand = {
   __typename?: 'Brand',
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
  name: Scalars['String'],
  logo?: Maybe<Scalars['String']>,
  address?: Maybe<Scalars['String']>,
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

export type Equipment = {
   __typename?: 'Equipment',
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
  brand?: Maybe<Brand>,
  model: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
};

export type EquipmentArgs = {
  equipmentType: EquipmentType,
  equipmentId?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
};

export enum EquipmentType {
  Filter = 'FILTER',
  Substrate = 'SUBSTRATE',
  Light = 'LIGHT',
  Additives = 'ADDITIVES'
}

export type Filter = {
   __typename?: 'Filter',
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
  brand?: Maybe<Brand>,
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
  brand?: Maybe<Brand>,
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

export type MainImageUploadResult = {
   __typename?: 'MainImageUploadResult',
  mainImagePublicId: Scalars['String'],
  mainImageUrl: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  addLight: Light,
  removeLight?: Maybe<Light>,
  addPlant: Plant,
  removePlant?: Maybe<Plant>,
  addHardscape: Hardscape,
  removeHardscape?: Maybe<Hardscape>,
  addLivestock: Livestock,
  removeLivestock?: Maybe<Livestock>,
  like?: Maybe<Like>,
  dislike?: Maybe<Like>,
  addAquascapeImage: AquascapeImage,
  deleteAquascapeImage?: Maybe<Scalars['Int']>,
  createAquascape: Aquascape,
  updateAquascapeTitle?: Maybe<Scalars['String']>,
  updateAquascapeMainImage: MainImageUploadResult,
  addComment?: Maybe<Comment>,
  removeComment?: Maybe<Comment>,
  followUser?: Maybe<User>,
  unfollowUser?: Maybe<User>,
  login?: Maybe<AuthPayload>,
  register?: Maybe<AuthPayload>,
  fbRegister?: Maybe<AuthPayload>,
  googleRegister?: Maybe<AuthPayload>,
  visitAquascape: VisitAquascapeResult,
  addEquipment: Equipment,
  removeEquipment?: Maybe<Equipment>,
};


export type MutationAddLightArgs = {
  brand: Scalars['String'],
  model: Scalars['String'],
  aquascapeId: Scalars['Int']
};


export type MutationRemoveLightArgs = {
  lightId: Scalars['Int'],
  aquascapeId: Scalars['Int']
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


export type MutationAddHardscapeArgs = {
  hardscapeId?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  aquascapeId: Scalars['Int']
};


export type MutationRemoveHardscapeArgs = {
  hardscapeId: Scalars['Int'],
  aquascapeId: Scalars['Int']
};


export type MutationAddLivestockArgs = {
  livestockId?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  aquascapeId: Scalars['Int']
};


export type MutationRemoveLivestockArgs = {
  livestockId: Scalars['Int'],
  aquascapeId: Scalars['Int']
};


export type MutationLikeArgs = {
  entity: LikeEntityType,
  entityId: Scalars['Int']
};


export type MutationDislikeArgs = {
  entity: LikeEntityType,
  entityId: Scalars['Int']
};


export type MutationAddAquascapeImageArgs = {
  aquascapeId: Scalars['Int'],
  file: Scalars['Upload']
};


export type MutationDeleteAquascapeImageArgs = {
  aquascapeId: Scalars['Int'],
  imageId: Scalars['Int']
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


export type MutationFollowUserArgs = {
  userId: Scalars['Int']
};


export type MutationUnfollowUserArgs = {
  userId: Scalars['Int']
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


export type MutationVisitAquascapeArgs = {
  aquascapeId: Scalars['Int']
};


export type MutationAddEquipmentArgs = {
  equipment: EquipmentArgs,
  aquascapeId: Scalars['Int']
};


export type MutationRemoveEquipmentArgs = {
  equipmentId: Scalars['Int'],
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
  me?: Maybe<User>,
  user?: Maybe<User>,
  userBySlug?: Maybe<User>,
  users: Array<Maybe<User>>,
  filters: Array<Filter>,
  brands: Array<Brand>,
  lights: Array<Light>,
  plants: Array<Plant>,
  hardscape: Array<Hardscape>,
  livestock: Array<Livestock>,
  substrates: Array<Substrate>,
  additives: Array<Additive>,
  aquascapes: AquascapesResult,
  trendingAquascapes: Array<Aquascape>,
  featuredAquascape?: Maybe<Aquascape>,
  aquascape?: Maybe<Aquascape>,
  comments: Array<Comment>,
  userProfileSlugExists?: Maybe<Scalars['Boolean']>,
};


export type QueryUserArgs = {
  id: Scalars['Int']
};


export type QueryUserBySlugArgs = {
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


export type QueryUserProfileSlugExistsArgs = {
  slug: Scalars['String']
};

export type Substrate = {
   __typename?: 'Substrate',
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
  brand?: Maybe<Brand>,
  model: Scalars['String'],
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
  aquascapes: AquascapesResult,
  followersCount: Scalars['Int'],
  followingCount: Scalars['Int'],
  isFollowedByMe: Scalars['Boolean'],
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

export type AddCommentMutationVariables = {
  entity: CommentEntityType,
  entityId: Scalars['Int'],
  content: Scalars['String'],
  parentCommentId?: Maybe<Scalars['Int']>
};


export type AddCommentMutation = (
  { __typename?: 'Mutation' }
  & { addComment: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'content' | 'createdAt' | 'parentCommentId'>
  )> }
);

export type RemoveCommentMutationVariables = {
  id: Scalars['Int']
};


export type RemoveCommentMutation = (
  { __typename?: 'Mutation' }
  & { removeComment: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'content' | 'createdAt' | 'parentCommentId'>
  )> }
);

export type RemoveHardscapeMutationVariables = {
  hardscapeId: Scalars['Int'],
  aquascapeId: Scalars['Int']
};


export type RemoveHardscapeMutation = (
  { __typename?: 'Mutation' }
  & { removeHardscape: Maybe<(
    { __typename?: 'Hardscape' }
    & Pick<Hardscape, 'id' | 'name'>
  )> }
);

export type AddHardscapeMutationVariables = {
  hardscapeId?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  aquascapeId: Scalars['Int']
};


export type AddHardscapeMutation = (
  { __typename?: 'Mutation' }
  & { addHardscape: (
    { __typename?: 'Hardscape' }
    & Pick<Hardscape, 'id' | 'name'>
  ) }
);

export type RemoveLivestockMutationVariables = {
  livestockId: Scalars['Int'],
  aquascapeId: Scalars['Int']
};


export type RemoveLivestockMutation = (
  { __typename?: 'Mutation' }
  & { removeLivestock: Maybe<(
    { __typename?: 'Livestock' }
    & Pick<Livestock, 'id' | 'name'>
  )> }
);

export type AddLivestockMutationVariables = {
  livestockId?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  aquascapeId: Scalars['Int']
};


export type AddLivestockMutation = (
  { __typename?: 'Mutation' }
  & { addLivestock: (
    { __typename?: 'Livestock' }
    & Pick<Livestock, 'id' | 'name'>
  ) }
);

export type RemovePlantMutationVariables = {
  plantId: Scalars['Int'],
  aquascapeId: Scalars['Int']
};


export type RemovePlantMutation = (
  { __typename?: 'Mutation' }
  & { removePlant: Maybe<(
    { __typename?: 'Plant' }
    & Pick<Plant, 'id' | 'name'>
  )> }
);

export type AddPlantMutationVariables = {
  plantId?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  aquascapeId: Scalars['Int']
};


export type AddPlantMutation = (
  { __typename?: 'Mutation' }
  & { addPlant: (
    { __typename?: 'Plant' }
    & Pick<Plant, 'id' | 'name'>
  ) }
);

export type UpdateAquascapeTitleMutationVariables = {
  aquascapeId: Scalars['Int'],
  title: Scalars['String']
};


export type UpdateAquascapeTitleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateAquascapeTitle'>
);

export type UpdateAquascapeMainImageMutationVariables = {
  aquascapeId: Scalars['Int'],
  file: Scalars['Upload']
};


export type UpdateAquascapeMainImageMutation = (
  { __typename?: 'Mutation' }
  & { updateAquascapeMainImage: (
    { __typename?: 'MainImageUploadResult' }
    & Pick<MainImageUploadResult, 'mainImagePublicId' | 'mainImageUrl'>
  ) }
);

export type DeleteAquascapeImageMutationVariables = {
  aquascapeId: Scalars['Int'],
  imageId: Scalars['Int']
};


export type DeleteAquascapeImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAquascapeImage'>
);

export type AddAquascapeImageMutationVariables = {
  aquascapeId: Scalars['Int'],
  file: Scalars['Upload']
};


export type AddAquascapeImageMutation = (
  { __typename?: 'Mutation' }
  & { addAquascapeImage: (
    { __typename?: 'AquascapeImage' }
    & Pick<AquascapeImage, 'id' | 'url' | 'title' | 'createdAt'>
  ) }
);

export type LikeMutationVariables = {
  entity: LikeEntityType,
  entityId: Scalars['Int']
};


export type LikeMutation = (
  { __typename?: 'Mutation' }
  & { like: Maybe<(
    { __typename?: 'Like' }
    & Pick<Like, 'id' | 'aquascapeId' | 'aquascapeImageId' | 'userId' | 'commentId'>
  )> }
);

export type DislikeMutationVariables = {
  entity: LikeEntityType,
  entityId: Scalars['Int']
};


export type DislikeMutation = (
  { __typename?: 'Mutation' }
  & { dislike: Maybe<(
    { __typename?: 'Like' }
    & Pick<Like, 'id' | 'aquascapeId' | 'aquascapeImageId' | 'userId' | 'commentId'>
  )> }
);

export type FollowUserMutationVariables = {
  userId: Scalars['Int']
};


export type FollowUserMutation = (
  { __typename?: 'Mutation' }
  & { followUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type UnfollowUserMutationVariables = {
  userId: Scalars['Int']
};


export type UnfollowUserMutation = (
  { __typename?: 'Mutation' }
  & { unfollowUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type VisitAquascapeMutationVariables = {
  aquascapeId: Scalars['Int']
};


export type VisitAquascapeMutation = (
  { __typename?: 'Mutation' }
  & { visitAquascape: (
    { __typename?: 'VisitAquascapeResult' }
    & Pick<VisitAquascapeResult, 'created'>
    & { visitor: (
      { __typename?: 'Visitor' }
      & Pick<Visitor, 'id' | 'visitorId'>
    ) }
  ) }
);
