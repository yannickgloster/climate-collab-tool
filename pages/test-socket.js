import { useEffect, useState } from "react";
import io from "socket.io-client";

import { Button } from "@mui/material";

export default () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    fetch("/api/socket-io").finally(() => {
      const s = io();
      setSocket(s);

      s.on("connect", () => {
        console.log("connect");
        s.emit("hello");
      });

      s.on("hello", (data) => {
        console.log("hello", data);
      });

      s.on("a user connected", () => {
        console.log("a user connected");
      });

      s.on("disconnect", () => {
        console.log("disconnect");
      });
    });
  }, []); // Added [] as useEffect filter so it will be executed only once, when component is mounted

  return (
    <>
      <h1>Socket.io</h1>
      <Button
        onClick={() => {
          socket.emit("test");
        }}
      >
        Test
      </Button>
    </>
  );
};
