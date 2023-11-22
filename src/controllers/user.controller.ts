import { FastifyReply, FastifyRequest } from "fastify";
import { IUser } from "interfaces";
import * as db from "zapatos/db"
import pool from "../db/pgPool"
import type * as s from 'zapatos/schema'

const staticUsers: IUser[] = [
    {
        id: 1,
        name: 'Joyce Byers'
    },
    {
        id: 2,
        name: 'Omar Little'
    }
]

export const listUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    return db.select("users", db.all)
        .run(pool)
        .then(users => ({ data: users }))
}

type GetUserRequest = FastifyRequest<{
    Params: { userId: string }
  }>

export const getUser = async (request: GetUserRequest, reply: FastifyReply) => {
    const { userId } = request.params;
    return db.selectOne("users", { user_id: +userId })
        .run(pool)
        .then(user => {
            if (user)
                reply.send({ user })
            else reply.send({ error: "User not found" })
        })
        .catch(err => console.error(err))
}

type AddUserRequest = FastifyRequest<{
    Body: { "name": string }
}>

export const addUser = async (request: AddUserRequest, reply: FastifyReply) => {
    const { name } = request.body;
    return db.insert("users", { name })
        .run(pool)
        .then(user => ({ user, message: "User added successfully" }))
        .catch(err => ({ message: "Could not add user", error: err }))
}

type UpdateUserRequest = FastifyRequest<{
    Body: Partial<Omit<IUser, "id">>,
    Params: { userId: string }
}>

export const updateUser = async (request: UpdateUserRequest, reply: FastifyReply) => {
    const newUserData = request.body;
    const { userId } = request.params;
    return db.update("users", newUserData, { user_id: +userId })
        .run(pool)
        .then(user => ({ user, message: "User updated successfully" }))
        .catch(err => ({ message:"Could not update user", error: err }))
}