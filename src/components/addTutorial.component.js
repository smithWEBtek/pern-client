import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveTutorial() {
    let data = {
      title: this.state.title,
      description: this.state.description
    };

    TutorialDataService.create(data)
      .then(response => {
debugger
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log('[AddTutorial] response.data: ', response.data);
      })
      .catch(e => {
        console.log('[AddTutorial] response error ', e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div>
        <h2>AddTutorial component</h2>
        <form>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              onChange={this.onChangeTitle}
              value={this.state.title}
            ></input>
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              value={this.state.description}
              onChange={this.onChangeDescription}
            ></input>
          </div>
          <button 
            type="submit"
            onClick={this.saveTutorial}
            >Save tutorial</button>
        </form>
      </div>
    )
  }
}
