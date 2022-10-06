import { gql } from '@apollo/client';

export const QUERY_COMMENTS = gql`
  query comments($username: String) {
    comments(username: $username) {
      _id
      commentText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_COMMENT = gql`
  query comment($id: ID!) {
    comment(_id: $id) {
      _id
      commentText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      comments {
        _id
        commentText
        createdAt
        reactionCount
      }
    }
  }
`;