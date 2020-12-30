import React, { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { useForm } from '../util/hooks.js';

import { AuthContext } from '../context/auth.js';

export default function Register(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    } 

    const { onChange, onSubmit, values } = useForm(registerUser, initialState)

    const [addUser, { loading }] = useMutation( REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            context.login(userData)

            // redirect to home page if successful
            props.history.push('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })
    
    // Hoist, to deal with addUser not being recognized, unlike const functions
    function registerUser() {
        addUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>   
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                ></Form.Input>

                <Form.Input
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    type="email"
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                ></Form.Input>

                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                ></Form.Input>

                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password..."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                ></Form.Input>

                <Button type="submit" primary>Register</Button>
            </Form>

            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map( value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
            
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id 
            email 
            username 
            createdAt 
            token
        }
    }
`
