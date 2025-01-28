import { Button } from "./MinorComponents/Button";

export const LoginComponent = ({
  handleSignInSubmit,
}: {
  handleSignInSubmit: () => void;
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
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Sign In</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "70%",
          gap: "10px",
        }}
      >
        <label>
          <strong style={{ fontSize: "20px" }}>Username</strong>
        </label>
        <input
          style={{
            height: "30px",
            border: "1px solid lightGrey",
            borderRadius: "5px",
            padding: "2px 0px 2px 5px",
            fontSize: "20px",
          }}
          placeholder="enter username"
          type="text"
        />
        <label>
          <strong style={{ fontSize: "20px" }}>Pick avatar</strong>
        </label>
        <input
          style={{
            height: "30px",
            border: "1px solid lightGrey",
            borderRadius: "5px",
            padding: "2px 0px 2px 5px",
            fontSize: "20px",
          }}
          placeholder="enter password"
          type="radio"
        />
        <Button>Submit</Button>
      </form>
    </div>
  );
};
