import fastify from "fastify";
import { userRouter } from "./routes/user.routes";
//import fastifyPostgres from "@fastify/postgres";

const port = 5000;

const startServer = async () => {
    try {
        const server = fastify()

        const errorHandler = (error, address) => {
            server.log.error(error, address)
        }

        /* server.register(fastifyPostgres, {
            connectionString: 'postgres://jdhdauqd:UM5xH4ElNGBjV2Xn5RDW-drFpbuW6UQ2@flora.db.elephantsql.com/jdhdauqd'
        }) */

        server.register(userRouter, { prefix: '/api/user' })

        await server.listen({ port }, errorHandler)
    } catch (e) {
        console.error(e)
    }
}

process.on('unhandledRejection', e => {
    console.error(e)
    process.exit(1)
})

startServer()