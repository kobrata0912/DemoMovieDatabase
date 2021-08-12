import React, { useState, useContext } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserContext from '../../utils/userContext';
//import LoadingContext from '../../utils/loadingContext';

const Register = (props) => {
    const userContext = useContext(UserContext);
    //const loadingContext = useContext(LoadingContext)
    const history = useHistory();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [firstNameValid, setFirstNameValid] = useState('');
    const [firstNameClass, setFirstNameClass] = useState('form-control');
    const [lastNameValid, setLastNameValid] = useState('');
    const [lastNameClass, setLastNameClass] = useState('form-control');
    const [emailValid, setEmailValid] = useState('');
    const [emailClass, setEmailClass] = useState('form-control');
    const [passwordValid, setPasswordValid] = useState('');
    const [passwordClass, setPasswordClass] = useState('form-control');
    const [rePasswordValid, setRePasswordValid] = useState('');
    const [rePasswordClass, setRePasswordClass] = useState('form-control');
    const isFormValid =
        firstNameValid &&
        lastNameValid &&
        emailValid &&
        passwordValid &&
        rePasswordValid;

    const validator = (e) => {
        switch (e.target.name) {
            case 'firstName':
                {
                    const validation = RegExp(/^[А-Яа-яA-Za-z\-']{2,}$/).test(firstName);
                    if (validation) {
                        setFirstNameValid(true);
                        setFirstNameClass('form-control is-valid');
                    } else {
                        setFirstNameValid(false);
                        setFirstNameClass('form-control is-invalid');
                    }
                }
                break;
            case 'lastName':
                {
                    const validation = RegExp(/^[А-Яа-яA-Za-z\-']{2,}$/).test(lastName);
                    if (validation) {
                        setLastNameValid(true);
                        setLastNameClass('form-control is-valid');
                    } else {
                        setLastNameValid(false);
                        setLastNameClass('form-control is-invalid');
                    }
                }
                break;
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
                    const validation = RegExp(/^[A-Za-z0-9.-_]{8,}$/).test(password);
                    if (validation) {
                        setPasswordValid(true);
                        setPasswordClass('form-control is-valid');
                    } else {
                        setPasswordValid(false);
                        setPasswordClass('form-control is-invalid');
                    }
                }
                break;
            case 'rePassword':
                {
                    const validation = password === rePassword && password !== '';
                    if (validation) {
                        setRePasswordValid(true);
                        setRePasswordClass('form-control is-valid');
                    } else {
                        setRePasswordValid(false);
                        setRePasswordClass('form-control is-invalid');
                    }
                }
                break;
            default:
                break;
        }
    };

    const handleRegister = (event) => {
        event.preventDefault();
        //loadingContext.showLoading();
        // firebase
        // 	.doCreateUserWithEmailAndPassword(email, password, firstName, lastName)
        // 	.then((authUser) => {
        // 		logIn(authUser);
        // 		loadingContext.hideLoading();
        // 		toast.success('Successfully registered!')
        // 		history.push('/home');
        // 	})
        // 	.catch((e) => {
        // 		setFirstName('');
        // 		setLastName('');
        // 		setEmail('');
        // 		setPassword('');
        // 		setRePassword('');
        // 		loadingContext.hideLoading();
        // 		toast.error(e);
        // 	});

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ email, password, first_name: firstName, last_name: lastName })
        }
        fetch("http://localhost:4001/register", requestOptions)
            .then(res => res.json())
            .then(regUser => {
                //loadingContext.hideLoading();
                userContext.logIn(regUser);
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);
                toast.success(`Registered and logged in successfully as ${email}`);
                history.push('/home');
            })
            .catch((e) => {
        		setFirstName('');
        		setLastName('');
        		setEmail('');
        		setPassword('');
        		setRePassword('');
                //loadingContext.hideLoading();
                toast.error(e.message);
            });

    };
    return (
        <Container className='pt-5'>
            <Row>
                <Col sm></Col>
                <Col sm={8} className='border shadow-lg p-3 mb-5 bg-white rounded'>
                    <Form onSubmit={handleRegister}>
                        <Row>
                            <Col className="pb-3">
                                <Form.Label className='h4'>
                                    Име
                                </Form.Label>
                                <Form.Control
                                    name='firstName'
                                    type='text'
                                    className={firstNameClass}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    onBlur={validator}
                                    autoComplete='off'
                                />
                            </Col>

                            <Col className="pb-3">
                                <Form.Label className='h4'>
                                    Фамилия
                                </Form.Label>
                                <Form.Control
                                    name='lastName'
                                    type='text'
                                    className={lastNameClass}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    onBlur={validator}
                                    autoComplete='off'
                                />
                            </Col>
                        </Row>

                        <Row>
                            {firstNameValid === false ? (
                                <Col mt={3}>
                                    <Alert variant="danger">
                                        Моля, въведете валидно име!
                                    </Alert>
                                </Col>
                            ) : (
                                ''
                            )}
                            {lastNameValid === false ? (
                                <Col mt={3}>
                                    <Alert variant="danger">
                                        Моля, въведете валидна фамилия!
                                    </Alert>
                                </Col>
                            ) : (
                                ''
                            )}
                        </Row>

                        <Form.Group className="pb-3">
                            <Form.Label className='h4'>
                                Имейл
                            </Form.Label>
                            <Form.Control
                                name='email'
                                placeholder='Valid GMAIL account'
                                className={emailClass}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={validator}
                                autoComplete='off'
                            />
                        </Form.Group>
                        {emailValid === false ? (
                            <Alert variant="danger">
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
                                placeholder='Password > 8 characters'
                                type='password'
                                className={passwordClass}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={validator}
                                autoComplete='off'
                            />
                        </Form.Group>
                        {passwordValid === false ? (
                            <Alert variant="danger">
                                Моля, въведете валидна парола!
                            </Alert>
                        ) : (
                            ''
                        )}

                        <Form.Group className="pb-3">
                            <Form.Label className='h4'>
                                Повторна парола
                            </Form.Label>
                            <Form.Control
                                name='rePassword'
                                placeholder='Password > 8 characters'
                                type='password'
                                className={rePasswordClass}
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
                                onBlur={validator}
                            />
                        </Form.Group>

                        {rePasswordValid === false ? (
                            <Alert variant="danger">
                                Двете пароли не съвпадат!
                            </Alert>
                        ) : (
                            ''
                        )}

                        <Button type="submit" disabled={!isFormValid}>
                            <h5>Регистрация</h5>
                        </Button>
                    </Form>
                </Col>
                <Col sm></Col>
            </Row>
        </Container>
    );
};

export default Register;