import React, { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Form, NavLink, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks";
import { login } from "../../store/auth";
import { useRegisterMutation } from "../../store/apis/QuinielaAuth";

const formData = {
  FirstName: "",
  LastName: "",
  UserName: "",
  Password: "",
  ConfirmPassword: "",
};

const formValidations = {
  FirstName: [
    (value) => value.length >= 3,
    "El nombre debe tener al menos 3 caracteres",
  ],
  LastName: [
    (value) => value.length >= 3,
    "El apellido debe tener al menos 3 caracteres",
  ],
  UserName: [
    (value) => value.length >= 3,
    "El usuario debe tener al menos 3 caracteres",
  ],
  Password: [
    (value) => value.length >= 3,
    "La contraseña debe tener al menos 3 caracteres",
  ],
};

const Register = () => {
  const dispatch = useDispatch();
  const {
    FirstName,
    LastName,
    UserName,
    Password,
    ConfirmPassword,
    onInputChange,
    isFormValid,
    FirstNameValid,
    LastNameValid,
    UserNameValid,
    PasswordValid,
    ConfirmPasswordValid,
  } = useForm(formData, formValidations);

  const [formSubmitted, setformSubmitted] = useState(false);

  const { status, errorMessage } = useSelector((state) => state.auth);

  const isCheckingAuthentication = useMemo(() => status === "checking", [status]);

  const [createUser, { isLoading, isError }] = useRegisterMutation();


  const onSubmit = async (event) => {
    event.preventDefault();
      setformSubmitted(true);
      if (!isFormValid) return;
      try {
        const { data } = await createUser({ FirstName, LastName, UserName, Password }).unwrap();
        // Successfully authenticated, 'data' contains the response
        console.log('Authentication successful:', data);
        // Dispatch an action or perform necessary actions with 'data'
        dispatch(login(data)); // For example, dispatch a login action
  
        // Continue with further logic if needed, e.g., redirect to another page
      } catch (error) {
        // Authentication failed, handle error
        console.error('Authentication error:', error);
        // Dispatch an action or handle error state accordingly
      }
  };

  return (
    <Container className="bg-dark d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <Form onSubmit={onSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="FirstName">
            <Form.Label className="text-light">Nombres</Form.Label>
            <Form.Control
              onChange={onInputChange}
              value={FirstName}
              name="FirstName"
              type="FirstName"
              placeholder=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} className="mb-3" controlId="LastName">
            <Form.Label className="text-light">Apellidos</Form.Label>
            <Form.Control
              onChange={onInputChange}
              value={LastName}
              name="LastName"
              type="LastName"
              placeholder=""
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="UserName">
          <Form.Label className="text-light">Usuario</Form.Label>
          <Form.Control
            onChange={onInputChange}
            value={UserName}
            name="UserName"
            type="UserName"
            placeholder=""
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="Password">
            <Form.Label className="text-light">Contraseña</Form.Label>
            <Form.Control
              onChange={onInputChange}
              value={Password}
              name="Password"
              type="password"
              placeholder=""
            />
          </Form.Group>

          <Form.Group as={Col} className="mb-3" controlId="ConfirmPassword">
            <Form.Label className="text-light">Confirmar contraseña</Form.Label>
            <Form.Control
              onChange={onInputChange}
              name="ConfirmPassword"
              type="password"
              value={ConfirmPassword}
              placeholder=""
            />
          </Form.Group>
        </Row>

        <Button disabled={!isFormValid} variant="primary" type="submit">
          Registrarse
        </Button>
        <NavLink className="btn btn-link text-info">Registrarse</NavLink>
      </Form>
    </Container>
  );
};

export default Register;
