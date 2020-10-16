import React from 'react'
import { Comment, CommentAuthor, CommentAvatar, CommentContent, CommentMetadata, CommentText } from 'semantic-ui-react'
import moment from 'moment'
const Message = ({ message, user }) => {
    function isOwnMessage() {
        return message.user.id === user.uid ? 'message_self' : ''
    }
    function timeFromNow() {
        moment(message.timestamp).fromNow()
    }

    return (
        <Comment>
            <CommentAvatar src={message.user.avatar} />
            <CommentContent className={isOwnMessage()}>
                <CommentAuthor as="a">{message.user.name}</CommentAuthor>
                <CommentMetadata>{timeFromNow()}</CommentMetadata>
                <CommentText>{message.content}</CommentText>
            </CommentContent>
        </Comment>
    )
}

export default Message