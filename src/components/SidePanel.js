import React from 'react'
import { Menu } from 'semantic-ui-react'
import Channels from './Channels'
import UserPanel from './UserPanel'

class SidePanel extends React.Component {
    render() {
        return (
            <Menu size="large" inverted fixed="left" vertical style={{ background: "#4c3c4c", fontSize: "1.2rem" }}>

                <UserPanel user={this.props.user} />
                <Channels user={this.props.user} />
            </Menu>
        )
    }
}

export default SidePanel