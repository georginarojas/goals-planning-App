import React, { Component } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import PasswordStrengthMeter from "./passwordStrengthMeter";
import PasswordRules from "./passwordRules";

import "../../containers/userRegister/form.scss";
import "./password.css";

class PasswordRegister extends Component {
    constructor(props){
        super(props);
        this.state ={
            isRevealPassword: false,
            isPristine: true,
        }
        this.togglePassword = this.togglePassword.bind(this);
        this.togglePristine = this.togglePristine.bind(this);
        this.passwordOneRef = React.createRef();
        this.iconRevealPasswordRef = React.createRef();
    }

    togglePassword = (event) =>{
        this.setState({isRevealPassword: !this.state.isRevealPassword});        
    }

    togglePristine = () =>{
        this.setState({isPristine: false});
    }

    changeStateClassName(isPristine, isValidData){
        if(isPristine && !isValidData){
            return true;
        } else if (!isPristine && isValidData) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const {isRevealPassword, isPristine} = this.state
        const { password, isValidData, name} = this.props;
        const flagClassName = this.changeStateClassName(isPristine, isValidData)

        return(
            <div className="input-block" >
                <label>{this.props.placeholder}:</label>
                <input
                    id={this.props.name}
                    type={isRevealPassword? "text" : "password"}
                    name={this.props.name}
                    autoComplete="off"
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                    onBlur={this.props.onBlur}
                    onClick={this.togglePristine}
                    onFocus={this.togglePristine}
                    className={(flagClassName)? 'singup-input' : 'singup-input-error'}
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

                {
                    password && <PasswordRules password={password}/>
                }
                <label className="message-error">
                    {
                        (!isPristine && !isValidData && name ==="passwordConfirm") ? <p>Different passwords</p> :  null
                    }
                </label>
            </div>
        )
    }
}

export default PasswordRegister;