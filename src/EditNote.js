import React from "react";
import { Form, Button } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/firestore";
import { Redirect } from "react-router-dom";

class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.props.forceUpdate();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      validated: false,
      title: "",
      note: "",
      titleCount: 0,
      noteCount: 0,
      redirect: false,
    };
  }

  async componentDidMount() {;
    this.setState({
      title: this.props.match.params.title,
      note: this.props.match.params.content,
      titleCount: this.props.match.params.title.length,
      noteCount: this.props.match.params.content.length,
    });
  }

  async upload() {
    var db = firebase.firestore();
    db.collection("notes").doc(this.props.user.uid.toString()).get().then(async (doc) => {
      var t = doc.data().titles;
      t.splice(this.props.match.params.id, 1, this.state.title);
      var n = doc.data().notes;
      n.splice(this.props.match.params.id, 1, this.state.note);
      await db.collection("notes").doc(this.props.user.uid.toString()).set({
        titles: t,
        notes: n,
      });
    this.setState({redirect: true,});
})
  }

  async handleSubmit(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      this.upload();
    }
     this.setState({validated: true});
  }

  handleChange(e) {
    if (e.target.name === "title") {
      if (100 - e.target.value.length >= 0) {
        this.setState({
          title: e.target.value,
          titleCount: e.target.value.length,
        });
      }
    } else if (e.target.name === "note") {
      if (1000 - e.target.value.length >= 0) {
        this.setState({
          note: e.target.value,
          noteCount: e.target.value.length,
        });
      }
    }
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect push to="/view" />
    );
    }
    return (
      <><h1>Edit Note</h1>
      <Form noValidate autoComplete="off" validated={this.state.validated}>
        <Form.Group className="mb-3" controlId="noteTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" aria-describedby="titleCount" placeholder="Note Title" value={this.state.title} onChange={this.handleChange} name="title" required />
          <Form.Text id="titleCount" muted>{this.state.titleCount}/100</Form.Text>
          <Form.Control.Feedback type="invalid">Please enter a title</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="note">
          <Form.Label>Note</Form.Label>
          <Form.Control as="textarea"  aria-describedby="noteCount" placeholder="The Note" value={this.state.note} onChange={this.handleChange} name="note" required />
          <Form.Text id="noteCount" muted>{this.state.noteCount}/1000</Form.Text>
          <Form.Control.Feedback type="invalid">Please enter the note</Form.Control.Feedback>
        </Form.Group>
        <Button onClick={this.handleSubmit}>Save Note</Button>
      </Form></>
    );
  }
}

export default EditNote;
