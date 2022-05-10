import React, { Component} from 'react';

class Control extends Component {
    render() { 
        return (
            <button 
                onClick={this.props.action}
                className={this.props.classNameValue}
            >{this.props.text}
            </button>
        );
    }
}
 
export default Control;