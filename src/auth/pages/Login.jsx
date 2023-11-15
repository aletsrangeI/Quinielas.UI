import React, { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/auth/thunks";
import { useAuthenticateMutation } from "../../store/apis/QuinielaAuth";
import { login } from "../../store/auth";

const formData = {
  UserName: "",
  Password: "",
};

const formValidations = {
  Password: [
    (value) => value.length >= 3,
    "La contraseña debe tener al menos 3 caracteres",
  ]
};


const Login = () => {
  const dispatch = useDispatch();
  const {UserName, Password, onInputChange, isFormValid, UserNameValid, passwordValid} = useForm(formData, formValidations);
  const [formSubmitted, setformSubmitted] = useState(false);
  const { status, errorMessage } = useSelector(state => state.auth);
  const isAuthenticating = useMemo(() => status === 'checking', [status]);
  const [createUser, { isLoading, isError }] = useAuthenticateMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    setformSubmitted(true);
    if (!isFormValid) return;

    try {
      const { data } = await createUser({ UserName, Password }).unwrap();
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
        <Form.Group className="mb-3" controlId="UserName">
          <Form.Label className="text-light">UserName</Form.Label>
          <Form.Control value={UserName} name="UserName" onChange={onInputChange} type="UserName" placeholder="tucorreo@UserName.com" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Password">
          <Form.Label className="text-light">Contraseña</Form.Label>
          <Form.Control value={Password} name="Password" onChange={onInputChange} type="Password" placeholder="Contraseña" />
        </Form.Group>

        <Button disabled={isAuthenticating} variant="primary" type="submit">
          Ingresar
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
