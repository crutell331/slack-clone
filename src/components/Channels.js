import React from 'react'
import { connect } from 'react-redux'
import { setChannel } from '../redux/actions/index'
import { Button, Form, FormField, Icon, Input, Menu, MenuItem, Modal, ModalActions, ModalContent, ModalHeader } from 'semantic-ui-react'
import firebase from '../firebase'
class Channels extends React.Component {
    state = {
        channels: [],
        renderModal: false,
        channelName: "",
        channelDetails: "",
        channelsRef: firebase.database().ref('channels'),
        firstLoad: true,
        activeChannel: null
    }

    componentDidMount() {
        this.addListeners()
    }

    componentWillUnmount() {
        this.state.channelsRef.off()
    }

    addListeners = () => {
        let loadedChannels = []
        this.state.channelsRef.on("child_added", (snapshot) => {
            loadedChannels.push(snapshot.val())
            this.setState({ channels: loadedChannels }, () => this.renderFirstChannel())

            // console.log(loadedChannels)
        })
    }

    renderFirstChannel = () => {
        let channel = this.state.channels[0]
        if (this.state.firstLoad && this.state.channels.length > 0) {
            this.props.setChannel(channel)
            this.setState({ firstLoad: false, activeChannel: channel.id })
        }
    }

    setChannel = (channel) => {
        console.log("set channel", channel)
        this.props.setChannel(channel)
        this.setActiveChannel(channel)
    }

    setActiveChannel = (channel) => {
        this.setState({ activeChannel: channel.id })
    }

    closeModalHandler = () => {
        this.setState({ renderModal: false })
    }
    openModalHandler = () => {
        this.setState({ renderModal: true })
    }

    modalChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        if (this.validForm()) {
            this.addChannel()
        }
    }

    addChannel = () => {
        const key = this.state.channelsRef.push().key
        const newChannel = {
            id: key,
            name: this.state.channelName,
            details: this.state.channelDetails,
            createdBy: {
                name: this.props.user.displayName,
                avatar: this.props.user.photoURL

            }
        }
        this.state.channelsRef.child(key).update(newChannel)
            .then(() => {

                this.setState({ channelName: "", channelDetails: "" })
                this.closeModalHandler()

            })
            .catch(console.log)
    }

    renderChannels = () => {
        return this.state.channels.length > 0 && this.state.channels.map(channel => (
            <MenuItem key={channel.id} onClick={() => this.setChannel(channel)} name={channel.name} style={{ opacity: .7 }} active={channel.id === this.state.activeChannel}>
                # {channel.name}
            </MenuItem>
        ))
    }

    validForm = () => this.state.channelName && this.state.channelDetails

    render() {
        return (
            <>
                <Menu.Menu style={{ paddingBottom: "2em" }}>
                    <MenuItem>
                        <span>
                            <Icon name="exchange" /> Channels
                    </span> {" "}
                    ({this.state.channels.length}) <Icon name="add" onClick={this.openModalHandler} />
                    </MenuItem>
                    {this.renderChannels()}
                </Menu.Menu>
                <Modal basic open={this.state.renderModal} onClose={this.closeModalHandler}>
                    <ModalHeader>Add A Channel</ModalHeader>
                    <ModalContent>
                        <Form onSubmit={this.submitHandler}>
                            <FormField>
                                <Input fluid label="Name of Channel" name="channelName" value={this.state.channelName} onChange={this.modalChangeHandler} />
                            </FormField>
                            <FormField>
                                <Input fluid label="About" name="channelDetails" value={this.state.channelDetails} onChange={this.modalChangeHandler} />
                            </FormField>
                        </Form>
                    </ModalContent>
                    <ModalActions>
                        <Button color="green" inverted onClick={this.submitHandler}>
                            <Icon name="checkmark" /> Add
                        </Button>
                        <Button color="red" inverted onClick={this.closeModalHandler} >
                            <Icon name="remove" /> Cancel
                        </Button>
                    </ModalActions>
                </Modal>
            </>
        )
    }
}


export default connect(null, { setChannel })(Channels)