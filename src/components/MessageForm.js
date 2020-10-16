import React from 'react'
import firebase from '../firebase'
import { Segment, Button, Input, ButtonGroup } from 'semantic-ui-react'
class MessageForm extends React.Component {
    state = {
        message: "",
        loading: false,
        error: null
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    createMessage = () => {
        if (this.state.message) {
            this.setState({ loading: true })
            const message = {
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                content: this.state.message,
                user: {
                    id: this.props.user.uid,
                    name: this.props.user.displayName,
                    avatar: this.props.user.photoURL
                }
            }
            this.props.messagesRef
                .child(this.props.channel.id)
                .push()
                .set(message)
                .then(() => this.setState({ loading: false, message: "" }))
                .catch((error) => this.setState({ loading: false, error }))
        } else {
            this.setState({ error: "Please Enter a Message" })
        }
    }
    render() {
        return (
            <Segment className="message__form">
                <Input fluid name="message" style={{ marginBottom: "0.7em" }} label={<Button icon="add" />} labelPosition="left" placeholder="Enter Message..." value={this.state.message} onChange={this.changeHandler}
                    className={this.state.error ? 'error' : ""}
                />
                <ButtonGroup icon widths="2" onClick={this.createMessage}>
                    <Button color="orange" content="Add Reply" labelPosition="left" icon="edit" disabled={this.state.loading} />
                    <Button color="teal" content="Upload" labelPosition="right" icon="cloud upload" />
                </ButtonGroup>
            </Segment>
        )
    }
}

export default MessageForm