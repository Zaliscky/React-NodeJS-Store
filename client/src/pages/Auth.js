import React, { useContext, useState } from "react";
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { registration, login } from "../http/userAPI";

const Auth = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(Context);

  const click = async () => {
    try {
      console.log("We are in click method in Auth.js");
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
        console.log(data);
      }
      user.setUser(user);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE); //Check if get troubles

    } catch (e) {alert(e.response.data.message)}
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}>
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Authorization" : "Registration"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Write your email...."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Form.Control
            className="mt-3"
            placeholder="Write write password...."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ? 
              <div>
                Don't have an Account?
                <NavLink to={REGISTRATION_ROUTE}>Registrate!</NavLink>
              </div>
             : 
              <div>
                Not authorized ?<NavLink to={LOGIN_ROUTE}>Login!</NavLink>
              </div>
            }
            <Button
              className="mt-3 align-self-end"
              variant={"outline-success"}
              onClick={click}>
              {isLogin ? "Login" : "Register"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
