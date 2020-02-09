import React from "react";
import { connect } from "react-redux";
import "./index.scss";

import { init } from "../store/actions";

import Note from "../components/note";
import Input from "../components/input";

class IndexView extends React.Component {
  componentDidMount() {
    this.props.INIT();
  }

  render() {
    return (
      <div className="indexView">
        <div className="indexView__notes">
          {
            this.props.notes.map((el, index) => 
              <Note 
                text={ el.text }
                isFavorites={ el.isFavorites }
                index={ index }
                key={ index }
              />
            )
          }
        </div>
        <div className="indexView__input">
          <Input/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  notes: state.notes
})
const mapDispatchToProps = dispatch => ({
  INIT: () => 
    dispatch(init())
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexView);