import React from "react";
import { connect } from "react-redux";
import "./index.scss";

import { editNote, deleteNote } from "../../store/actions";

import { DeleteForever, Star, StarBorder } from "@material-ui/icons";

class Note extends React.Component {
  _IS_MOUNTED = false;

  constructor() {
    super();

    this.state = {
      isActiveDelete: null,
      isFavorites: null,
      isActiveFavorites: null,
      isEdit: null,
      text: ""
    };
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this._IS_MOUNTED = true;
    if (this._IS_MOUNTED) {
      this.setState({ 
        text: this.props.text, 
        isFavorites: this.props.isFavorites 
      });
    }
  }

  componentDidUpdate(newProps) {
    const oldProps = this.props
    if ((newProps.text !== oldProps.text ||
        newProps.isFavorites !== oldProps.isFavorites) && 
        this._IS_MOUNTED
      )
    {
      this.setState({ 
        text: this.props.text, 
        isFavorites: this.props.isFavorites 
      });
    }
  }

  componentWillUnmount() {
    this._IS_MOUNTED = false;
  }

  delete() {
    this.setState({ isActiveDelete: true });
    setTimeout(() => {
      this.props.NOTE_DEL(this.props.index);
      this.setState({ isActiveDelete: false });
    }, 500);
  }

  toggleFavorites() {
    this.setState({ isFavorites: !this.state.isFavorites });
    this.setState({ isActiveFavorites: true });
    setTimeout(() => {
      this.setState({ isActiveFavorites: false });
      this.updateNote();
    }, 500);
  }

  toggleEdit() {
    this.setState({ isEdit: !this.state.isEdit });
    if (this.state.isEdit) {
      setTimeout(() => this.inputRef.current.focus(), 100);
    }
  }

  disableEdit() {
    this.setState({ isEdit: false });
    this.updateNote();
  }

  updateNote() {
    this.props.NOTE_EDIT({
      text: this.state.text,
      isFavorites: this.state.isFavorites
    }, this.props.index);
  }

  enableEdit() {
    this.setState({ isEdit: true });
    this.inputRef.current.focus();
  }

  modelText(val) {
    this.setState({ text: val });
  }

  updateText() {
    this.disableEdit();
  }

  render() {
    return (
      <div className="note__wrapper">
        <div className={ `note__text ${ this.state.isEdit ? "active" : "" }` }>
          <input 
            className={ `note__text__input ${ this.state.isEdit ? "active" : "" }` }
            onClick={ () => this.disableEdit() }
            onChange={ e => this.modelText(e.target.value) }
            onBlur={ e => this.updateText() }
            value={ this.state.text } 
            ref={ this.inputRef }
          />
          <span 
            className={ `note__text__span ${ this.state.isEdit ? "" : "active" }` }
            onClick={ () => this.enableEdit() }
          >{ this.state.text }</span>
        </div>
        <div className="note__btns">
          <div
            className={ `note__btns__favorites ${ this.state.isActiveFavorites ? "active" : "" }` }
            onClick={() => this.toggleFavorites()}
          >
            { this.state.isFavorites ? <Star/> : <StarBorder/> }
          </div>
          <div
            className={ `note__btns__delete ${ this.state.isActiveDelete ? "active" : "" }` }
            onClick={() => this.delete()}
          >
            <DeleteForever style={{ fill: "red" }}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  NOTE_EDIT: (item, index) => 
    dispatch(editNote(item, index)),
  NOTE_DEL: (index) => 
    dispatch(deleteNote(index))
})
 
export default connect(null, mapDispatchToProps)(Note);