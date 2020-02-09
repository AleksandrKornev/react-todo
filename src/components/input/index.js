import React from "react";
import { connect } from "react-redux";
import "./index.scss";

import { addNote } from "../../store/actions";

import AddIcon from '@material-ui/icons/Add';

class Input extends React.Component {
  constructor() {
    super();

    this.state = {
      text: ""
    };
  }

  add() {
    const note = { text: this.state.text };
    this.props.NOTE_ADD(note);
    this.resetState();
  }

  resetState() {
    this.setState({ text: "" });
  }

  handleKey(e) {
    if (e.key === "Enter") this.add();
  }

  render() {
    return (
      <div 
        className="input__wrapper"
        onKeyDown={ e => this.handleKey(e) }
      >
        <input 
          className="input__input"
          onChange={ e => this.setState({ text: e.target.value })}
          value={ this.state.text }
        />
        <div 
          className="input__btn__wrapper"
          onClick={ () => this.add() }
        >
          <AddIcon className="input__btn"/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  notes: state.notes
})
const mapDispatchToProps = dispatch => ({
  NOTE_ADD: (item) => 
    dispatch(addNote(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Input);