import { FastifyReply, FastifyRequest } from "fastify";
import { IUser } from "interfaces";

const staticUsers: IUser[] = [
    {
        id: 1,
        name: 'Joyce Byers'
    },
    {
        id: 2,
        name: 'Jeremy Corbyn'
    }
]

export const listUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    Promise.resolve(staticUsers)
        .then(users => {
            reply.send({data: users})
        })
}

type GetUserRequest = FastifyRequest<{
    Params: { userId: string }
  }>

export const getUser = async (request: GetUserRequest, reply: FastifyReply) => {
    const { userId } = request.params;
    Promise.resolve(staticUsers.find(user => user.id === +userId))
        .then(user => {
            if (user)
                reply.send({ data: user })
            else reply.send({ error: "User not found" })
        })
}

type AddUserRequest = FastifyRequest<{
    Body: { "name": string }
}>

export const addUser = async (request: AddUserRequest, reply: FastifyReply) => {
    const { name } = request.body;
    /* if (!name) {
        reply.send({ error: "Name not specified!" })
        return
    } */
    Promise.resolve(staticUsers)
        .then(users => {
            const user = { id: users.length+1, name }
            try {
                users.push(user)
                reply.send({ user, message: "User added successfully" })
            } catch (error) {
                reply.send({ error: "Error! User was not added" })
            }
        })
}

type UpdateUserRequest = FastifyRequest<{
    Body: Partial<Omit<IUser, "id">>,
    Params: { userId: string }
}>

export const updateUser = async (request: UpdateUserRequest, reply: FastifyReply) => {
    const newUserData = request.body;
    const { userId } = request.params;
    Promise.resolve(staticUsers.find(user => user.id === +userId))
        .then(user => {
            if (user) {
                if (newUserData.name) user.name = newUserData.name
                if (newUserData.score) user.score = newUserData.score
                reply.send({ user, message: "User data updated successfully" })                
            }
            else reply.send({ error: "User not found" })
        })
}