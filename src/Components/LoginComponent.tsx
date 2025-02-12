import { Button } from "./MinorComponents/Button";
import { InputComponent } from "./MinorComponents/InputComponent";

import { UserValidation } from "../Types/UserValidation";

export const LoginComponent = ({
  handleLogInSubmit,
  handleLogToSignSwitch,
  userValidated,
}: {
  handleLogInSubmit: (event: React.FormEvent) => void;
  handleLogToSignSwitch: () => void;
  userValidated: UserValidation;
}) => {
  return (
    <div
      className="login-component-container"
      style={{
        width: "20vw",
        minWidth: "200px",
        height: "300px",
        borderRadius: "20px",
        margin: "auto",
        padding: "40px 50px 30px 50px ",
        background: "white",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Log In</h1>
      <form
        onSubmit={(event) => handleLogInSubmit(event)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "70%",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>
            <strong style={{ fontSize: "20px" }}>Username</strong>
          </label>

          {userValidated.invalidName && (
            <p style={{ color: "red" }}>{userValidated.nameMessage}</p>
          )}

          <InputComponent placeholder="enter username" type="text" />

          <label>
            <strong style={{ fontSize: "20px", height: "50px", width: "100%" }}>
              Password
            </strong>
          </label>

          {userValidated.invalidPass && (
            <p style={{ color: "red" }}>{userValidated.passMessage}</p>
          )}

          <InputComponent placeholder="enter password" type="password" />
          <br />
        </div>

        <Button>Submit</Button>
      </form>
      <button onClick={() => handleLogToSignSwitch()}>
        Back to sign in screen
      </button>
    </div>
  );
};
