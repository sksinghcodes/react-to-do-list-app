import React, { Component} from 'react';

class Control extends Component {
    render() { 
        return (
            <button onClick={this.props.action}>{this.props.text}</button>
        );
    }
}
 
export default Control;