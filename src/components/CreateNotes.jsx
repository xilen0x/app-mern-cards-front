import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNotes extends Component {

    state = {
        users: [],
        userSelected: '',
        title: '',
        content: '',
        date: new Date(),
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        const res = await axios.get('/api/users');
        this.setState({
            users: res.data.map(user => user.username),
            userSelected: res.data[0].username
        })
        //console.log(this.state.users);
        if (this.props.match.params.id) {
            const res = await axios.get('/api/notes/' + this.props.match.params.id);
            //console.log(res.data);
            this.setState({
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                userSelected: res.data.author,
                editing: true,
                _id: this.props.match.params.id
            })
        }
    }

    onSubmit = async (e) => {
        //console.log(this.state.title, this.state.content);
        e.preventDefault();
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        };
        if (this.state.editing) {
            await axios.put('/api/notes/' + this.state._id, newNote);
        } else {
            await axios.post('/api/notes', newNote);
        }
        //console.log(res);
        window.location.href = '/';
    }

    onInputChange = e => {
        //console.log(e.target.name, e.target.value);
        this.setState({
            [e.target.name]: e.target.value /* dependiendo del nombre recibido, cambiará el state de aquel. */
        })
    }

    onChangeDate = date => {
        this.setState({ date })
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create a note</h4>
                    {/** Select User */}
                    <div className="form-group">
                        <select
                            className="form-control"
                            name="userSelected"
                            onChange={this.onInputChange}
                            value={this.state.userSelected}
                        >
                            {
                                this.state.users.map(user =>
                                    <option key={user} value={user}>{user}</option>)
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            name="title"
                            onChange={this.onInputChange}
                            value={this.state.title}
                            required />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="content"
                            className="form-control"
                            placeholder="Content"
                            onChange={this.onInputChange}
                            value={this.state.content}
                            required>
                        </textarea>
                    </div>

                    <div className="form-group">
                        <DatePicker
                            className="form-control"
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />
                    </div>

                    <form onSubmit={this.onSubmit}>
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
