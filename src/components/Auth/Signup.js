import React from 'react'
import { Grid, Form, Segment, Button, Header, Message, Icon, GridColumn } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import firebase from '../../firebase'

class Signup extends React.Component {
    state = {
        username: "",
        password: "",
        email: "",
        confirmation: "",
        error: null,
        loading: false
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    emptyForm = () => {
        let { password, username, email, confirmation } = this.state
        return !password.length || !username.length || !email.length || !confirmation.length
    }

    validPassword = () => {
        let { password, confirmation } = this.state
        if (password.length < 6 || confirmation.length < 6) {
            return false
        } else if (password !== confirmation) {
            return false
        }
        return true
    }

    renderErrors = () => {
        return <p>{this.state.error.message}</p>
    }

    validForm = () => {
        let error
        if (this.emptyForm()) {
            console.log("empty")
            error = { message: "Please fill in all fields" }
            this.setState({ error: error }, () => console.log(this.state))
            return false
        } else if (!this.validPassword()) {
            error = { message: "Invalid Password" }
            this.setState({ error: error })
            return false
        } else {
            return true;
        }
    }

    submitHandler = (e) => {
        e.preventDefault()
        if (this.validForm()) {
            this.setState({ error: null, loading: true })
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(user => {
                    console.log(user)
                    this.setState({ loading: false })
                })
                .catch(error => {
                    console.log(error)
                    this.setState({ error: error, loading: false })
                })

        }
    }

    render() {
        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <GridColumn style={{ maxWidth: "450px" }}>
                    <Header as="h2" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange" />
                        Sign Up
                    </Header>
                    <Form size="large" onSubmit={this.submitHandler}>
                        <Segment stacked>
                            <Form.Input fluid type="text" name="username" icon="user" iconPosition="left" placeholder="username" value={this.state.username} onChange={this.changeHandler} />

                            <Form.Input fluid type="email" name="email" icon="mail" iconPosition="left" placeholder="email" value={this.state.email} onChange={this.changeHandler} />

                            <Form.Input fluid type="password" name="password" icon="lock" iconPosition="left" placeholder="password" value={this.state.password} onChange={this.changeHandler} />

                            <Form.Input fluid type="password" name="confirmation" icon="repeat" iconPosition="left" placeholder="password confirmation" value={this.state.confirmation} onChange={this.changeHandler} />

                            <Button disabled={this.state.loading} className={this.state.loading ? "loading" : ""} color="orange" fluid size="large">Submit</Button>
                        </Segment>
                    </Form>
                    {this.state.error ? (
                        <Message error>
                            <h3>Error</h3>
                            {this.renderErrors()}
                        </Message>)
                        :
                        null}
                    <Message>Already Have an Account? <NavLink to="/login">Log In</NavLink></Message>
                </GridColumn>

            </Grid>
        )
    }
}

export default Signup