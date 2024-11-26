import { BottomWarning } from "../Elements/BottomWarning";
import { Button } from "../Elements/Button";
import { Heading } from "../Elements/Heading";
import { InputBox } from "../Elements/InputBox";
import { SubHeading } from "../Elements/SubHeading";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//mockUsers.json is in src/data folder
import mockUsers from "../../data/mockUsers.json";

export const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const response = localStorage.getItem("token");
    if (response !== null) navigate("/users");
  }, [navigate]);

  const handleSignIn = () => {
    // Check if the username and password match any entry in the JSON
    const user = mockUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem("token", "mock-token"); // Store a mock token
      navigate("/users");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />

          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin@gmail.com"
            label={"Email"}
          />

          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin123"
            label={"Password"}
            type="password"
          />

          {error && <p className="text-red-500">{error}</p>}

          <div className="pt-4">
            <Button onClick={handleSignIn} label={"Sign in"} />
          </div>

          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
