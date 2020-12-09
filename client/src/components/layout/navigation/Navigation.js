import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from './../../../service/auth.service'
import logo from './logo.png'
import { Navbar, Nav, Modal } from 'react-bootstrap'
import LoginForm from '../../pages/Login-form/LoginForm'
import Alert from '../../shared/Alert/Alert'

import './Navigation.css'

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            showToast: false,
            toastText: ''
        }
        this.authService = new AuthService()
    }

    logOut = () => {
        this.authService
            .logout()
            .then(res => this.props.storeUser(undefined))
            .catch(err => console.log(err))
    }

    handleModal = visible => this.setState({ showModal: visible })

    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })

    render() {
        return (
            <>
                <Modal centered show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <LoginForm handleToast={this.handleToast} closeModal={() => this.handleModal(false)} storeUser={this.props.storeUser} />
                    </Modal.Body>
                </Modal>

                <Navbar bg="dark" variant="dark" expand="md" className="menu">
                    <Link to="/">
                        <Navbar.Brand >
                            <img
                                alt="logo"
                                src={logo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}eLearning_</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Link to="/">
                                <Nav.Link as="div">Home</Nav.Link>
                            </Link>
                            <Link to="/courses">
                                <Nav.Link as="div">Courses</Nav.Link>
                            </Link>
                            <Link to="/teachers">
                                <Nav.Link as="div">Teachers</Nav.Link>
                            </Link>
                            {
                                this.props.loggedUser
                                    ?
                                    <>
                                        <Nav.Link as="div" onClick={this.logOut}>Log out</Nav.Link>

                                        <Link to="/profile">
                                            <Nav.Link as="div">{`Welcome back, ${this.props.loggedUser.username}`}</Nav.Link>
                                        </Link>
                                    </>
                                    :
                                    <>
                                        <Nav.Link as="div" onClick={() => this.handleModal(true)}>Log in</Nav.Link>

                                        <Link to="/signup">
                                            <Nav.Link as="div">Sign up</Nav.Link>
                                        </Link>
                                    </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                
                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={ this.state.toastText}/>
            </>
        )
    }
}


export default Navigation