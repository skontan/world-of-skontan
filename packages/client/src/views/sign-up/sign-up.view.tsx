import { useState } from "react";
import { Flex } from "../../atoms/flex";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }

    if (e.target.name === "password") {
      setPassword(e.target.value);
    }

    if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {};
  return (
    <Flex column alignItems="center">
      <h1>Sign Up</h1>
      <Flex row justifyContent="space-between" width="300px">
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
      </Flex>

      <Flex row justifyContent="space-between" width="300px">
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />
      </Flex>

      <Flex row justifyContent="space-between" width="300px">
        <label>Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleChange}
        />
      </Flex>
      <button onClick={handleClick}>Sign up</button>
    </Flex>
  );
}
