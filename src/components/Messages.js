import React from 'react'
import { Segment, Comment, CommentGroup } from 'semantic-ui-react'
import Message from './Message'
import MessagesHeader from './MessagesHeader'
import MessageForm from './MessageForm'
import firebase from '../firebase'

class Messages extends React.Component {
    state = {
        messagesRef: firebase.database().ref('messages'),
        messages: [],
        messagesLoading: true
    }

    componentDidUpdate(prevProps) {
        if (this.props.channel !== prevProps.channel && this.props.user) {
            this.addListeners()
        }
    }

    addListeners = () => {
        this.messageListener()
    }

    checkExisting = () => {
        this.state.messagesRef.child(this.props.channel.id).on("value", (data) => {
            if (!data.val()) {
                let loadedMessages = []
                this.setState({ messages: [] })
                this.state.messagesRef.child(this.props.channel.id).on("child_added", snapshot => {

                    loadedMessages.push(snapshot.val())
                    this.setState({ messages: loadedMessages, messagesLoading: false })
                    console.log("checking", loadedMessages)
                })
            }
        })

    }

    messageListener = () => {
        this.checkExisting()
        let loadedMessages = []
        this.state.messagesRef.child(this.props.channel.id).on("child_added", snapshot => {
            loadedMessages.push(snapshot.val())
            this.setState({ messages: loadedMessages, messagesLoading: false })
            console.log("loaded messages", loadedMessages)
        })
    }

    renderMessages = () => {
        return this.state.messages.length > 0 && this.state.messages.map(message => {
            return <Message
                key={message.timestamp}
                message={message}
                user={this.props.user}
            />
        })
    }

    render() {
        console.log("messages render", this.state.messages)
        return (
            <>
                <MessagesHeader />
                <Segment>
                    <CommentGroup className="messages">
                        {this.renderMessages()}
                    </CommentGroup>
                </Segment>
                <MessageForm user={this.props.user} messagesRef={this.state.messagesRef} channel={this.props.channel} />
            </>
        )
    }
}


export default Messages