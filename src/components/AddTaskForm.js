import React, { Component } from 'react';

class AddTaskForm extends Component {
    state = { 
        inputValue: '',
    }

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
        this.handleEnterKey = this.handleEnterKey.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            inputValue: e.target.value
        });
    }

    handleTaskSubmit(){
        const task = this.state.inputValue.trim();

        if(task) {
            this.props.onAddTask(task);
        }

        this.setState({
            inputValue: ''
        });
    }

    handleEnterKey(e){
        if(e.key === "Enter") {
            this.handleTaskSubmit();
        }
    }

    render() { 
        return (
            <div className="AddTaskForm">
                <input 
                    type="text" 
                    value={this.state.inputValue}
                    onInput={this.handleInputChange}
                    onKeyPress={this.handleEnterKey}
                />
                <button
                    onClick={this.handleTaskSubmit}
                >+</button>
            </div>
        );
    }
}
 
export default AddTaskForm;