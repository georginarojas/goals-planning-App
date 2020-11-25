import React, { Component } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import PasswordStrengthMeter from "./passwordStrengthMeter";

class PasswordRegister extends Component {
    constructor(props){
        super(props);
        this.state ={
            isRevealPassword: false,
        }
        this.togglePassword = this.togglePassword.bind(this);
        this.passwordOneRef = React.createRef();
        this.iconRevealPasswordRef = React.createRef();
    }

    togglePassword = (event) =>{
        this.setState({isRevealPassword: !this.state.isRevealPassword});        
    }

    render() {
        const {isRevealPassword} = this.state
        const { password} = this.props;
        // console.log(this.props)

        return(
            <div className="input-block" >
                <input
                    id={this.props.name}
                    type={isRevealPassword? "text" : "password"}
                    name={this.props.name}
                    autoComplete="off"
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                    // ref={this.passwordOneRef}
                    onBlur={this.props.onBlur}
                />
                <span onClick={this.togglePassword} ref={this.iconRevealPasswordRef} className="customIcon">
                    {   
                        isRevealPassword?
                        <FontAwesomeIcon icon={faEye} /> : 
                        <FontAwesomeIcon icon={faEyeSlash} />
                    }
                </span>
                {
                    password && <PasswordStrengthMeter password={password} />
                }
            </div>
        )
    }
}

export default PasswordRegister;