import { gql, useQuery } from "@apollo/client";

const query = gql`
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
`;

function App() {
  const { data, loading, error } = useQuery(query);
  if (error) return <h1>Error: {error.message}</h1>;
  if (loading) return <h1>Loading ...</h1>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default App;
