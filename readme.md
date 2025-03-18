# Todo App (GraphQL Application)

A full-stack application using React (Apollo Client) for the frontend and a GraphQL server for the backend.

## 📦 Installation

Clone the repository and install dependencies:

```sh
yarn install
```

## Start the Server

```sh
yarn start
```

## Start the Client

```sh
yarn run dev

# 📡 API Query Example

```graphql
query GetTodosWithUser {
  getTodos {
    id
    title
    completed
    user {
      id
      name
    }
  }
}


# 🛠 Tech Stack

- **Frontend:** React, Apollo Client
- **Backend:** Node.js, GraphQL
- **Package Manager:** Yarn
```
