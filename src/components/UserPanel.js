import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from '../firebase'
import { Dropdown, Grid, GridColumn, GridRow, Header, HeaderContent, Icon, Image } from 'semantic-ui-react'

class UserPanel extends React.Component {


    renderDropdown = () => {
        return [
            {
                key: "user",
                text: <span>Signed In as <strong>{this.props.user.displayName}</strong></span>,
                disabled: true
            },
            {
                key: "avatar",
                text: <span>Change Avatar</span>
            },
            {
                key: "sign out",
                text: <span onClick={this.signoutHandler}>Sign Out</span>
            }

        ]
    }

    signoutHandler = () => {
        firebase.auth().signOut()
            .then()
        this.props.history.push('/login')
    }
    render() {
        console.log(this.props.user)
        return (
            <Grid style={{ background: '#4c3c4c' }}>
                <GridColumn>
                    <GridRow style={{ padding: '1.2em', margin: 0 }}>
                        <Header inverted floated="left" as="h2">
                            <Icon name="code" />
                            <HeaderContent>User Panel</HeaderContent>
                        </Header>
                        <Header style={{ padding: ".25em" }} as="h4" inverted>
                            <Dropdown trigger={<span>
                                <Image src={this.props.user.photoURL} spaced="right" avatar />
                                {this.props.user.displayName}
                            </span>} options={this.renderDropdown()} />
                        </Header>
                    </GridRow>
                </GridColumn>

            </Grid>
        )
    }
}


export default withRouter(UserPanel)