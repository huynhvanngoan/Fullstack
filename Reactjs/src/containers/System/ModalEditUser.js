import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// eslint-disable-next-line
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash'

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hard code',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            });
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        //bad code
        // eslint-disable-next-line
        /* this.state[id] = event.target.value;
        this.setState({ 
            ...this.state }, () => {
                console.log('check bad state: ',this.state);
            }
        ); */

        //good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState,
        });
    }

    checkValidateInput = () => {
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        let isValid = true;

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                // eslint-disable-next-line
                isValid = false;
                alert('Missing parameter ' + arrInput[i]);
                break;
            }
        }
        return true;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.editUser(this.state);
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'model-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit User</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email: </label>
                            <input value={this.state.email}
                                type="email" onChange={(event) => { this.handleOnChangeInput(event, 'email') }} disabled />
                        </div>
                        <div className="input-container">
                            <label>Password: </label>
                            <input value={this.state.password}
                                type="password" onChange={(event) => { this.handleOnChangeInput(event, 'password') }} disabled/>
                        </div>
                        <div className="input-container">
                            <label>First Name: </label>
                            <input value={this.state.firstName}
                                type="text" onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }} />
                        </div>
                        <div className="input-container">
                            <label>Last Name: </label>
                            <input
                                value={this.state.lastName}
                                type="text" onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }} />
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address: </label>
                            <input value={this.state.address}
                                type="text" onChange={(event) => { this.handleOnChangeInput(event, 'address') }} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleSaveUser() }}>
                        Save Changes
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);






