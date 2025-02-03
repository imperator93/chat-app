import { Button } from "./MinorComponents/Button";
import { avatarArr } from "../TEST-INPUTS/AvatarArr";
import { useState } from "react";

export const LoginComponent = ({
  handleSignInSubmit,
}: {
  handleSignInSubmit: (event: React.FormEvent, avatarSelected: string) => void;
}) => {
  const [avatarSelected, setAvatarSelected] = useState("");

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
        onSubmit={(event) => handleSignInSubmit(event, avatarSelected)}
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
          minLength={3}
          maxLength={15}
          required
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
        <div style={{ display: "flex" }}>
          {avatarArr.map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                position: "relative",
                width: "25%",
                justifyContent: "space-around",
              }}
            >
              <input
                required
                id={item}
                onClick={(event: React.BaseSyntheticEvent) =>
                  setAvatarSelected(event.target.id)
                }
                style={{
                  cursor: "pointer",
                  position: "relative",
                  opacity: "0",
                  zIndex: "1",
                  height: "50px",
                  width: "50px",
                  border: "1px solid lightGrey",
                  borderRadius: "0px",
                  padding: "2px 0px 2px 5px",
                  fontSize: "20px",
                }}
                placeholder="enter password"
                type="radio"
                name="avatar"
              />
              <img
                id={item + "input"}
                src={item}
                style={{
                  position: "absolute",
                  width: "50px",
                  height: "50px",
                  top: avatarSelected == item ? "-2px" : "",
                  border: avatarSelected == item ? "2px solid black" : "none",
                }}
              />
            </div>
          ))}
        </div>
        <Button>Submit</Button>
      </form>
    </div>
  );
};
