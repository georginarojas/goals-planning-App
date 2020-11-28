import React, { Component} from "react";
import "../views/userRegister/form.scss";

class Input extends Component {
    constructor(props){
        super(props);
        this.state = {
            isPristine: true
        }   
        
        this.togglePristine = this.togglePristine.bind(this);
        
    }

    togglePristine = () =>{
        this.setState({isPristine: false});
      }
    
    changeStateClassName(isPristine, existData){
        if(!isPristine && !existData){
            return true;
        } else if (isPristine && !existData) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const {isPristine} = this.state;
        const {existData} = this.props;
        // console.log(`>>>> INPUT existData: ${existData}`);
        // console.log(`>>>> INPUT isPristine: ${isPristine}`);
        const flagClassNAme = this.changeStateClassName(isPristine, existData);
        // console.log(`==== flag  ${flagClassNAme}`);


        return (
            <div className="input-block" >
                <label>{this.props.placeholder}:</label>
                <input 
                    id={this.props.name}
                    className={(flagClassNAme) ? 'singup-input' : 'singup-input-error'}
                    type={this.props.type}
                    name={this.props.name}
                    required
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                    onBlur={this.props.onBlur}
                    onClick={this.togglePristine}
                    onFocus={this.togglePristine}
                />
            </div>
        )
    }
}

export default Input;