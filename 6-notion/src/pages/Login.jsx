import { useState, useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    const response = {
      id: 1,
      username: username,
    };
    setUser(response);
    navigate("/notes");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
