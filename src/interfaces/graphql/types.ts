/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
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

export type Additive = Equipment & {
  __typename?: 'Additive',
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
  model: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  brand?: Maybe<Brand>,
};

export type Aquascape = {
  __typename?: 'Aquascape',
  likesCount: Scalars['Int'],
  isLikedByMe: Scalars['Boolean'],
  id: Scalars['Int'],
  createdAt: Scalars['String'],
  updatedAt: Scalars['String'],
  title?: Maybe<Scalars['String']>,
  featured: Scalars['Boolean'],
  trending: Scalars['Boolean'],
  description?: Maybe<Scalars['String']>,
  userId: Scalars['Int'],
  user?: Maybe<User>,
  co2?: Maybe<Co2>,
  tank?: Maybe<Tank>,
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
  token: Scalars['String'],
  user: User,
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
  aquascape?: Maybe<Aquascape>,
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
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
  model: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  brand?: Maybe<Brand>,
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

export type Filter = Equipment & {
  __typename?: 'Filter',
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
  model: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  brand?: Maybe<Brand>,
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

export type ImageUploadResult = {
  __typename?: 'ImageUploadResult',
  imageUrl: Scalars['String'],
  imagePublicId: Scalars['String'],
};

export enum ImageVariant {
  Profile = 'PROFILE',
  Cover = 'COVER'
}

export type Light = Equipment & {
  __typename?: 'Light',
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
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
  brand?: Maybe<Brand>,
};

export type Like = {
  __typename?: 'Like',
  id: Scalars['Int'],
  userId: Scalars['Int'],
  aquascapeImageId?: Maybe<Scalars['Int']>,
  aquascapeId?: Maybe<Scalars['Int']>,
  commentId?: Maybe<Scalars['Int']>,
  aquascape?: Maybe<Aquascape>,
  comment?: Maybe<Comment>,
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
  uploadUserImage: ImageUploadResult,
  updateUserDetails?: Maybe<Array<Maybe<User>>>,
  confirmEmail?: Maybe<AuthPayload>,
  addEquipment: Equipment,
  removeEquipment?: Maybe<Equipment>,
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
  removeAquascape: Scalars['Int'],
  addComment?: Maybe<Comment>,
  removeComment?: Maybe<Comment>,
  readNotifications?: Maybe<Scalars['Boolean']>,
  followUser?: Maybe<User>,
  unfollowUser?: Maybe<User>,
  login?: Maybe<AuthPayload>,
  register?: Maybe<User>,
  fbRegister?: Maybe<AuthPayload>,
  googleRegister?: Maybe<AuthPayload>,
  resendConfirmationMail?: Maybe<Scalars['Int']>,
  visitAquascape: VisitAquascapeResult,
};


export type MutationUploadUserImageArgs = {
  file: Scalars['Upload'],
  imageVariant: ImageVariant
};


export type MutationUpdateUserDetailsArgs = {
  details: UserDetails
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String']
};


export type MutationAddEquipmentArgs = {
  equipment: EquipmentArgs,
  aquascapeId: Scalars['Int']
};


export type MutationRemoveEquipmentArgs = {
  equipment: EquipmentArgs,
  aquascapeId: Scalars['Int']
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
  aquascapeId: Scalars['Int'],
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


export type MutationRemoveAquascapeArgs = {
  aquascapeId: Scalars['Int']
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


export type MutationReadNotificationsArgs = {
  notifications: Array<Scalars['Int']>
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
  password: Scalars['String'],
  name: Scalars['String']
};


export type MutationFbRegisterArgs = {
  token: Scalars['String']
};


export type MutationGoogleRegisterArgs = {
  token: Scalars['String']
};


export type MutationResendConfirmationMailArgs = {
  email: Scalars['String']
};


export type MutationVisitAquascapeArgs = {
  aquascapeId: Scalars['Int']
};

export type Notification = {
  __typename?: 'Notification',
  creator?: Maybe<User>,
  like?: Maybe<Like>,
  comment?: Maybe<Comment>,
  id: Scalars['Int'],
  type: Scalars['Int'],
  createdAt: Scalars['Int'],
};

export type Notifier = {
  __typename?: 'Notifier',
  id: Scalars['Int'],
  notification?: Maybe<Notification>,
  status?: Maybe<Scalars['Int']>,
  createdAt: Scalars['Int'],
};

export type Pagination = {
  limit?: Maybe<Scalars['Int']>,
  cursor?: Maybe<Scalars['String']>,
  offset?: Maybe<Scalars['Int']>,
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
  brands: Array<Brand>,
  comments: Array<Comment>,
  notifications: Array<Notifier>,
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

export type Substrate = Equipment & {
  __typename?: 'Substrate',
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
  model: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  brand?: Maybe<Brand>,
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
  slug: Scalars['String'],
  name: Scalars['String'],
  about?: Maybe<Scalars['String']>,
  profileImage?: Maybe<Scalars['String']>,
  profileImagePublicId?: Maybe<Scalars['String']>,
  coverImage?: Maybe<Scalars['String']>,
  coverImagePublicId?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
  facebookUrl?: Maybe<Scalars['String']>,
  youtubeUrl?: Maybe<Scalars['String']>,
  instagramUrl?: Maybe<Scalars['String']>,
  twitterUrl?: Maybe<Scalars['String']>,
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

export type UserDetails = {
  name?: Maybe<Scalars['String']>,
  about?: Maybe<Scalars['String']>,
  facebookUrl?: Maybe<Scalars['String']>,
  youtubeUrl?: Maybe<Scalars['String']>,
  instagramUrl?: Maybe<Scalars['String']>,
  twitterUrl?: Maybe<Scalars['String']>,
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



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  User: ResolverTypeWrapper<Partial<User>>,
  Int: ResolverTypeWrapper<Partial<Scalars['Int']>>,
  String: ResolverTypeWrapper<Partial<Scalars['String']>>,
  Pagination: ResolverTypeWrapper<Partial<Pagination>>,
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>,
  AquascapesResult: ResolverTypeWrapper<Partial<AquascapesResult>>,
  Aquascape: ResolverTypeWrapper<Partial<Aquascape>>,
  CO2: ResolverTypeWrapper<Partial<Co2>>,
  Tank: ResolverTypeWrapper<Partial<Tank>>,
  Float: ResolverTypeWrapper<Partial<Scalars['Float']>>,
  AquascapeImage: ResolverTypeWrapper<Partial<AquascapeImage>>,
  Tag: ResolverTypeWrapper<Partial<Tag>>,
  Plant: ResolverTypeWrapper<Partial<Plant>>,
  Hardscape: ResolverTypeWrapper<Partial<Hardscape>>,
  Livestock: ResolverTypeWrapper<Partial<Livestock>>,
  Filter: ResolverTypeWrapper<Partial<Filter>>,
  Equipment: ResolverTypeWrapper<Partial<Equipment>>,
  Brand: ResolverTypeWrapper<Partial<Brand>>,
  Light: ResolverTypeWrapper<Partial<Light>>,
  Substrate: ResolverTypeWrapper<Partial<Substrate>>,
  Additive: ResolverTypeWrapper<Partial<Additive>>,
  Comment: ResolverTypeWrapper<Partial<Comment>>,
  Like: ResolverTypeWrapper<Partial<Like>>,
  CommentEntityType: ResolverTypeWrapper<Partial<CommentEntityType>>,
  Notifier: ResolverTypeWrapper<Partial<Notifier>>,
  Notification: ResolverTypeWrapper<Partial<Notification>>,
  Mutation: ResolverTypeWrapper<{}>,
  Upload: ResolverTypeWrapper<Partial<Scalars['Upload']>>,
  ImageVariant: ResolverTypeWrapper<Partial<ImageVariant>>,
  ImageUploadResult: ResolverTypeWrapper<Partial<ImageUploadResult>>,
  UserDetails: ResolverTypeWrapper<Partial<UserDetails>>,
  AuthPayload: ResolverTypeWrapper<Partial<AuthPayload>>,
  EquipmentArgs: ResolverTypeWrapper<Partial<EquipmentArgs>>,
  EquipmentType: ResolverTypeWrapper<Partial<EquipmentType>>,
  LikeEntityType: ResolverTypeWrapper<Partial<LikeEntityType>>,
  MainImageUploadResult: ResolverTypeWrapper<Partial<MainImageUploadResult>>,
  VisitAquascapeResult: ResolverTypeWrapper<Partial<VisitAquascapeResult>>,
  Visitor: ResolverTypeWrapper<Partial<Visitor>>,
  AquascapesFilter: ResolverTypeWrapper<Partial<AquascapesFilter>>,
  Follow: ResolverTypeWrapper<Partial<Follow>>,
  Follows: ResolverTypeWrapper<Partial<Follows>>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  User: Partial<User>,
  Int: Partial<Scalars['Int']>,
  String: Partial<Scalars['String']>,
  Pagination: Partial<Pagination>,
  Boolean: Partial<Scalars['Boolean']>,
  AquascapesResult: Partial<AquascapesResult>,
  Aquascape: Partial<Aquascape>,
  CO2: Partial<Co2>,
  Tank: Partial<Tank>,
  Float: Partial<Scalars['Float']>,
  AquascapeImage: Partial<AquascapeImage>,
  Tag: Partial<Tag>,
  Plant: Partial<Plant>,
  Hardscape: Partial<Hardscape>,
  Livestock: Partial<Livestock>,
  Filter: Partial<Filter>,
  Equipment: Partial<Equipment>,
  Brand: Partial<Brand>,
  Light: Partial<Light>,
  Substrate: Partial<Substrate>,
  Additive: Partial<Additive>,
  Comment: Partial<Comment>,
  Like: Partial<Like>,
  CommentEntityType: Partial<CommentEntityType>,
  Notifier: Partial<Notifier>,
  Notification: Partial<Notification>,
  Mutation: {},
  Upload: Partial<Scalars['Upload']>,
  ImageVariant: Partial<ImageVariant>,
  ImageUploadResult: Partial<ImageUploadResult>,
  UserDetails: Partial<UserDetails>,
  AuthPayload: Partial<AuthPayload>,
  EquipmentArgs: Partial<EquipmentArgs>,
  EquipmentType: Partial<EquipmentType>,
  LikeEntityType: Partial<LikeEntityType>,
  MainImageUploadResult: Partial<MainImageUploadResult>,
  VisitAquascapeResult: Partial<VisitAquascapeResult>,
  Visitor: Partial<Visitor>,
  AquascapesFilter: Partial<AquascapesFilter>,
  Follow: Partial<Follow>,
  Follows: Partial<Follows>,
};

export type AdditiveResolvers<ContextType = any, ParentType = ResolversParentTypes['Additive']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  predefined?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  model?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  brand?: Resolver<Maybe<ResolversTypes['Brand']>, ParentType, ContextType>,
};

export type AquascapeResolvers<ContextType = any, ParentType = ResolversParentTypes['Aquascape']> = {
  likesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  isLikedByMe?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  featured?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  trending?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  co2?: Resolver<Maybe<ResolversTypes['CO2']>, ParentType, ContextType>,
  tank?: Resolver<Maybe<ResolversTypes['Tank']>, ParentType, ContextType>,
  mainImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  mainImagePublicId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  images?: Resolver<Array<ResolversTypes['AquascapeImage']>, ParentType, ContextType>,
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>,
  plants?: Resolver<Array<ResolversTypes['Plant']>, ParentType, ContextType>,
  hardscape?: Resolver<Array<ResolversTypes['Hardscape']>, ParentType, ContextType>,
  livestock?: Resolver<Array<ResolversTypes['Livestock']>, ParentType, ContextType>,
  filters?: Resolver<Array<ResolversTypes['Filter']>, ParentType, ContextType>,
  lights?: Resolver<Array<ResolversTypes['Light']>, ParentType, ContextType>,
  substrates?: Resolver<Array<ResolversTypes['Substrate']>, ParentType, ContextType>,
  additives?: Resolver<Array<ResolversTypes['Additive']>, ParentType, ContextType>,
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>,
  viewsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type AquascapeImageResolvers<ContextType = any, ParentType = ResolversParentTypes['AquascapeImage']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  publicId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type AquascapesResultResolvers<ContextType = any, ParentType = ResolversParentTypes['AquascapesResult']> = {
  rows?: Resolver<Array<ResolversTypes['Aquascape']>, ParentType, ContextType>,
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type AuthPayloadResolvers<ContextType = any, ParentType = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
};

export type BrandResolvers<ContextType = any, ParentType = ResolversParentTypes['Brand']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  predefined?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type Co2Resolvers<ContextType = any, ParentType = ResolversParentTypes['CO2']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  bps?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
};

export type CommentResolvers<ContextType = any, ParentType = ResolversParentTypes['Comment']> = {
  aquascape?: Resolver<Maybe<ResolversTypes['Aquascape']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  parentCommentId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  likes?: Resolver<Array<ResolversTypes['Like']>, ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  aquascapeImageId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  aquascapeId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  commentId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
};

export type EquipmentResolvers<ContextType = any, ParentType = ResolversParentTypes['Equipment']> = {
  __resolveType: TypeResolveFn<'Filter' | 'Light' | 'Substrate' | 'Additive', ParentType, ContextType>,
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  predefined?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  model?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  brand?: Resolver<Maybe<ResolversTypes['Brand']>, ParentType, ContextType>,
};

export type FilterResolvers<ContextType = any, ParentType = ResolversParentTypes['Filter']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  predefined?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  model?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  brand?: Resolver<Maybe<ResolversTypes['Brand']>, ParentType, ContextType>,
};

export type FollowResolvers<ContextType = any, ParentType = ResolversParentTypes['Follow']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  followedUserId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  followerUserId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  followed?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  follower?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type FollowsResolvers<ContextType = any, ParentType = ResolversParentTypes['Follows']> = {
  following?: Resolver<Maybe<Array<Maybe<ResolversTypes['Follow']>>>, ParentType, ContextType>,
  followers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Follow']>>>, ParentType, ContextType>,
};

export type HardscapeResolvers<ContextType = any, ParentType = ResolversParentTypes['Hardscape']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  predefined?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type ImageUploadResultResolvers<ContextType = any, ParentType = ResolversParentTypes['ImageUploadResult']> = {
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  imagePublicId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type LightResolvers<ContextType = any, ParentType = ResolversParentTypes['Light']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  predefined?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  model?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  width?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  depth?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  power?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  lumenMin?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  lumenMax?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  kelvinMin?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  kelvinMax?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  dimmable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  brand?: Resolver<Maybe<ResolversTypes['Brand']>, ParentType, ContextType>,
};

export type LikeResolvers<ContextType = any, ParentType = ResolversParentTypes['Like']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  aquascapeImageId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  aquascapeId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  commentId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  aquascape?: Resolver<Maybe<ResolversTypes['Aquascape']>, ParentType, ContextType>,
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>,
};

export type LivestockResolvers<ContextType = any, ParentType = ResolversParentTypes['Livestock']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type MainImageUploadResultResolvers<ContextType = any, ParentType = ResolversParentTypes['MainImageUploadResult']> = {
  mainImagePublicId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  mainImageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType = ResolversParentTypes['Mutation']> = {
  uploadUserImage?: Resolver<ResolversTypes['ImageUploadResult'], ParentType, ContextType, MutationUploadUserImageArgs>,
  updateUserDetails?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, MutationUpdateUserDetailsArgs>,
  confirmEmail?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, MutationConfirmEmailArgs>,
  addEquipment?: Resolver<ResolversTypes['Equipment'], ParentType, ContextType, MutationAddEquipmentArgs>,
  removeEquipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType, MutationRemoveEquipmentArgs>,
  addLight?: Resolver<ResolversTypes['Light'], ParentType, ContextType, MutationAddLightArgs>,
  removeLight?: Resolver<Maybe<ResolversTypes['Light']>, ParentType, ContextType, MutationRemoveLightArgs>,
  addPlant?: Resolver<ResolversTypes['Plant'], ParentType, ContextType, MutationAddPlantArgs>,
  removePlant?: Resolver<Maybe<ResolversTypes['Plant']>, ParentType, ContextType, MutationRemovePlantArgs>,
  addHardscape?: Resolver<ResolversTypes['Hardscape'], ParentType, ContextType, MutationAddHardscapeArgs>,
  removeHardscape?: Resolver<Maybe<ResolversTypes['Hardscape']>, ParentType, ContextType, MutationRemoveHardscapeArgs>,
  addLivestock?: Resolver<ResolversTypes['Livestock'], ParentType, ContextType, MutationAddLivestockArgs>,
  removeLivestock?: Resolver<Maybe<ResolversTypes['Livestock']>, ParentType, ContextType, MutationRemoveLivestockArgs>,
  like?: Resolver<Maybe<ResolversTypes['Like']>, ParentType, ContextType, MutationLikeArgs>,
  dislike?: Resolver<Maybe<ResolversTypes['Like']>, ParentType, ContextType, MutationDislikeArgs>,
  addAquascapeImage?: Resolver<ResolversTypes['AquascapeImage'], ParentType, ContextType, MutationAddAquascapeImageArgs>,
  deleteAquascapeImage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, MutationDeleteAquascapeImageArgs>,
  createAquascape?: Resolver<ResolversTypes['Aquascape'], ParentType, ContextType>,
  updateAquascapeTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, MutationUpdateAquascapeTitleArgs>,
  updateAquascapeMainImage?: Resolver<ResolversTypes['MainImageUploadResult'], ParentType, ContextType, MutationUpdateAquascapeMainImageArgs>,
  removeAquascape?: Resolver<ResolversTypes['Int'], ParentType, ContextType, MutationRemoveAquascapeArgs>,
  addComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, MutationAddCommentArgs>,
  removeComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, MutationRemoveCommentArgs>,
  readNotifications?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, MutationReadNotificationsArgs>,
  followUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, MutationFollowUserArgs>,
  unfollowUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, MutationUnfollowUserArgs>,
  login?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, MutationLoginArgs>,
  register?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, MutationRegisterArgs>,
  fbRegister?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, MutationFbRegisterArgs>,
  googleRegister?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, MutationGoogleRegisterArgs>,
  resendConfirmationMail?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, MutationResendConfirmationMailArgs>,
  visitAquascape?: Resolver<ResolversTypes['VisitAquascapeResult'], ParentType, ContextType, MutationVisitAquascapeArgs>,
};

export type NotificationResolvers<ContextType = any, ParentType = ResolversParentTypes['Notification']> = {
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  like?: Resolver<Maybe<ResolversTypes['Like']>, ParentType, ContextType>,
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  type?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type NotifierResolvers<ContextType = any, ParentType = ResolversParentTypes['Notifier']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  notification?: Resolver<Maybe<ResolversTypes['Notification']>, ParentType, ContextType>,
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type PlantResolvers<ContextType = any, ParentType = ResolversParentTypes['Plant']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  origin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  minHeight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  maxHeight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  position?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  luminosity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  growthSpeed?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  difficulty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType = ResolversParentTypes['Query']> = {
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, QueryUserArgs>,
  userBySlug?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, QueryUserBySlugArgs>,
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>,
  filters?: Resolver<Array<ResolversTypes['Filter']>, ParentType, ContextType>,
  lights?: Resolver<Array<ResolversTypes['Light']>, ParentType, ContextType>,
  plants?: Resolver<Array<ResolversTypes['Plant']>, ParentType, ContextType>,
  hardscape?: Resolver<Array<ResolversTypes['Hardscape']>, ParentType, ContextType>,
  livestock?: Resolver<Array<ResolversTypes['Livestock']>, ParentType, ContextType>,
  substrates?: Resolver<Array<ResolversTypes['Substrate']>, ParentType, ContextType>,
  additives?: Resolver<Array<ResolversTypes['Additive']>, ParentType, ContextType>,
  aquascapes?: Resolver<ResolversTypes['AquascapesResult'], ParentType, ContextType, QueryAquascapesArgs>,
  trendingAquascapes?: Resolver<Array<ResolversTypes['Aquascape']>, ParentType, ContextType, QueryTrendingAquascapesArgs>,
  featuredAquascape?: Resolver<Maybe<ResolversTypes['Aquascape']>, ParentType, ContextType>,
  aquascape?: Resolver<Maybe<ResolversTypes['Aquascape']>, ParentType, ContextType, QueryAquascapeArgs>,
  brands?: Resolver<Array<ResolversTypes['Brand']>, ParentType, ContextType>,
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, QueryCommentsArgs>,
  notifications?: Resolver<Array<ResolversTypes['Notifier']>, ParentType, ContextType>,
  userProfileSlugExists?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, QueryUserProfileSlugExistsArgs>,
};

export type SubstrateResolvers<ContextType = any, ParentType = ResolversParentTypes['Substrate']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  predefined?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  model?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  brand?: Resolver<Maybe<ResolversTypes['Brand']>, ParentType, ContextType>,
};

export type TagResolvers<ContextType = any, ParentType = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  predefined?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type TankResolvers<ContextType = any, ParentType = ResolversParentTypes['Tank']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  volume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  width?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  depth?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  glassThickness?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<ContextType = any, ParentType = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  about?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  profileImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  profileImagePublicId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  coverImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  coverImagePublicId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  facebookUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  youtubeUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  instagramUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  twitterUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  aquascapes?: Resolver<ResolversTypes['AquascapesResult'], ParentType, ContextType, UserAquascapesArgs>,
  followersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  followingCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  isFollowedByMe?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type VisitAquascapeResultResolvers<ContextType = any, ParentType = ResolversParentTypes['VisitAquascapeResult']> = {
  visitor?: Resolver<ResolversTypes['Visitor'], ParentType, ContextType>,
  created?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
};

export type VisitorResolvers<ContextType = any, ParentType = ResolversParentTypes['Visitor']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  visitorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  aquascapeId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Additive?: AdditiveResolvers<ContextType>,
  Aquascape?: AquascapeResolvers<ContextType>,
  AquascapeImage?: AquascapeImageResolvers<ContextType>,
  AquascapesResult?: AquascapesResultResolvers<ContextType>,
  AuthPayload?: AuthPayloadResolvers<ContextType>,
  Brand?: BrandResolvers<ContextType>,
  CO2?: Co2Resolvers<ContextType>,
  Comment?: CommentResolvers<ContextType>,
  Equipment?: EquipmentResolvers,
  Filter?: FilterResolvers<ContextType>,
  Follow?: FollowResolvers<ContextType>,
  Follows?: FollowsResolvers<ContextType>,
  Hardscape?: HardscapeResolvers<ContextType>,
  ImageUploadResult?: ImageUploadResultResolvers<ContextType>,
  Light?: LightResolvers<ContextType>,
  Like?: LikeResolvers<ContextType>,
  Livestock?: LivestockResolvers<ContextType>,
  MainImageUploadResult?: MainImageUploadResultResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Notification?: NotificationResolvers<ContextType>,
  Notifier?: NotifierResolvers<ContextType>,
  Plant?: PlantResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Substrate?: SubstrateResolvers<ContextType>,
  Tag?: TagResolvers<ContextType>,
  Tank?: TankResolvers<ContextType>,
  Upload?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
  VisitAquascapeResult?: VisitAquascapeResultResolvers<ContextType>,
  Visitor?: VisitorResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
