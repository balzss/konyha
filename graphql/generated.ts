import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Me = {
  __typename?: 'Me';
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  publishOptions?: Maybe<PublishOptions>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteRecipe?: Maybe<Scalars['Boolean']>;
  deleteTags?: Maybe<Scalars['Boolean']>;
  importRecipes?: Maybe<Response>;
  publishRecipe?: Maybe<Response>;
  publishSite?: Maybe<Response>;
  unpublishSite?: Maybe<Response>;
  updateUserPreferences?: Maybe<UserPreferences>;
  upsertRecipe?: Maybe<Response>;
};


export type MutationDeleteRecipeArgs = {
  slug: Scalars['String'];
};


export type MutationDeleteTagsArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationImportRecipesArgs = {
  data: Array<RecipeUpsertInput>;
};


export type MutationPublishRecipeArgs = {
  publishState: Scalars['Boolean'];
  recipeSlug: Scalars['String'];
};


export type MutationPublishSiteArgs = {
  publishOptions?: InputMaybe<PublishOptionsInput>;
};


export type MutationUpdateUserPreferencesArgs = {
  preferences?: InputMaybe<UpdateUserPreferencesInput>;
};


export type MutationUpsertRecipeArgs = {
  data: RecipeUpsertInput;
  id?: InputMaybe<Scalars['String']>;
  tagsConnect: Array<Scalars['String']>;
  tagsCreate: Array<Scalars['String']>;
};

export type PublishOptions = {
  __typename?: 'PublishOptions';
  publishId?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
};

export type PublishOptionsInput = {
  publishId: Scalars['String'];
  published: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  me: Me;
  recipes: Array<Recipe>;
  searchRecipes: Array<Recipe>;
  tags: Array<Tag>;
};


export type QueryRecipesArgs = {
  where?: InputMaybe<RecipesWhereInput>;
};


export type QuerySearchRecipesArgs = {
  query?: InputMaybe<Scalars['String']>;
};

export type Recipe = {
  __typename?: 'Recipe';
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  ingredients?: Maybe<Array<Scalars['String']>>;
  instructions?: Maybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  published: Scalars['Boolean'];
  slug: Scalars['String'];
  tags: Array<Tag>;
};

export type RecipeUpsertInput = {
  authorId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  ingredients?: InputMaybe<Array<Scalars['String']>>;
  instructions?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  published?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type RecipesWhereInput = {
  slug?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type Response = {
  __typename?: 'Response';
  data?: Maybe<ResponseData>;
  error?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

export type ResponseData = Me | Recipe | Tag;

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type UpdateUserPreferencesInput = {
  theme?: InputMaybe<Scalars['String']>;
};

export type UserPreferences = {
  __typename?: 'UserPreferences';
  theme?: Maybe<Scalars['String']>;
};

export type TagFieldsFragment = { __typename?: 'Tag', id: string, name: string, slug: string };

export type RecipeFieldsFragment = { __typename?: 'Recipe', id: string, name: string, slug: string, description?: string | null, ingredients?: Array<string> | null, instructions?: Array<string> | null, published: boolean, tags: Array<{ __typename?: 'Tag', id: string, name: string, slug: string }> };

export type ResponseFieldsFragment = { __typename?: 'Response', message: string, error?: string | null, data?: { __typename?: 'Me', id: string, name: string, email: string, publishOptions?: { __typename?: 'PublishOptions', publishId?: string | null, published?: boolean | null } | null } | { __typename?: 'Recipe', id: string, name: string, slug: string, description?: string | null, ingredients?: Array<string> | null, instructions?: Array<string> | null, published: boolean, tags: Array<{ __typename?: 'Tag', id: string, name: string, slug: string }> } | { __typename?: 'Tag', id: string, name: string, slug: string } | null };

export type PublishOptionsFieldsFragment = { __typename?: 'PublishOptions', publishId?: string | null, published?: boolean | null };

export type UserFieldsFragment = { __typename?: 'Me', id: string, name: string, email: string, publishOptions?: { __typename?: 'PublishOptions', publishId?: string | null, published?: boolean | null } | null };

export type GetRecipesQueryVariables = Exact<{
  where?: InputMaybe<RecipesWhereInput>;
}>;


export type GetRecipesQuery = { __typename?: 'Query', recipes: Array<{ __typename?: 'Recipe', id: string, name: string, slug: string, description?: string | null, ingredients?: Array<string> | null, instructions?: Array<string> | null, published: boolean, tags: Array<{ __typename?: 'Tag', id: string, name: string, slug: string }> }> };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: string, name: string, slug: string }> };

export type SearchRecipesQueryVariables = Exact<{
  searchQuery: Scalars['String'];
}>;


export type SearchRecipesQuery = { __typename?: 'Query', searchRecipes: Array<{ __typename?: 'Recipe', id: string, name: string, slug: string, description?: string | null, ingredients?: Array<string> | null, instructions?: Array<string> | null, published: boolean, tags: Array<{ __typename?: 'Tag', id: string, name: string, slug: string }> }> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'Me', id: string, name: string, email: string, publishOptions?: { __typename?: 'PublishOptions', publishId?: string | null, published?: boolean | null } | null } };

export type DeleteRecipeMutationVariables = Exact<{
  recipeSlug: Scalars['String'];
}>;


export type DeleteRecipeMutation = { __typename?: 'Mutation', deleteRecipe?: boolean | null };

export type UpsertRecipeMutationVariables = Exact<{
  recipeId?: InputMaybe<Scalars['String']>;
  recipeData: RecipeUpsertInput;
  tagsConnect: Array<Scalars['String']> | Scalars['String'];
  tagsCreate: Array<Scalars['String']> | Scalars['String'];
}>;


export type UpsertRecipeMutation = { __typename?: 'Mutation', upsertRecipe?: { __typename?: 'Response', message: string, error?: string | null, data?: { __typename?: 'Me', id: string, name: string, email: string, publishOptions?: { __typename?: 'PublishOptions', publishId?: string | null, published?: boolean | null } | null } | { __typename?: 'Recipe', id: string, name: string, slug: string, description?: string | null, ingredients?: Array<string> | null, instructions?: Array<string> | null, published: boolean, tags: Array<{ __typename?: 'Tag', id: string, name: string, slug: string }> } | { __typename?: 'Tag', id: string, name: string, slug: string } | null } | null };

export type UpdateUserPreferencesMutationVariables = Exact<{
  preferences?: InputMaybe<UpdateUserPreferencesInput>;
}>;


export type UpdateUserPreferencesMutation = { __typename?: 'Mutation', updateUserPreferences?: { __typename?: 'UserPreferences', theme?: string | null } | null };

export type DeleteTagsMutationVariables = Exact<{
  tagIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteTagsMutation = { __typename?: 'Mutation', deleteTags?: boolean | null };

export type PublishSiteMutationVariables = Exact<{
  publishOptions?: InputMaybe<PublishOptionsInput>;
}>;


export type PublishSiteMutation = { __typename?: 'Mutation', publishSite?: { __typename?: 'Response', message: string, error?: string | null, data?: { __typename?: 'Me', id: string, name: string, email: string, publishOptions?: { __typename?: 'PublishOptions', publishId?: string | null, published?: boolean | null } | null } | { __typename?: 'Recipe', id: string, name: string, slug: string, description?: string | null, ingredients?: Array<string> | null, instructions?: Array<string> | null, published: boolean, tags: Array<{ __typename?: 'Tag', id: string, name: string, slug: string }> } | { __typename?: 'Tag', id: string, name: string, slug: string } | null } | null };

export type UnpublishSiteMutationVariables = Exact<{ [key: string]: never; }>;


export type UnpublishSiteMutation = { __typename?: 'Mutation', unpublishSite?: { __typename?: 'Response', message: string, error?: string | null, data?: { __typename?: 'Me', id: string, name: string, email: string, publishOptions?: { __typename?: 'PublishOptions', publishId?: string | null, published?: boolean | null } | null } | { __typename?: 'Recipe', id: string, name: string, slug: string, description?: string | null, ingredients?: Array<string> | null, instructions?: Array<string> | null, published: boolean, tags: Array<{ __typename?: 'Tag', id: string, name: string, slug: string }> } | { __typename?: 'Tag', id: string, name: string, slug: string } | null } | null };

export type PublishRecipeMutationVariables = Exact<{
  recipeSlug: Scalars['String'];
  publishState: Scalars['Boolean'];
}>;


export type PublishRecipeMutation = { __typename?: 'Mutation', publishRecipe?: { __typename?: 'Response', message: string, error?: string | null, data?: { __typename?: 'Me', id: string, name: string, email: string, publishOptions?: { __typename?: 'PublishOptions', publishId?: string | null, published?: boolean | null } | null } | { __typename?: 'Recipe', id: string, name: string, slug: string, description?: string | null, ingredients?: Array<string> | null, instructions?: Array<string> | null, published: boolean, tags: Array<{ __typename?: 'Tag', id: string, name: string, slug: string }> } | { __typename?: 'Tag', id: string, name: string, slug: string } | null } | null };

export type ImportRecipesMutationVariables = Exact<{
  data: Array<RecipeUpsertInput> | RecipeUpsertInput;
}>;


export type ImportRecipesMutation = { __typename?: 'Mutation', importRecipes?: { __typename?: 'Response', message: string, error?: string | null, data?: { __typename?: 'Me', id: string, name: string, email: string, publishOptions?: { __typename?: 'PublishOptions', publishId?: string | null, published?: boolean | null } | null } | { __typename?: 'Recipe', id: string, name: string, slug: string, description?: string | null, ingredients?: Array<string> | null, instructions?: Array<string> | null, published: boolean, tags: Array<{ __typename?: 'Tag', id: string, name: string, slug: string }> } | { __typename?: 'Tag', id: string, name: string, slug: string } | null } | null };



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Me: ResolverTypeWrapper<Me>;
  Mutation: ResolverTypeWrapper<{}>;
  PublishOptions: ResolverTypeWrapper<PublishOptions>;
  PublishOptionsInput: PublishOptionsInput;
  Query: ResolverTypeWrapper<{}>;
  Recipe: ResolverTypeWrapper<Recipe>;
  RecipeUpsertInput: RecipeUpsertInput;
  RecipesWhereInput: RecipesWhereInput;
  Response: ResolverTypeWrapper<Omit<Response, 'data'> & { data?: Maybe<ResolversTypes['ResponseData']> }>;
  ResponseData: ResolversTypes['Me'] | ResolversTypes['Recipe'] | ResolversTypes['Tag'];
  String: ResolverTypeWrapper<Scalars['String']>;
  Tag: ResolverTypeWrapper<Tag>;
  UpdateUserPreferencesInput: UpdateUserPreferencesInput;
  UserPreferences: ResolverTypeWrapper<UserPreferences>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Me: Me;
  Mutation: {};
  PublishOptions: PublishOptions;
  PublishOptionsInput: PublishOptionsInput;
  Query: {};
  Recipe: Recipe;
  RecipeUpsertInput: RecipeUpsertInput;
  RecipesWhereInput: RecipesWhereInput;
  Response: Omit<Response, 'data'> & { data?: Maybe<ResolversParentTypes['ResponseData']> };
  ResponseData: ResolversParentTypes['Me'] | ResolversParentTypes['Recipe'] | ResolversParentTypes['Tag'];
  String: Scalars['String'];
  Tag: Tag;
  UpdateUserPreferencesInput: UpdateUserPreferencesInput;
  UserPreferences: UserPreferences;
};

export type MeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Me'] = ResolversParentTypes['Me']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  publishOptions?: Resolver<Maybe<ResolversTypes['PublishOptions']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  deleteRecipe?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteRecipeArgs, 'slug'>>;
  deleteTags?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteTagsArgs, 'ids'>>;
  importRecipes?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType, RequireFields<MutationImportRecipesArgs, 'data'>>;
  publishRecipe?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType, RequireFields<MutationPublishRecipeArgs, 'publishState' | 'recipeSlug'>>;
  publishSite?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType, Partial<MutationPublishSiteArgs>>;
  unpublishSite?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType>;
  updateUserPreferences?: Resolver<Maybe<ResolversTypes['UserPreferences']>, ParentType, ContextType, Partial<MutationUpdateUserPreferencesArgs>>;
  upsertRecipe?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType, RequireFields<MutationUpsertRecipeArgs, 'data' | 'tagsConnect' | 'tagsCreate'>>;
};

export type PublishOptionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublishOptions'] = ResolversParentTypes['PublishOptions']> = {
  publishId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  published?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<ResolversTypes['Me'], ParentType, ContextType>;
  recipes?: Resolver<Array<ResolversTypes['Recipe']>, ParentType, ContextType, Partial<QueryRecipesArgs>>;
  searchRecipes?: Resolver<Array<ResolversTypes['Recipe']>, ParentType, ContextType, Partial<QuerySearchRecipesArgs>>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
};

export type RecipeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Recipe'] = ResolversParentTypes['Recipe']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ingredients?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  instructions?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  published?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  data?: Resolver<Maybe<ResolversTypes['ResponseData']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResponseDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResponseData'] = ResolversParentTypes['ResponseData']> = {
  __resolveType: TypeResolveFn<'Me' | 'Recipe' | 'Tag', ParentType, ContextType>;
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPreferencesResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPreferences'] = ResolversParentTypes['UserPreferences']> = {
  theme?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Me?: MeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PublishOptions?: PublishOptionsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Recipe?: RecipeResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  ResponseData?: ResponseDataResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  UserPreferences?: UserPreferencesResolvers<ContextType>;
};


export const TagFieldsFragmentDoc = gql`
    fragment tagFields on Tag {
  id
  name
  slug
}
    `;
export const RecipeFieldsFragmentDoc = gql`
    fragment recipeFields on Recipe {
  id
  name
  slug
  description
  ingredients
  instructions
  published
  tags {
    ...tagFields
  }
}
    ${TagFieldsFragmentDoc}`;
export const PublishOptionsFieldsFragmentDoc = gql`
    fragment publishOptionsFields on PublishOptions {
  publishId
  published
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment userFields on Me {
  id
  name
  email
  publishOptions {
    ...publishOptionsFields
  }
}
    ${PublishOptionsFieldsFragmentDoc}`;
export const ResponseFieldsFragmentDoc = gql`
    fragment responseFields on Response {
  message
  error
  data {
    ... on Recipe {
      ...recipeFields
    }
    ... on Me {
      ...userFields
    }
    ... on Tag {
      ...tagFields
    }
  }
}
    ${RecipeFieldsFragmentDoc}
${UserFieldsFragmentDoc}
${TagFieldsFragmentDoc}`;
export const GetRecipesDocument = gql`
    query GetRecipes($where: RecipesWhereInput) {
  recipes(where: $where) {
    ...recipeFields
  }
}
    ${RecipeFieldsFragmentDoc}`;

/**
 * __useGetRecipesQuery__
 *
 * To run a query within a React component, call `useGetRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetRecipesQuery(baseOptions?: Apollo.QueryHookOptions<GetRecipesQuery, GetRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecipesQuery, GetRecipesQueryVariables>(GetRecipesDocument, options);
      }
export function useGetRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecipesQuery, GetRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecipesQuery, GetRecipesQueryVariables>(GetRecipesDocument, options);
        }
export type GetRecipesQueryHookResult = ReturnType<typeof useGetRecipesQuery>;
export type GetRecipesLazyQueryHookResult = ReturnType<typeof useGetRecipesLazyQuery>;
export type GetRecipesQueryResult = Apollo.QueryResult<GetRecipesQuery, GetRecipesQueryVariables>;
export const GetTagsDocument = gql`
    query GetTags {
  tags {
    ...tagFields
  }
}
    ${TagFieldsFragmentDoc}`;

/**
 * __useGetTagsQuery__
 *
 * To run a query within a React component, call `useGetTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
      }
export function useGetTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
        }
export type GetTagsQueryHookResult = ReturnType<typeof useGetTagsQuery>;
export type GetTagsLazyQueryHookResult = ReturnType<typeof useGetTagsLazyQuery>;
export type GetTagsQueryResult = Apollo.QueryResult<GetTagsQuery, GetTagsQueryVariables>;
export const SearchRecipesDocument = gql`
    query SearchRecipes($searchQuery: String!) {
  searchRecipes(query: $searchQuery) {
    ...recipeFields
  }
}
    ${RecipeFieldsFragmentDoc}`;

/**
 * __useSearchRecipesQuery__
 *
 * To run a query within a React component, call `useSearchRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchRecipesQuery({
 *   variables: {
 *      searchQuery: // value for 'searchQuery'
 *   },
 * });
 */
export function useSearchRecipesQuery(baseOptions: Apollo.QueryHookOptions<SearchRecipesQuery, SearchRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchRecipesQuery, SearchRecipesQueryVariables>(SearchRecipesDocument, options);
      }
export function useSearchRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchRecipesQuery, SearchRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchRecipesQuery, SearchRecipesQueryVariables>(SearchRecipesDocument, options);
        }
export type SearchRecipesQueryHookResult = ReturnType<typeof useSearchRecipesQuery>;
export type SearchRecipesLazyQueryHookResult = ReturnType<typeof useSearchRecipesLazyQuery>;
export type SearchRecipesQueryResult = Apollo.QueryResult<SearchRecipesQuery, SearchRecipesQueryVariables>;
export const GetMeDocument = gql`
    query GetMe {
  me {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const DeleteRecipeDocument = gql`
    mutation DeleteRecipe($recipeSlug: String!) {
  deleteRecipe(slug: $recipeSlug)
}
    `;
export type DeleteRecipeMutationFn = Apollo.MutationFunction<DeleteRecipeMutation, DeleteRecipeMutationVariables>;

/**
 * __useDeleteRecipeMutation__
 *
 * To run a mutation, you first call `useDeleteRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRecipeMutation, { data, loading, error }] = useDeleteRecipeMutation({
 *   variables: {
 *      recipeSlug: // value for 'recipeSlug'
 *   },
 * });
 */
export function useDeleteRecipeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRecipeMutation, DeleteRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRecipeMutation, DeleteRecipeMutationVariables>(DeleteRecipeDocument, options);
      }
export type DeleteRecipeMutationHookResult = ReturnType<typeof useDeleteRecipeMutation>;
export type DeleteRecipeMutationResult = Apollo.MutationResult<DeleteRecipeMutation>;
export type DeleteRecipeMutationOptions = Apollo.BaseMutationOptions<DeleteRecipeMutation, DeleteRecipeMutationVariables>;
export const UpsertRecipeDocument = gql`
    mutation UpsertRecipe($recipeId: String, $recipeData: RecipeUpsertInput!, $tagsConnect: [String!]!, $tagsCreate: [String!]!) {
  upsertRecipe(
    id: $recipeId
    data: $recipeData
    tagsConnect: $tagsConnect
    tagsCreate: $tagsCreate
  ) {
    ...responseFields
  }
}
    ${ResponseFieldsFragmentDoc}`;
export type UpsertRecipeMutationFn = Apollo.MutationFunction<UpsertRecipeMutation, UpsertRecipeMutationVariables>;

/**
 * __useUpsertRecipeMutation__
 *
 * To run a mutation, you first call `useUpsertRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertRecipeMutation, { data, loading, error }] = useUpsertRecipeMutation({
 *   variables: {
 *      recipeId: // value for 'recipeId'
 *      recipeData: // value for 'recipeData'
 *      tagsConnect: // value for 'tagsConnect'
 *      tagsCreate: // value for 'tagsCreate'
 *   },
 * });
 */
export function useUpsertRecipeMutation(baseOptions?: Apollo.MutationHookOptions<UpsertRecipeMutation, UpsertRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertRecipeMutation, UpsertRecipeMutationVariables>(UpsertRecipeDocument, options);
      }
export type UpsertRecipeMutationHookResult = ReturnType<typeof useUpsertRecipeMutation>;
export type UpsertRecipeMutationResult = Apollo.MutationResult<UpsertRecipeMutation>;
export type UpsertRecipeMutationOptions = Apollo.BaseMutationOptions<UpsertRecipeMutation, UpsertRecipeMutationVariables>;
export const UpdateUserPreferencesDocument = gql`
    mutation UpdateUserPreferences($preferences: UpdateUserPreferencesInput) {
  updateUserPreferences(preferences: $preferences) {
    theme
  }
}
    `;
export type UpdateUserPreferencesMutationFn = Apollo.MutationFunction<UpdateUserPreferencesMutation, UpdateUserPreferencesMutationVariables>;

/**
 * __useUpdateUserPreferencesMutation__
 *
 * To run a mutation, you first call `useUpdateUserPreferencesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPreferencesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPreferencesMutation, { data, loading, error }] = useUpdateUserPreferencesMutation({
 *   variables: {
 *      preferences: // value for 'preferences'
 *   },
 * });
 */
export function useUpdateUserPreferencesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserPreferencesMutation, UpdateUserPreferencesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserPreferencesMutation, UpdateUserPreferencesMutationVariables>(UpdateUserPreferencesDocument, options);
      }
export type UpdateUserPreferencesMutationHookResult = ReturnType<typeof useUpdateUserPreferencesMutation>;
export type UpdateUserPreferencesMutationResult = Apollo.MutationResult<UpdateUserPreferencesMutation>;
export type UpdateUserPreferencesMutationOptions = Apollo.BaseMutationOptions<UpdateUserPreferencesMutation, UpdateUserPreferencesMutationVariables>;
export const DeleteTagsDocument = gql`
    mutation DeleteTags($tagIds: [String!]!) {
  deleteTags(ids: $tagIds)
}
    `;
export type DeleteTagsMutationFn = Apollo.MutationFunction<DeleteTagsMutation, DeleteTagsMutationVariables>;

/**
 * __useDeleteTagsMutation__
 *
 * To run a mutation, you first call `useDeleteTagsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTagsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTagsMutation, { data, loading, error }] = useDeleteTagsMutation({
 *   variables: {
 *      tagIds: // value for 'tagIds'
 *   },
 * });
 */
export function useDeleteTagsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTagsMutation, DeleteTagsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTagsMutation, DeleteTagsMutationVariables>(DeleteTagsDocument, options);
      }
export type DeleteTagsMutationHookResult = ReturnType<typeof useDeleteTagsMutation>;
export type DeleteTagsMutationResult = Apollo.MutationResult<DeleteTagsMutation>;
export type DeleteTagsMutationOptions = Apollo.BaseMutationOptions<DeleteTagsMutation, DeleteTagsMutationVariables>;
export const PublishSiteDocument = gql`
    mutation PublishSite($publishOptions: PublishOptionsInput) {
  publishSite(publishOptions: $publishOptions) {
    ...responseFields
  }
}
    ${ResponseFieldsFragmentDoc}`;
export type PublishSiteMutationFn = Apollo.MutationFunction<PublishSiteMutation, PublishSiteMutationVariables>;

/**
 * __usePublishSiteMutation__
 *
 * To run a mutation, you first call `usePublishSiteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishSiteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishSiteMutation, { data, loading, error }] = usePublishSiteMutation({
 *   variables: {
 *      publishOptions: // value for 'publishOptions'
 *   },
 * });
 */
export function usePublishSiteMutation(baseOptions?: Apollo.MutationHookOptions<PublishSiteMutation, PublishSiteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishSiteMutation, PublishSiteMutationVariables>(PublishSiteDocument, options);
      }
export type PublishSiteMutationHookResult = ReturnType<typeof usePublishSiteMutation>;
export type PublishSiteMutationResult = Apollo.MutationResult<PublishSiteMutation>;
export type PublishSiteMutationOptions = Apollo.BaseMutationOptions<PublishSiteMutation, PublishSiteMutationVariables>;
export const UnpublishSiteDocument = gql`
    mutation UnpublishSite {
  unpublishSite {
    ...responseFields
  }
}
    ${ResponseFieldsFragmentDoc}`;
export type UnpublishSiteMutationFn = Apollo.MutationFunction<UnpublishSiteMutation, UnpublishSiteMutationVariables>;

/**
 * __useUnpublishSiteMutation__
 *
 * To run a mutation, you first call `useUnpublishSiteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnpublishSiteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unpublishSiteMutation, { data, loading, error }] = useUnpublishSiteMutation({
 *   variables: {
 *   },
 * });
 */
export function useUnpublishSiteMutation(baseOptions?: Apollo.MutationHookOptions<UnpublishSiteMutation, UnpublishSiteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnpublishSiteMutation, UnpublishSiteMutationVariables>(UnpublishSiteDocument, options);
      }
export type UnpublishSiteMutationHookResult = ReturnType<typeof useUnpublishSiteMutation>;
export type UnpublishSiteMutationResult = Apollo.MutationResult<UnpublishSiteMutation>;
export type UnpublishSiteMutationOptions = Apollo.BaseMutationOptions<UnpublishSiteMutation, UnpublishSiteMutationVariables>;
export const PublishRecipeDocument = gql`
    mutation PublishRecipe($recipeSlug: String!, $publishState: Boolean!) {
  publishRecipe(recipeSlug: $recipeSlug, publishState: $publishState) {
    ...responseFields
  }
}
    ${ResponseFieldsFragmentDoc}`;
export type PublishRecipeMutationFn = Apollo.MutationFunction<PublishRecipeMutation, PublishRecipeMutationVariables>;

/**
 * __usePublishRecipeMutation__
 *
 * To run a mutation, you first call `usePublishRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishRecipeMutation, { data, loading, error }] = usePublishRecipeMutation({
 *   variables: {
 *      recipeSlug: // value for 'recipeSlug'
 *      publishState: // value for 'publishState'
 *   },
 * });
 */
export function usePublishRecipeMutation(baseOptions?: Apollo.MutationHookOptions<PublishRecipeMutation, PublishRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishRecipeMutation, PublishRecipeMutationVariables>(PublishRecipeDocument, options);
      }
export type PublishRecipeMutationHookResult = ReturnType<typeof usePublishRecipeMutation>;
export type PublishRecipeMutationResult = Apollo.MutationResult<PublishRecipeMutation>;
export type PublishRecipeMutationOptions = Apollo.BaseMutationOptions<PublishRecipeMutation, PublishRecipeMutationVariables>;
export const ImportRecipesDocument = gql`
    mutation ImportRecipes($data: [RecipeUpsertInput!]!) {
  importRecipes(data: $data) {
    ...responseFields
  }
}
    ${ResponseFieldsFragmentDoc}`;
export type ImportRecipesMutationFn = Apollo.MutationFunction<ImportRecipesMutation, ImportRecipesMutationVariables>;

/**
 * __useImportRecipesMutation__
 *
 * To run a mutation, you first call `useImportRecipesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportRecipesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importRecipesMutation, { data, loading, error }] = useImportRecipesMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useImportRecipesMutation(baseOptions?: Apollo.MutationHookOptions<ImportRecipesMutation, ImportRecipesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ImportRecipesMutation, ImportRecipesMutationVariables>(ImportRecipesDocument, options);
      }
export type ImportRecipesMutationHookResult = ReturnType<typeof useImportRecipesMutation>;
export type ImportRecipesMutationResult = Apollo.MutationResult<ImportRecipesMutation>;
export type ImportRecipesMutationOptions = Apollo.BaseMutationOptions<ImportRecipesMutation, ImportRecipesMutationVariables>;