import React, { Component } from "react";
import ProfileContext from "./profileContext";


class ContextProvider extends Component {
  constructor(props) {
    super(props);

    this.setContext = (context) => {
      // console.log("CONTEXT ", context);
      this.setState(context);
    };

    this.state = {
      auth: false,
      user: {},
      setContext: this.setContext,
    };
  }

  render() {
    return (
      <div>
        <ProfileContext.Provider value={this.state}>
          {this.props.children}
        </ProfileContext.Provider>
      </div>
    );
  }
}

export default ContextProvider;
