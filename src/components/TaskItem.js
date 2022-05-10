import React, { Component } from 'react';
import Control from './Control';
import './TaskItem.css';

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
            <li className="task_item">

                <label className="toggle_label">
                    <input 
                        type="checkbox" 
                        onChange={this.handleCompletionToggle}
                        checked={isCompleted}
                    />
                </label>

                <textarea 
                    className="task_text" 
                    value={id === taskGettingEdit.id ? this.props.taskGettingEdit.currentValue : task }
                    readOnly={id !== taskGettingEdit.id}
                    onInput={this.handleInputChange}
                    rows={1}
                    ref={this.textareaRef}
                    onMouseEnter={() => this.resizeTextarea()}
                    onMouseLeave={() => this.resizeTextarea()}
                ></textarea>

                <div className="controls">
                    {id !== taskGettingEdit.id ? (
                        <Control 
                            action={(e) => this.handleEditStart(e)}
                            classNameValue="fas fa-pen"
                        />
                    ) : (
                        <Control 
                            action={() => this.handleTaskSave()} 
                            classNameValue="fas fa-save"
                        />
                    )}
                    <Control 
                        action={() => this.props.onDelete(id)} 
                        classNameValue="fas fa-trash"
                    />
                </div>
            </li>
        );
    }
}
 
export default TaskItem;