import { userQuerys } from "./resources/user/user.schema";
import { postQuerys } from "./resources/post/post.schema";
import { commentQueries } from "./resources/comment/comment.schema";

const Query = `
  type Query {
    ${commentQueries}
    ${userQuerys}
    ${postQuerys}
  }
`;

export { Query };
