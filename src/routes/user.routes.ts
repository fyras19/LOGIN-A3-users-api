import { FastifyInstance } from "fastify";
import * as controllers from "../controllers"
import * as schemas from "../schema"

export async function userRouter(fastify: FastifyInstance) {

    fastify.route({
        method: 'GET',
        url: '/',
        handler: controllers.listUsers,
    })

    fastify.route({
        method: 'GET',
        url: '/:userId',
        handler: controllers.getUser,
    })

    fastify.route({
        method: 'POST',
        url: '/',
        handler: controllers.addUser,
        schema: schemas.userCreateSchema
    })

    fastify.route({
        method: 'PUT',
        url: '/:userId',
        handler: controllers.updateUser,
        schema: schemas.userUpdateSchema
    })

}