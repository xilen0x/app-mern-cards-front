import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import {Link} from 'react-router-dom'

export default class NotesList extends Component {

    state = {
        notes: []
    }

     componentDidMount() {
        this.getNotes();
    }

    async getNotes(){
        const res = await axios.get('/api/notes');
        this.setState({ notes: res.data })
    }
    
    deleteNote = async (id) => {
        await axios.delete('/api/notes/' + id);
        this.getNotes();
    }

    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note => (
                        <div className="col-md-4 p-2" key={note._id}>
                            <div className="card">
                                <div className="card-header">
                                    <h5>{note.title}</h5>
                                </div>
                                <div className="card-body">
                                    <p>{note.content}</p>
                                    <p>{note.author}</p>
                                    <p>{format(note.date)}</p>
                                </div>
                                <div className="card-footer">
                                    <Link className="btn btn-warning mr-2" to={"/edit/" + note._id}>
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => this.deleteNote(note._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
