import { FastifyInstance } from "fastify";
import {
  allUsers,
  oneUser,
  addUser,
  deleteUser,
  editUser,
} from "../controllers/userController";

const userRouter = (fastify: FastifyInstance, opts: any, done: () => void) => {
  fastify.get("/", allUsers);
  fastify.get("/:id", oneUser);
  fastify.post("/addUser", addUser);
  fastify.delete("/deleteUser/:id", deleteUser);
  fastify.put("/editUser/:id", editUser);

  done();
};

export default userRouter;
