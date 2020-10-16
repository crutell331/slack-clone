import React from 'react'
import { Grid, Form, Segment, Button, Header, Message, Icon, GridColumn } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'
import firebase from '../../firebase'

class Login extends React.Component {
    state = {
        password: "",
        email: "",
        error: null,
        loading: false,
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    renderErrors = () => {
        return <p>{this.state.error.message}</p>
    }


    submitHandler = (e) => {
        e.preventDefault()
        if (this.validForm()) {
            this.setState({ error: null, loading: true })
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((user) => {
                    this.setState({ loading: false }, () => this.props.history.push('/')
                    )
                    console.log("HERE")
                })
                .catch(error => {
                    console.log(error)
                    this.setState({ error, loading: false })
                })
        }
    }

    validForm = () => {
        return this.state.email && this.state.password
    }


    render() {
        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <GridColumn style={{ maxWidth: "450px" }}>
                    <Header as="h2" icon color="violet" textAlign="center">
                        <Icon name="code branch" color="violet" />
                        Login
                    </Header>
                    <Form size="large" onSubmit={this.submitHandler}>
                        <Segment stacked>
                            <Form.Input fluid type="email" name="email" icon="mail" iconPosition="left" placeholder="email" value={this.state.email} onChange={this.changeHandler} />

                            <Form.Input fluid type="password" name="password" icon="lock" iconPosition="left" placeholder="password" value={this.state.password} onChange={this.changeHandler} />

                            <Button disabled={this.state.loading} className={this.state.loading ? "loading" : ""} color="violet" fluid size="large">Log In</Button>
                        </Segment>
                    </Form>
                    {this.state.error ? (
                        <Message error>
                            <h3>Error</h3>
                            {this.renderErrors()}
                        </Message>)
                        :
                        null}
                    <Message>New Here? <NavLink to="/signup">Sign Up</NavLink></Message>
                </GridColumn>

            </Grid>
        )
    }
}

export default withRouter(Login)