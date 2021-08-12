import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserContext from '../../utils/userContext';
import LoadingContext from '../../utils/loadingContext';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';

const Login = (props) => {
    const userContext = useContext(UserContext);
    const loadingContext = useContext(LoadingContext)
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState('');
    const [emailClass, setEmailClass] = useState('form-control');
    const [passwordValid, setPasswordValid] = useState('');
    const [passwordClass, setPasswordClass] = useState('form-control');
    const isFormValid = emailValid && passwordValid

    const validator = (e) => {
        switch (e.target.name) {
            case 'email':
                {
                    const validation = RegExp(/^[a-zA-Z0-9.-_]{3,}@gmail.com$/).test(
                        email
                    );
                    if (validation) {
                        setEmailValid(true);
                        setEmailClass('form-control is-valid');
                    } else {
                        setEmailValid(false);
                        setEmailClass('form-control is-invalid');
                    }
                }
                break;
            case 'password':
                {
                    const validation = RegExp(/^[A-Za-z0-9.-_]{7,}$/).test(password);
                    if (validation) {
                        setPasswordValid(true);
                        setPasswordClass('form-control is-valid');
                    } else {
                        setPasswordValid(false);
                        setPasswordClass('form-control is-invalid');
                    }
                }
                break;
            default:
                break;
        }
    };

    const handleLogin = (event) => {
        event.preventDefault();
        //loadingContext.showLoading();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ email, password })
        }
        fetch("http://localhost:4001/login", requestOptions)
            .then(res => res.json())
            .then(authUser => {
                //loadingContext.hideLoading();
                userContext.logIn(authUser);
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);
                toast.success(`Logged in successfully as ${email}`);
                history.push('/home');
            })
            .catch((e) => {
                setEmail('');
                setPassword('');
                //loadingContext.hideLoading();
                toast.error(e.message);
            });
    };

    return (
        <Container className="pt-5">
            <Row>
                <Col sm></Col>
                <Col sm className='border shadow-lg p-3 mb-5 bg-white rounded'>
                    <Row></Row>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="pb-3">
                            <Form.Label className='h4'>
                                Имейл
                            </Form.Label>
                            <Form.Control
                                name='email'
                                placeholder='Gmail accounts only !!!'
                                type='text'
                                className={emailClass}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={validator}
                                autoComplete='off'
                            />
                        </Form.Group>
                        {emailValid === false ? (
                            <Alert variant="danger"
                                v-if='$v.email.$dirty && $v.email.$invalid'
                            >
                                Моля, въведете валиден Gmail имейл!
                            </Alert>
                        ) : (
                            ''
                        )}

                        <Form.Group className="pb-3">
                            <Form.Label className='h4'>
                                Парола
                            </Form.Label>
                            <Form.Control
                                name='password'
                                placeholder='Password must be > 8 characters'
                                type='password'
                                className={passwordClass}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={validator}
                                autoComplete='off'
                            />
                        </Form.Group>

                        {passwordValid === false ? (
                            <Alert variant="danger"
                                v-if='$v.password.$dirty && $v.password.$invalid'
                            >
                                Моля, въведете валидна парола!
                            </Alert>
                        ) : (
                            ''
                        )}
                        <Button type="submit"
                            disabled={!isFormValid}
                        >
                            <h5>Вход</h5>
                        </Button>
                    </Form>
                </Col>
                <Col sm></Col>
            </Row>
        </Container>
    );
};

export default Login;