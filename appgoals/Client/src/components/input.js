import React, { Component} from "react";

class Input extends Component {
    render() {
        // console.log("Input props: ", this.props);
        return (
            <div className="input-block" >
                <input 
                id={this.props.name}
                type={this.props.type}
                name={this.props.name}
                required
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                onBlur={this.props.onBlur}
                />
            </div>
        )
    }
}

export default Input;