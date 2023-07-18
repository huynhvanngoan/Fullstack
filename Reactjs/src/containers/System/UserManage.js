import React, { Component } from 'react';
// eslint-disable-next-line
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }
    
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    }

    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        });
    }

    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            });
        }
    }
    
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if(response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser:false,
                });
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }         
        } catch (e) {
            console.log(e);
        }
    }
    
    handleDeleteUser = async (user) => {
        try{
            let response = await deleteUserService(user.id);
            if (response && response.errCode === 0) {
                await this.getAllUserFromReact();
            } else {
                alert(response.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        })
    }

    doEditUser = async (user) => {
        try {
            let response = await editUserService(user);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false,
                });
                await this.getAllUserFromReact();
            } else {
                alert(response.errMessage)
            }
        } catch (e) {
            console.log(e);
        }
    }
    /** Life cycle
     *  Run Component:
     * 1. Run Constructor -> Init state
     * 2. Run Did mount -> Set state
     * 3. Run Render
     */

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser isOpen={ this.state.isOpenModalUser } toggleFromParent={ this.toggleUserModal } 
                createNewUser = { this.createNewUser}
                />
                { this.state.isOpenModalEditUser && 
                    <ModalEditUser 
                        isOpen={ this.state.isOpenModalEditUser } 
                        toggleFromParent={ this.toggleEditUserModal }
                        currentUser={this.state.userEdit} 
                        editUser = { this.doEditUser }
                        // createNewUser = { this.createNewUser}
                    />
                }
                <div className="title text-center">Manage User With React</div>
                <div className="mx-1">
                    <button className='btn btn-primary px-3' onClick={() => this.handleAddNewUser()}>
                        <i className="fas fa-plus"></i>
                        Add new user
                    </button>
                </div>
                <div className="users-table mt-3 mx-2">
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr id={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button 
                                                onClick={() => this.handleEditUser(item)}
                                                className='btn-edit'><i className="fas fa-edit"></i></button>
                                                <button 
                                                onClick={() => this.handleDeleteUser(item)}
                                                className='btn-delete'><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
