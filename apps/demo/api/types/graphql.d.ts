import { Prisma } from "@prisma/client"
import { MergePrismaWithSdlTypes, MakeRelationsOptional } from '@redwoodjs/api'
import { Prompt as PrismaPrompt, InteractionLog as PrismaInteractionLog, InteractionEvaluationLog as PrismaInteractionEvaluationLog, ChatLog as PrismaChatLog, ChatEvaluationLog as PrismaChatEvaluationLog } from '@prisma/client'
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/functions/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
      args?: TArgs,
      obj?: { root: TParent; context: TContext; info: GraphQLResolveInfo }
    ) => TResult | Promise<TResult>
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
export type OptArgsResolverFn<TResult, TParent = {}, TContext = {}, TArgs = {}> = (
      args?: TArgs,
      obj?: { root: TParent; context: TContext; info: GraphQLResolveInfo }
    ) => TResult | Promise<TResult>

    export type RequiredResolverFn<TResult, TParent = {}, TContext = {}, TArgs = {}> = (
      args: TArgs,
      obj: { root: TParent; context: TContext; info: GraphQLResolveInfo }
    ) => TResult | Promise<TResult>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: number;
  Date: Date | string;
  DateTime: Date | string;
  JSON: Prisma.JsonValue;
  JSONObject: Prisma.JsonObject;
  Time: Date | string;
};

export type ChatConversation = {
  __typename?: 'ChatConversation';
  id: Scalars['String'];
  messages?: Maybe<Array<Maybe<ChatMessage>>>;
  requestId: Scalars['String'];
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  content: Scalars['String'];
  source: Scalars['String'];
};

export type ChatRequest = {
  id: Scalars['String'];
  query: Scalars['String'];
};

export type EvaluateRequest = {
  evalType: Scalars['String'];
  interactionType: Scalars['String'];
  rating: Scalars['String'];
  requestId: Scalars['String'];
};

export type EvaluateResponse = {
  __typename?: 'EvaluateResponse';
  id: Scalars['String'];
};

export type GenerateRequest = {
  fields: Scalars['String'];
  label: Scalars['String'];
};

export type GenerateResult = {
  __typename?: 'GenerateResult';
  text: Scalars['String'];
};

export type GenerateResults = {
  __typename?: 'GenerateResults';
  requestId: Scalars['Int'];
  results?: Maybe<Array<Maybe<GenerateResult>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  chat: ChatConversation;
  evaluate: EvaluateResponse;
  generate: GenerateResults;
  startChat: ChatConversation;
};


export type MutationchatArgs = {
  input: ChatRequest;
};


export type MutationevaluateArgs = {
  input: EvaluateRequest;
};


export type MutationgenerateArgs = {
  input: GenerateRequest;
};


export type MutationstartChatArgs = {
  input: StartChatRequest;
};

/** About the Redwood queries. */
export type Query = {
  __typename?: 'Query';
  /** Fetches the Redwood root schema. */
  redwood?: Maybe<Redwood>;
};

/**
 * The RedwoodJS Root Schema
 *
 * Defines details about RedwoodJS such as the current user and version information.
 */
export type Redwood = {
  __typename?: 'Redwood';
  /** The current user. */
  currentUser?: Maybe<Scalars['JSON']>;
  /** The version of Prisma. */
  prismaVersion?: Maybe<Scalars['String']>;
  /** The version of Redwood. */
  version?: Maybe<Scalars['String']>;
};

export type StartChatRequest = {
  fields: Scalars['String'];
  label: Scalars['String'];
};

type MaybeOrArrayOfMaybe<T> = T | Maybe<T> | Maybe<T>[];
type AllMappedModels = MaybeOrArrayOfMaybe<>


export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

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
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ChatConversation: ResolverTypeWrapper<ChatConversation>;
  ChatMessage: ResolverTypeWrapper<ChatMessage>;
  ChatRequest: ChatRequest;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  EvaluateRequest: EvaluateRequest;
  EvaluateResponse: ResolverTypeWrapper<EvaluateResponse>;
  GenerateRequest: GenerateRequest;
  GenerateResult: ResolverTypeWrapper<GenerateResult>;
  GenerateResults: ResolverTypeWrapper<GenerateResults>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Redwood: ResolverTypeWrapper<Redwood>;
  StartChatRequest: StartChatRequest;
  String: ResolverTypeWrapper<Scalars['String']>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BigInt: Scalars['BigInt'];
  Boolean: Scalars['Boolean'];
  ChatConversation: ChatConversation;
  ChatMessage: ChatMessage;
  ChatRequest: ChatRequest;
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  EvaluateRequest: EvaluateRequest;
  EvaluateResponse: EvaluateResponse;
  GenerateRequest: GenerateRequest;
  GenerateResult: GenerateResult;
  GenerateResults: GenerateResults;
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  Mutation: {};
  Query: {};
  Redwood: Redwood;
  StartChatRequest: StartChatRequest;
  String: Scalars['String'];
  Time: Scalars['Time'];
};

export type requireAuthDirectiveArgs = {
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type requireAuthDirectiveResolver<Result, Parent, ContextType = RedwoodGraphQLContext, Args = requireAuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type skipAuthDirectiveArgs = { };

export type skipAuthDirectiveResolver<Result, Parent, ContextType = RedwoodGraphQLContext, Args = skipAuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type ChatConversationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['ChatConversation'] = ResolversParentTypes['ChatConversation']> = {
  id: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  messages: OptArgsResolverFn<Maybe<Array<Maybe<ResolversTypes['ChatMessage']>>>, ParentType, ContextType>;
  requestId: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatConversationRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['ChatConversation'] = ResolversParentTypes['ChatConversation']> = {
  id?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  messages?: RequiredResolverFn<Maybe<Array<Maybe<ResolversTypes['ChatMessage']>>>, ParentType, ContextType>;
  requestId?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatMessageResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['ChatMessage'] = ResolversParentTypes['ChatMessage']> = {
  content: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  source: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatMessageRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['ChatMessage'] = ResolversParentTypes['ChatMessage']> = {
  content?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  source?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EvaluateResponseResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['EvaluateResponse'] = ResolversParentTypes['EvaluateResponse']> = {
  id: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EvaluateResponseRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['EvaluateResponse'] = ResolversParentTypes['EvaluateResponse']> = {
  id?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenerateResultResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['GenerateResult'] = ResolversParentTypes['GenerateResult']> = {
  text: OptArgsResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenerateResultRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['GenerateResult'] = ResolversParentTypes['GenerateResult']> = {
  text?: RequiredResolverFn<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenerateResultsResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['GenerateResults'] = ResolversParentTypes['GenerateResults']> = {
  requestId: OptArgsResolverFn<ResolversTypes['Int'], ParentType, ContextType>;
  results: OptArgsResolverFn<Maybe<Array<Maybe<ResolversTypes['GenerateResult']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenerateResultsRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['GenerateResults'] = ResolversParentTypes['GenerateResults']> = {
  requestId?: RequiredResolverFn<ResolversTypes['Int'], ParentType, ContextType>;
  results?: RequiredResolverFn<Maybe<Array<Maybe<ResolversTypes['GenerateResult']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JSONScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JSONObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type MutationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  chat: Resolver<ResolversTypes['ChatConversation'], ParentType, ContextType, RequireFields<MutationchatArgs, 'input'>>;
  evaluate: Resolver<ResolversTypes['EvaluateResponse'], ParentType, ContextType, RequireFields<MutationevaluateArgs, 'input'>>;
  generate: Resolver<ResolversTypes['GenerateResults'], ParentType, ContextType, RequireFields<MutationgenerateArgs, 'input'>>;
  startChat: Resolver<ResolversTypes['ChatConversation'], ParentType, ContextType, RequireFields<MutationstartChatArgs, 'input'>>;
};

export type MutationRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  chat?: RequiredResolverFn<ResolversTypes['ChatConversation'], ParentType, ContextType, RequireFields<MutationchatArgs, 'input'>>;
  evaluate?: RequiredResolverFn<ResolversTypes['EvaluateResponse'], ParentType, ContextType, RequireFields<MutationevaluateArgs, 'input'>>;
  generate?: RequiredResolverFn<ResolversTypes['GenerateResults'], ParentType, ContextType, RequireFields<MutationgenerateArgs, 'input'>>;
  startChat?: RequiredResolverFn<ResolversTypes['ChatConversation'], ParentType, ContextType, RequireFields<MutationstartChatArgs, 'input'>>;
};

export type QueryResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  redwood: OptArgsResolverFn<Maybe<ResolversTypes['Redwood']>, ParentType, ContextType>;
};

export type QueryRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  redwood?: RequiredResolverFn<Maybe<ResolversTypes['Redwood']>, ParentType, ContextType>;
};

export type RedwoodResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Redwood'] = ResolversParentTypes['Redwood']> = {
  currentUser: OptArgsResolverFn<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  prismaVersion: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version: OptArgsResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RedwoodRelationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Redwood'] = ResolversParentTypes['Redwood']> = {
  currentUser?: RequiredResolverFn<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  prismaVersion?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: RequiredResolverFn<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export type Resolvers<ContextType = RedwoodGraphQLContext> = {
  BigInt: GraphQLScalarType;
  ChatConversation: ChatConversationResolvers<ContextType>;
  ChatMessage: ChatMessageResolvers<ContextType>;
  Date: GraphQLScalarType;
  DateTime: GraphQLScalarType;
  EvaluateResponse: EvaluateResponseResolvers<ContextType>;
  GenerateResult: GenerateResultResolvers<ContextType>;
  GenerateResults: GenerateResultsResolvers<ContextType>;
  JSON: GraphQLScalarType;
  JSONObject: GraphQLScalarType;
  Mutation: MutationResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  Redwood: RedwoodResolvers<ContextType>;
  Time: GraphQLScalarType;
};

export type DirectiveResolvers<ContextType = RedwoodGraphQLContext> = {
  requireAuth: requireAuthDirectiveResolver<any, any, ContextType>;
  skipAuth: skipAuthDirectiveResolver<any, any, ContextType>;
};
