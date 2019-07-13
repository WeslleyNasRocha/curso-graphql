const postTypes = `

  type Post {
    id: ID!
    title: String!
    content: String!
    photo: String
    author: User!
    comments: [Comment!]!
    createAt: String!
    updatedAt: String!
  }

  input PostInput {
    title: String!
    content: String!
    photo: String!
    author: Int!
  }

`;

const postQuerys = `
  posts(first: Int, offset: Int) : [Post!]!
  post(id: ID!): Post
`;

const postMutations = `
  createPost(input: PostInput!): Post
  updatePost(id: ID!, input: PostInput!): Post
  deletePost(id: ID!): Boolean
`;

export { postTypes, postQuerys, postMutations };
