import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { User } from "../Models/user.model";

import { MessageComponent } from "./MessageComponent";

export function ChatComponent(props: {
  registeredUsers: User[];
  currentUser: User;
  signOutHandler: () => void;
  sendMessage: (event: React.BaseSyntheticEvent) => void;
}) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Typography variant="h4" sx={{ flexBasis: "100%", margin: "auto" }}>
          My chat app
        </Typography>

        <p style={{ margin: "0" }}>
          You are now logged in as{" "}
          <span style={{ color: "red" }}>{props.currentUser.username}</span>
        </p>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "200px",
              width: "30vw",
              minWidth: "350px",
              height: "30vh",
              marginBottom: "2px",
              padding: "2px",

              overflow: "auto",
            }}
          >
            {props.currentUser.userMessages &&
              props.currentUser.userMessages?.map((messages) => (
                <MessageComponent
                  key={messages.id}
                  currentUser={props.currentUser}
                  message={messages.message}
                  id={messages.id}
                ></MessageComponent>
              ))}
          </Paper>
          <div
            style={{
              width: "200px",
              border: "2px solid black",
              marginLeft: "20px",
              textAlign: "center",
            }}
          >
            Active Users
            {props.registeredUsers.map(
              (user) =>
                user.isSignedIn && (
                  <p
                    key={user.userId}
                    style={{
                      margin: "0",
                      border: "1px solid white",
                      borderRadius: "10px",
                      backgroundColor: "lightBlue",
                    }}
                  >
                    {user.username}
                  </p>
                )
            )}
          </div>
        </div>

        <form
          onSubmit={(event) => props.sendMessage(event)}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            minWidth: "350px",
            width: "30vw",
            margin: "auto",
          }}
        >
          <TextField
            sx={{ flexGrow: 1 }}
            inputProps={{
              style: {
                padding: 2,
                paddingLeft: 5,
              },
            }}
          ></TextField>
          <Button type="submit" sx={{ height: "2em" }}>
            Send
          </Button>
        </form>
        <Button onClick={props.signOutHandler} sx={{ color: "purple" }}>
          Sign out
        </Button>
      </Box>
    </>
  );
}
