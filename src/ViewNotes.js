import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Redirect } from "react-router-dom";

class ViewNotes extends React.Component {
  constructor(props) {
    super(props);
    this.props.forceUpdate();
    this.state = {notes: [], notesArr: [], titlesArr: [], loading: true,};
  }

  componentDidMount() {
    if (this.props.user !== null) {
      var db = firebase.firestore();
      db.collection("notes").doc(this.props.user.uid.toString()).get().then((doc) => {
        if (doc.exists) {
          let notes = [];
          doc.data().titles.forEach((element, index) => {
            notes.push({
              title: element,
              content: doc.data().notes[index],
              id: index,
            })
          });
          this.setState({notes, notesArr: doc.data().notes, titlesArr: doc.data().titles, loading: false,});
        } else {
          this.setState({notes: [], loading: false,});
        }
      });
    }
  }

  async deleteNote(id) {
    let db = firebase.firestore();
    let t = this.state.titlesArr;
    let n = this.state.notesArr;
    t.splice(id, 1);
    n.splice(id, 1);
      db.collection("notes").doc(this.props.user.uid.toString()).set({
        titles: t,
        notes: n,
      }).then((res) => this.componentDidMount())
  }

  render() {
    if (this.props.user === null) {
      return (<Redirect to="/login" />);
    }
    if (this.state.loading) {
      return (
        <>
        <h1>Your Notes</h1>
        <h2>Loading...</h2>
        </>
      );
    } else if (this.state.notes.length > 0) {
      return (
        <>
        <ToastContainer pauseOnFocusLose={false} />
        <h1>Your Notes</h1>
        {this.state.notes.map((note, index) => (
          <Card key={index}>
            <Card.Body as={Row} className="align-items-center">
              <Col>
                <Card.Title>
                  {note.title}
                </Card.Title>
                <Card.Text>
                  {note.content}
                </Card.Text>
              </Col>
              <Col>
                <Link to={`/edit/${note.title}/${note.content}/${note.id}`}>
                  <Button>Edit</Button>
                </Link>
                {" "}
                <Button onClick={(e) => {
                  this.deleteNote(note.id);
                  toast.info(({closeToast}) => (
                  <>
                    <DeleteIcon color="primary" />
                    Deleted!
                  </>
                  ), {
                    autoClose: 1750,
                    transition: Flip,
                  });
                }}>Delete</Button>
              </Col>
            </Card.Body>
          </Card>
        )
      )}
      <Link to="/create">
        <Button>Create Note</Button>
      </Link>
      </>
      );
    } else {
      return (
        <>
        <ToastContainer pauseOnFocusLose={false} />
        <p>No notes yet!</p>
      <Link to="/create">
        <Button>Create Note</Button>
      </Link>
      </>
      );
    }
  }
}

export default ViewNotes;
