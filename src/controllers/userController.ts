import { myDataSource } from "../libs/app-data-source";
import { user } from "../models/user.entity";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { DeepPartial } from "typeorm"; // Import DeepPartial from TypeORM

export const allUsers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await myDataSource.getRepository(user).find();
    reply.send(users);
  } catch (error) {
    console.error("Error:", error);
    reply.status(500).send("Internal server error"); // Handle internal server error
  }
};

export const oneUser = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const userId = request.params.id;

    const results = await myDataSource
      .getRepository(user)
      .findOneBy({ id: userId });

    if (!results) {
      reply.status(404).send("User not found");
      return;
    }

    reply.send(results);
  } catch (error) {
    console.error("Error:", error);
    reply.status(500).send("Internal server error");
  }
};

export const addUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const data = request.body as DeepPartial<user>;
  try {
    const user0 = myDataSource.getRepository(user).create(data);
    const results = await myDataSource.getRepository(user).save(user0);
    reply.send(results);
  } catch (error) {
    console.error("Error:", error);
    reply.status(500).send("Internal server error");
  }
};

export const editUser = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    // Find the user by ID
    const userId = request.params.id;
    const userRepository = myDataSource.getRepository(user);
    const user0 = await userRepository.findOneBy({ id: userId });

    if (!user0) {
      reply.status(404).send("User not found");
      return;
    }
    const data = request.body as DeepPartial<user>;

    // Merge request body with the existing user data
    userRepository.merge(user0, data);

    // Save the updated user data
    const results = await userRepository.save(user0);
    reply.send(results);
  } catch (error) {
    console.error("Error:", error);
    reply.status(500).send("Internal server error");
  }
};

export const deleteUser = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const results = await myDataSource
      .getRepository(user)
      .delete(request.params.id);
    reply.send(results);
  } catch (error) {
    reply.status(500).send("Internal server error");
  }
};
