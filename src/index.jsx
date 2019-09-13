import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Wrapper from "./style";
import notification from "antd/lib/notification";
import appSocket from "./socket.config";
import "antd/dist/antd.css";

const App = () => {
  useEffect(() => {
    appSocket.on("NEW_MENSAGEM", ({ title, message }) => {
      notification.info({
        description: message,
        message: title
      });
    });
  }, []);

  return (
    <Wrapper>
      <div className="container">
        <h1>Scheduler</h1>
        <p>Aguarde as notificações</p>
      </div>
    </Wrapper>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
