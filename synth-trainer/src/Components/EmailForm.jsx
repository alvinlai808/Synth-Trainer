import React, { useState } from "react";
import {
  Form,
  FormControl,
} from "react-bootstrap";
import "./SignIn.css";
import { useEffect } from "react";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const emailRegExp = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i;

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    setEmail(value);
  };

  useEffect(() => {
    setIsValidEmail(emailRegExp.test(email));
  });

  return (
    <div>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <FormControl
          type="email"
          name="userEmail"
          value={email}
          placeholder="E.g: faruq123@gmail.com"
          id="userEmail"
          isInvalid={!isValidEmail}
          isValid={isValidEmail}
          onChange={(event) => onChangeHandler(event)}
        />
      </Form.Group>
    </div>
  );
};
export default EmailForm;
