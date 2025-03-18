import express, { json } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import axios from 'axios'


async function startServer() {
    const app = express()
    const server = new ApolloServer({
        typeDefs: `
        type User{
            id:ID!
            name:String!
            username:String!
            email:String!
            phone:String!
            website:String!
        }

        type Todo{
            id:ID!
            title:String!
            completed:Boolean!
            user:User
        }

        type Query {
            getTodos: [Todo]
            getAllUsers: [User]
            getUser(id:ID!): User
        }
        `,
        resolvers: {
            Todo: {
                user: async (todo) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data
            },
            Query: {
                // getTodos: () => {
                //     return [
                //         { id: 1, title: 'Todo 1', completed: false },
                //         { id: 2, title: 'Todo 2', completed: false },
                //         { id: 3, title: 'Todo 3', completed: false },
                //         { id: 4, title: 'Todo 4', completed: false },
                //     ]
                // }
                getTodos: async () => (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
                getAllUsers: async () => (await axios.get('https://jsonplaceholder.typicode.com/users')).data,
                getUser: async (parent, args) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${args.id}`)).data
            }
        }
    })

    app.use(json())
    app.use(cors())

    await server.start()

    app.use('/graphql', expressMiddleware(server))
    app.listen(8000, () => console.log(`🚀 Server ready at PORT 8000`))
}

startServer()