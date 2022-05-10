import { GraphQLResolveInfo } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  recipe?: Maybe<Recipe>;
  recipes: Array<Recipe>;
  tags?: Maybe<Array<Maybe<Tag>>>;
};


export type QueryRecipeArgs = {
  slug: Scalars['String'];
};

export type Recipe = {
  __typename?: 'Recipe';
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  ingredients: Scalars['String'];
  instructions: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type GetRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecipesQuery = { __typename?: 'Query', recipes: Array<{ __typename?: 'Recipe', id: string, name: string, slug: string, description?: string | null, ingredients: string, instructions: string, tags?: Array<{ __typename?: 'Tag', id: string, name: string } | null> | null }> };

export type GetSingleRecipeQueryVariables = Exact<{
  recipeSlug: Scalars['String'];
}>;


export type GetSingleRecipeQuery = { __typename?: 'Query', recipe?: { __typename?: 'Recipe', id: string, name: string, slug: string, description?: string | null, ingredients: string, instructions: string, tags?: Array<{ __typename?: 'Tag', id: string, name: string } | null> | null } | null };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { __typename?: 'Query', tags?: Array<{ __typename?: 'Tag', id: string, name: string } | null> | null };



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
  Query: ResolverTypeWrapper<{}>;
  Recipe: ResolverTypeWrapper<Recipe>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Tag: ResolverTypeWrapper<Tag>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Query: {};
  Recipe: Recipe;
  String: Scalars['String'];
  Tag: Tag;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  recipe?: Resolver<Maybe<ResolversTypes['Recipe']>, ParentType, ContextType, RequireFields<QueryRecipeArgs, 'slug'>>;
  recipes?: Resolver<Array<ResolversTypes['Recipe']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
};

export type RecipeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Recipe'] = ResolversParentTypes['Recipe']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ingredients?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  instructions?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  Recipe?: RecipeResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
};



export const GetRecipesDocument = `
    query GetRecipes {
  recipes {
    id
    name
    slug
    description
    ingredients
    instructions
    tags {
      id
      name
    }
  }
}
    `;
export const useGetRecipesQuery = <
      TData = GetRecipesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetRecipesQueryVariables,
      options?: UseQueryOptions<GetRecipesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetRecipesQuery, TError, TData>(
      variables === undefined ? ['GetRecipes'] : ['GetRecipes', variables],
      fetcher<GetRecipesQuery, GetRecipesQueryVariables>(client, GetRecipesDocument, variables, headers),
      options
    );
export const GetSingleRecipeDocument = `
    query GetSingleRecipe($recipeSlug: String!) {
  recipe(slug: $recipeSlug) {
    id
    name
    slug
    description
    ingredients
    instructions
    tags {
      id
      name
    }
  }
}
    `;
export const useGetSingleRecipeQuery = <
      TData = GetSingleRecipeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetSingleRecipeQueryVariables,
      options?: UseQueryOptions<GetSingleRecipeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetSingleRecipeQuery, TError, TData>(
      ['GetSingleRecipe', variables],
      fetcher<GetSingleRecipeQuery, GetSingleRecipeQueryVariables>(client, GetSingleRecipeDocument, variables, headers),
      options
    );
export const GetTagsDocument = `
    query GetTags {
  tags {
    id
    name
  }
}
    `;
export const useGetTagsQuery = <
      TData = GetTagsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetTagsQueryVariables,
      options?: UseQueryOptions<GetTagsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetTagsQuery, TError, TData>(
      variables === undefined ? ['GetTags'] : ['GetTags', variables],
      fetcher<GetTagsQuery, GetTagsQueryVariables>(client, GetTagsDocument, variables, headers),
      options
    );