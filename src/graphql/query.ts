import { userQuerys } from "./resources/user/user.schema";
import { postQuerys } from "./resources/post/post.schema";

const Query = `
  type Query {
    ${userQuerys}
    ${postQuerys}
  }
`;

export { Query };
