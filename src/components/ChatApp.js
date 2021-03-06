import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import ColorPanel from './ColorPanel'
import SidePanel from './SidePanel'
import Messages from './Messages'
import MetaPanel from './MetaPanel'
function ChatApp(props) {
    console.log('Chat app props:', props)
    return (
        <React.Fragment>
            {props.user ? (
                <Grid columns="equal" className="app" style={{ background: '#eee' }}>
                    <ColorPanel />
                    <SidePanel user={props.user} />

                    <Grid.Column style={{ marginLeft: 320 }}>
                        <Messages channel={props.channel} user={props.user} />

                    </Grid.Column>
                    <Grid.Column width={4}>

                        <MetaPanel />
                    </Grid.Column>
                </Grid>

            ) : props.history.push('/login')}
        </React.Fragment>
    )
}
function msp(state) {
    return { user: state.user.user, channel: state.channel }
}
export default connect(msp)(withRouter(ChatApp))