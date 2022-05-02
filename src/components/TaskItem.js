import React, { Component } from 'react';
import Control from './Control';

class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCompletionToggle = this.handleCompletionToggle.bind(this);
        this.handleTaskSave = this.handleTaskSave.bind(this);
        this.handleEditStart = this.handleEditStart.bind(this);
        this.resizeTextarea = this.resizeTextarea.bind(this);
        this.textareaRef = React.createRef();
    }

    handleInputChange(e){
        const textarea = e.target;
        this.props.onUpdateCurrentValue(textarea.value);
    }

    handleCompletionToggle(){
        const {id, task, isCompleted} = this.props.taskItem;
        this.props.onUpdate(id, task, !isCompleted);
    }

    handleEditStart(e){
        const textarea = e.target.parentElement.previousElementSibling;
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
        this.props.onEditStart(this.props.taskItem);
    }

    handleTaskSave() {
        this.props.onEditStop();
        this.setState({taskValue: this.props.taskItem.task});
    }

    resizeTextarea(){
        const textarea = this.textareaRef.current;
        textarea.style.height = 'auto';
	    textarea.style.height = `${textarea.scrollHeight}px`;
    }

    componentDidMount(){
        this.resizeTextarea();
    }

    componentDidUpdate(){
        this.resizeTextarea();
    }

    render() {
        const {id, isCompleted, task} = this.props.taskItem;
        const {taskGettingEdit} = this.props;

        return (
            <li style={{display: 'flex'}}>

                <div className="input-wrap">
                    <input 
                        type="checkbox" 
                        onChange={this.handleCompletionToggle}
                        checked={isCompleted}
                    />
                </div>

                <textarea 
                    className="task-text" 
                    value={id === taskGettingEdit.id ? this.props.taskGettingEdit.currentValue : task }
                    readOnly={id !== taskGettingEdit.id}
                    onInput={this.handleInputChange}
                    rows={1}
                    ref={this.textareaRef}
                ></textarea>

                <div className="controls">
                    {id !== taskGettingEdit.id ? (
                        <Control action={(e) => this.handleEditStart(e)} text="edit"/>
                    ) : (
                        <Control action={() => this.handleTaskSave()} text="save"/>
                    )}
                    <Control action={() => this.props.onDelete(id)} text="delete"/>
                </div>
            </li>
        );
    }
}
 
export default TaskItem;