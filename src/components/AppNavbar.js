import React from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink

} from 'reactstrap';
import { ButtonContainer } from './Button';
import logo from '../logo.svg';

class AppNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div className="navBar bg-dark">
                {/*
https://www.iconfinder.com/icons/1243689/call_phone_icon
Creative Commons (Attribution 3.0 Unported);
https://www.iconfinder.com/Makoto_msk */ }
                <Navbar expand="md" navbar>
                    <NavbarBrand >
                        <Link to="/">
                            <img src={logo} alt="store"></img>
                        </Link>
                    </NavbarBrand>
                    <Nav className="ml-auto">
                        <NavItem>
                            <NavLink><Link to="/"><ButtonContainer outline color="success">Product</ButtonContainer></Link></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                <Link to="/cart" >
                                    <ButtonContainer outline color="success">
                                        <i class="fas fa-shopping-cart"></i>  My Cart
                            </ButtonContainer>
                                </Link>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div >
        );
    }
}
export default AppNavbar

