import React, { Component } from "react";
import zxcvbn from "zxcvbn";

import "./passwordStrengthMeter.css";

class PasswordStrengthMeter extends Component {

  passwordlabel = (result) => {
    switch (result.score) {
      case 0: 
        return "Weak";
      case 1:
        return "Fair";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "Weak"
      
    }
  }

  render() {
    const { password } = this.props;
    const scoreResult = zxcvbn(password);
    
    return (
      <div className="password-strength-meter">
        <label className="message-error">
          {
            (scoreResult.score<2) ? <p>Password Invalid</p> :  null
          }
        </label>
        <progress 
          className={`password-strength-meter-progress strength-${this.passwordlabel(scoreResult)}`}
          value={scoreResult.score}
          max="4"
        />
        <br />
        <label className="password-strength-meter-label">
          {password && (<> <strong>Password strength:</strong> {this.passwordlabel(scoreResult)}
          </>
          )}
        </label>
      </div>
    );
  }
}

export default PasswordStrengthMeter;
