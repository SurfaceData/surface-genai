import { Prisma } from "@prisma/client"
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: number;
  Date: string;
  DateTime: string;
  JSON: Prisma.JsonValue;
  JSONObject: Prisma.JsonObject;
  Time: string;
};

export type ChatConversation = {
  __typename?: 'ChatConversation';
  id: Scalars['String'];
  messages?: Maybe<Array<Maybe<ChatMessage>>>;
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  content: Scalars['String'];
  source: Scalars['String'];
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
  generate: GenerateResults;
  startChat: ChatConversation;
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

export type StartChatMutationVariables = Exact<{
  input: StartChatRequest;
}>;


export type StartChatMutation = { __typename?: 'Mutation', startChat: { __typename?: 'ChatConversation', id: string, messages?: Array<{ __typename?: 'ChatMessage', source: string, content: string } | null> | null } };

export type GenerateMutationVariables = Exact<{
  input: GenerateRequest;
}>;


export type GenerateMutation = { __typename?: 'Mutation', generate: { __typename?: 'GenerateResults', results?: Array<{ __typename?: 'GenerateResult', text: string } | null> | null } };
