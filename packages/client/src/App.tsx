import { trpc } from "@wos/client/src/utils/trpc";
import { useEffect } from "react";

function App() {
  const { data } = trpc.users.hello.useQuery();

  const { data: word } = trpc.words.wordOfDay.useQuery();

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
      <p>Dagens ord: {word?.wordOfDay}</p>
      {word?.href ? <a href={word.href}>Se definition</a> : null}

      <button onClick={handleClick}>Add user</button>
    </div>
  );
}

export default App;
