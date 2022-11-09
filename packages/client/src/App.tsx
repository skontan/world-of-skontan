import { trpc } from "@wos/client/src/utils/trpc";

function App() {
  const { data } = trpc.users.hello.useQuery();

  const { mutate: createUserMutation } = trpc.users.addUser.useMutation({
    onSuccess: (data, variables, context) => {
      console.log("Successfully created user:", { data });
      console.log({ variables, context });
    },
  });

  const handleClick = () => {
    createUserMutation({
      name: "Jonathan",
      email: "skontan@gmail.com",
      password: "Hej123",
    });
  };

  return (
    <div>
      <p>{data?.message}</p>
      <button onClick={handleClick}>Add user</button>
    </div>
  );
}

export default App;
