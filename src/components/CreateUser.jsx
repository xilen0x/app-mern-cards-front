import React, { Component } from 'react'
import axios from 'axios' //en lugar de utilizar fetch, se usará axios

export default class CreateUser extends Component {

    state = {
        users: [],
        username: ''
    }

    async componentDidMount() {
        this.getUsers();
        console.log(this.state.users);
    }

    getUsers = async () => {
        const res = await axios.get('/api/users');
        this.setState({ users: res.data });
    }

    onChangeUsername = (e) => {
        //console.log(e.target.value);
        this.setState({ username: e.target.value })
    }

    onSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/users', {
            username: this.state.username
        })
        //console.log(res);
        this.setState({ username: '' });
        this.getUsers();
    }

    deleteUser = async (id) => {
        await axios.delete('/api/users/' + id)
        this.getUsers();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create new user</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername} />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-6">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => (
                                <>
                                <div>
                                    <button className="btn btn-danger mt-4 float-right" onClick={() => this.deleteUser(user._id)}>Delete</button>
                                </div>
                                <li
                                    className="list-group-item list-group-item-action"
                                    key={user._id}
                                    >
                                    {user.username}
                                </li>
                                </>)
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
