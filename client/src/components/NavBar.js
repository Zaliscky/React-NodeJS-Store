import React, { useContext } from 'react';
import {Context} from "../index"
import Navbar from 'react-bootstrap/Navbar'
import {observer} from 'mobx-react-lite'
import {NavLink} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import {Container,  Button} from 'react-bootstrap'
import { ADMIN_ROUTE,BASKET_ROUTE,SHOP_ROUTE ,DEVICE_ROUTE,REGISTRATION_ROUTE,LOGIN_ROUTE} from "../utils/consts"
import {useNavigate} from "react-router-dom";

const NavBar = observer(() => {
    console.log("we trying to get user from Context for Navbar ")
    const {user} = useContext(Context)
    const history = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')          ///////////////
    }
    console.log("Is user authorized in NavBar " + user.IsAuth)
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to={SHOP_ROUTE}>Slava Ukraine Shop</NavLink>
                {user.IsAuth ?
                    <Nav className="ms-auto" style={{color: 'white'}}> {/*//ml-auto*/}
                        {/* <Button       variant={"outline-light"} onClick={() => history.push(ADMIN_ROUTE)}>  Админ панель
                        </Button> */}
                        <Button variant={"outline-light"} 
                                onClick={() => history(ADMIN_ROUTE)}> 

                                Admin Panel</Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}     /* LOGIN_ROUTE */
                            className="ml-2" >
                            Logout
                        </Button>
                    </Nav>
                    :
                    <Nav className="ms-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history(LOGIN_ROUTE)}>Authorization</Button>   {/*user.setIsAuth(true) */}
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;