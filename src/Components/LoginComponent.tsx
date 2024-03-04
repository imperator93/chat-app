import { Box, Button, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

import { idGenerator } from "../helpers/idGenerator";
import { User } from "../Models/user.model";

export function Login(props: {
  setCurrentUser: (user: User) => void;
  currentUser: User;
  onLogin: (event: React.BaseSyntheticEvent) => void;
}) {
  //STYLE helper
  const textFieldProps = {
    style: {
      padding: "2px",
      paddingLeft: "5px",
    },
  };

  type LoginInfo = {
    username: string;
    password: string;
  };

  //ON REGISTER
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInfo>();

  const onRegister: SubmitHandler<LoginInfo> = (data, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();

    props.setCurrentUser({
      ...props.currentUser,
      username: data.username,
      password: data.password,
      userId: idGenerator(),
      isRegistered: true,
    });

    reset();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "300px",
          width: "50%",
          margin: "auto",
        }}
      >
        {/* ON LOGIN */}
        <form
          onSubmit={(event) => props.onLogin(event)}
          style={{ display: " flex ", flexDirection: "column" }}
        >
          <Typography variant="h3" color="secondary" sx={{ textAlign: "center" }}>
            Log in
          </Typography>

          <label>Name</label>
          <TextField required sx={{ maxWidth: "300px" }} inputProps={textFieldProps}></TextField>

          <label>Password</label>
          <TextField
            type="password"
            sx={{ maxWidth: "300px" }}
            inputProps={textFieldProps}
          ></TextField>

          <Button type="submit">Sign in</Button>
        </form>

        <p style={{ marginTop: "0" }}>or</p>

        {/*ON REGISTER */}
        <form
          onSubmit={handleSubmit(onRegister)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Typography sx={{ justifyContent: "flex-start" }} variant="h6" color={"green"}>
            Register
          </Typography>

          <label>Name*</label>
          {errors.username && (
            <p style={{ margin: "0", color: "red", fontSize: "12px" }}>
              {errors?.username.message}
            </p>
          )}
          <TextField
            {...register("username", {
              required: "Username is required",
              maxLength: 15,
              minLength: 2,
            })}
            sx={{ maxWidth: "300px" }}
            inputProps={textFieldProps}
          ></TextField>

          <label>Password*</label>
          {errors.password && (
            <p style={{ margin: "0", color: "red", fontSize: "12px" }}>{errors.password.message}</p>
          )}
          <TextField
            {...register("password", {
              required: "Password is required",
              maxLength: { value: 15, message: "TOO LONG!" },
              minLength: { value: 2, message: "TOO SHORT!" },
            })}
            type="password"
            sx={{ maxWidth: "300px" }}
            inputProps={textFieldProps}
          ></TextField>

          <Button type="submit">Register</Button>
        </form>
      </Box>
    </>
  );
}
