import React, { Component } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

import "../../containers/userRegister/form.scss";
import "../userRegister/password.css";

class InputLogin extends Component {
    constructor(props){
        super(props);
        this.state ={
            isRevealPassword: false,
            isPristine: true,
        }
        this.togglePristine = this.togglePristine.bind(this);
        this.togglePassword = this.togglePassword.bind(this);
        this.iconRevealPasswordRef = React.createRef();
    }

    togglePassword = (event) =>{
        this.setState({isRevealPassword: !this.state.isRevealPassword});        
    }

    togglePristine = () =>{
        this.setState({isPristine: false});
    }

    changeStateClassName(isPristine, isValidData){
        if(isPristine){
            return true;
        } else if (isValidData && !isPristine) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const {isRevealPassword, isPristine} = this.state
        const { isValidData, name} = this.props;
        const flagClassName = this.changeStateClassName(isPristine, isValidData)

        return(
            <div className="input-block" >
                <label>{this.props.placeholder}:</label>
                <input
                    id={this.props.name}
                    type={(!isRevealPassword && name === "password")? "password": "text"  }
                    name={this.props.name}
                    autoComplete="off"
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                    onClick={this.togglePristine}
                    onFocus={this.togglePristine}
                    className={(flagClassName)? 'singup-input' : 'singup-input-error'}
                    required
                />
                {
                   ( name === "password")?
                   
                    <span onClick={this.togglePassword} ref={this.iconRevealPasswordRef} className="customIcon">
                        {   
                        isRevealPassword?
                        <FontAwesomeIcon icon={faEye} /> : 
                        <FontAwesomeIcon icon={faEyeSlash} />
                        }
                    </span> :
                    null
                   
                }
            </div>
        )
    }
}

export default InputLogin;