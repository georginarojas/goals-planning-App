import React, { Component } from "react";
import zxcvbn from "zxcvbn";

class Password extends Component {


    // passwordStrength(event){
    //     if(event.target.value ===''){
    //         this.setState({
    //             score: 'null'
    //     })
    //     } else {
    //         var pw = zxcvbn(event.target.value);
    //         this.setState({
    //         score: pw.score
    //     });
    //     }
    //     console.log("Score: " + this.state.score);
    // }

  render() {
    const { password } = this.props;
    const score = zxcvbn(password);
    console.log("Score: " + score);

    return (
      <div className="password-strength-meter">
        <br />
        <label className="password-strength-meter-label">{password}</label>
      </div>
    );
  }
}

export default Password;
