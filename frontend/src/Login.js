import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import Home from "./Home";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const requestOptions = {
      method: "POST", //to do: why post and not get in login
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };

    fetch("http://localhost:3001/api/login", requestOptions).then(
      //TODO: port 8080 pe backend
      (response) => {
        if (response.status == 200) {
          history.push("/home");
        }
      }
    );
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center" dividing>
          Log-in to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="E-mail address"
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={(ev) => setPassword(ev.target.value)}
            />

            <Button
              color="teal"
              fluid
              size="large"
              circular
              onClick={handleSubmit}
              disabled={!validateForm()}
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          Not registered yet? <Link to="/register">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}