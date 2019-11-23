/* eslint-disable */
import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Additive = {
  __typename?: 'Additive',
  id: Scalars['Int'],
  brand?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
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
  viewsCount: Scalars['Int'],
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
  addComment?: Maybe<Comment>,
  removeComment?: Maybe<Comment>,
  like?: Maybe<Like>,
  dislike?: Maybe<Like>,
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


export type MutationCreateAquascapeArgs = {
  title: Scalars['String']
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
  follows?: Maybe<Follows>,
  aquascapes: AquascapesResult,
  trendingAquascapes: Array<Aquascape>,
  featuredAquascape?: Maybe<Aquascape>,
  aquascape?: Maybe<Aquascape>,
  lights: Array<Maybe<Light>>,
  comments: Array<Comment>,
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


export type QueryFollowsArgs = {
  userId: Scalars['Int']
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
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>,
  Pagination: ResolverTypeWrapper<Partial<Pagination>>,
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
  Light: ResolverTypeWrapper<Partial<Light>>,
  Substrate: ResolverTypeWrapper<Partial<Substrate>>,
  Additive: ResolverTypeWrapper<Partial<Additive>>,
  Comment: ResolverTypeWrapper<Partial<Comment>>,
  Like: ResolverTypeWrapper<Partial<Like>>,
  Follows: ResolverTypeWrapper<Partial<Follows>>,
  Follow: ResolverTypeWrapper<Partial<Follow>>,
  CommentEntityType: ResolverTypeWrapper<Partial<CommentEntityType>>,
  Mutation: ResolverTypeWrapper<{}>,
  AuthPayload: ResolverTypeWrapper<Partial<AuthPayload>>,
  LikeEntityType: ResolverTypeWrapper<Partial<LikeEntityType>>,
  VisitAquascapeResult: ResolverTypeWrapper<Partial<VisitAquascapeResult>>,
  Visitor: ResolverTypeWrapper<Partial<Visitor>>,
  AquascapesFilter: ResolverTypeWrapper<Partial<AquascapesFilter>>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  User: Partial<User>,
  Int: Partial<Scalars['Int']>,
  String: Partial<Scalars['String']>,
  Boolean: Partial<Scalars['Boolean']>,
  Pagination: Partial<Pagination>,
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
  Light: Partial<Light>,
  Substrate: Partial<Substrate>,
  Additive: Partial<Additive>,
  Comment: Partial<Comment>,
  Like: Partial<Like>,
  Follows: Partial<Follows>,
  Follow: Partial<Follow>,
  CommentEntityType: Partial<CommentEntityType>,
  Mutation: {},
  AuthPayload: Partial<AuthPayload>,
  LikeEntityType: Partial<LikeEntityType>,
  VisitAquascapeResult: Partial<VisitAquascapeResult>,
  Visitor: Partial<Visitor>,
  AquascapesFilter: Partial<AquascapesFilter>,
};

export type AdditiveResolvers<ContextType = any, ParentType = ResolversParentTypes['Additive']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  brand?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type AquascapeResolvers<ContextType = any, ParentType = ResolversParentTypes['Aquascape']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  featured?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  trending?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  co2?: Resolver<Maybe<ResolversTypes['CO2']>, ParentType, ContextType>,
  tank?: Resolver<Maybe<ResolversTypes['Tank']>, ParentType, ContextType>,
  photoperiod?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  mainImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  images?: Resolver<Maybe<Array<ResolversTypes['AquascapeImage']>>, ParentType, ContextType>,
  viewsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>,
  plants?: Resolver<Array<ResolversTypes['Plant']>, ParentType, ContextType>,
  hardscape?: Resolver<Array<ResolversTypes['Hardscape']>, ParentType, ContextType>,
  livestock?: Resolver<Array<ResolversTypes['Livestock']>, ParentType, ContextType>,
  filters?: Resolver<Array<ResolversTypes['Filter']>, ParentType, ContextType>,
  lights?: Resolver<Array<ResolversTypes['Light']>, ParentType, ContextType>,
  substrates?: Resolver<Array<ResolversTypes['Substrate']>, ParentType, ContextType>,
  additives?: Resolver<Array<ResolversTypes['Additive']>, ParentType, ContextType>,
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>,
  likesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  isLikedByMe?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type AquascapeImageResolvers<ContextType = any, ParentType = ResolversParentTypes['AquascapeImage']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type AquascapesResultResolvers<ContextType = any, ParentType = ResolversParentTypes['AquascapesResult']> = {
  rows?: Resolver<Array<ResolversTypes['Aquascape']>, ParentType, ContextType>,
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type AuthPayloadResolvers<ContextType = any, ParentType = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
};

export type Co2Resolvers<ContextType = any, ParentType = ResolversParentTypes['CO2']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  bps?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
};

export type CommentResolvers<ContextType = any, ParentType = ResolversParentTypes['Comment']> = {
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

export type FilterResolvers<ContextType = any, ParentType = ResolversParentTypes['Filter']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  brand?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  model?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
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

export type LightResolvers<ContextType = any, ParentType = ResolversParentTypes['Light']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  predefined?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  brand?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
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
};

export type LikeResolvers<ContextType = any, ParentType = ResolversParentTypes['Like']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  aquascapeImageId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  aquascapeId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  commentId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
};

export type LivestockResolvers<ContextType = any, ParentType = ResolversParentTypes['Livestock']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType = ResolversParentTypes['Mutation']> = {
  login?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, MutationLoginArgs>,
  register?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, MutationRegisterArgs>,
  fbRegister?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, MutationFbRegisterArgs>,
  googleRegister?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, MutationGoogleRegisterArgs>,
  followUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, MutationFollowUserArgs>,
  unfollowUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, MutationUnfollowUserArgs>,
  createAquascape?: Resolver<ResolversTypes['Aquascape'], ParentType, ContextType, MutationCreateAquascapeArgs>,
  addComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, MutationAddCommentArgs>,
  removeComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, MutationRemoveCommentArgs>,
  like?: Resolver<Maybe<ResolversTypes['Like']>, ParentType, ContextType, MutationLikeArgs>,
  dislike?: Resolver<Maybe<ResolversTypes['Like']>, ParentType, ContextType, MutationDislikeArgs>,
  visitAquascape?: Resolver<ResolversTypes['VisitAquascapeResult'], ParentType, ContextType, MutationVisitAquascapeArgs>,
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
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, QueryUserArgs>,
  userBySlug?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, QueryUserBySlugArgs>,
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>,
  userProfileSlugExists?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, QueryUserProfileSlugExistsArgs>,
  follows?: Resolver<Maybe<ResolversTypes['Follows']>, ParentType, ContextType, QueryFollowsArgs>,
  aquascapes?: Resolver<ResolversTypes['AquascapesResult'], ParentType, ContextType, QueryAquascapesArgs>,
  trendingAquascapes?: Resolver<Array<ResolversTypes['Aquascape']>, ParentType, ContextType, QueryTrendingAquascapesArgs>,
  featuredAquascape?: Resolver<Maybe<ResolversTypes['Aquascape']>, ParentType, ContextType>,
  aquascape?: Resolver<Maybe<ResolversTypes['Aquascape']>, ParentType, ContextType, QueryAquascapeArgs>,
  lights?: Resolver<Array<Maybe<ResolversTypes['Light']>>, ParentType, ContextType>,
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, QueryCommentsArgs>,
};

export type SubstrateResolvers<ContextType = any, ParentType = ResolversParentTypes['Substrate']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  brand?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type TagResolvers<ContextType = any, ParentType = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  predefined?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type TankResolvers<ContextType = any, ParentType = ResolversParentTypes['Tank']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  brand?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  model?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  volume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  width?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  depth?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  glassThickness?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
};

export type UserResolvers<ContextType = any, ParentType = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  profileImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  youtubeLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  instagramLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  isFollowedByMe?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  aquascapes?: Resolver<ResolversTypes['AquascapesResult'], ParentType, ContextType, UserAquascapesArgs>,
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
  CO2?: Co2Resolvers<ContextType>,
  Comment?: CommentResolvers<ContextType>,
  Filter?: FilterResolvers<ContextType>,
  Follow?: FollowResolvers<ContextType>,
  Follows?: FollowsResolvers<ContextType>,
  Hardscape?: HardscapeResolvers<ContextType>,
  Light?: LightResolvers<ContextType>,
  Like?: LikeResolvers<ContextType>,
  Livestock?: LivestockResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Plant?: PlantResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Substrate?: SubstrateResolvers<ContextType>,
  Tag?: TagResolvers<ContextType>,
  Tank?: TankResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  VisitAquascapeResult?: VisitAquascapeResultResolvers<ContextType>,
  Visitor?: VisitorResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
