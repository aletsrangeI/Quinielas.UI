import React, { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";

const formData = {
  email: "",
  password: "",
};

const formValidations = {
  email: [
    (value) => /\S+@\S+\.\S+/.test(value),
    "Ingrese un email válido"
  ],

  password: [
    (value) => value.length >= 6,
    "La contraseña debe tener al menos 6 caracteres",
  ]
};


const Login = () => {
  const {email, password, onInputChange, isFormValid, emailValid, passwordValid} = useForm(formData, formValidations);
  const [formSubmitted, setformSubmitted] = useState(false);
  const { status, errorMessage } = useSelector(state => state.auth);
  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const onSubmit = (e) => {
    e.preventDefault();
    setformSubmitted(true);
    if (!isFormValid) return;
    dispatch(startLoginWithEmailAndPassword({ email, password }));
  };



  return (
    <Container className="bg-dark d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className="text-light">Email</Form.Label>
          <Form.Control onChange={onInputChange} type="email" placeholder="tucorreo@email.com" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label className="text-light">Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Ingresar
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
