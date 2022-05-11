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
        const textarea = this.textareaRef.current;
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
        this.props.onEditStart(this.props.taskItem);
    }

    handleTaskSave() {
        this.props.onEditStop();
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
        const isGettingEdit = id === taskGettingEdit.id;

        return (
            <li 
                className="task_item"
                onMouseEnter={() => this.resizeTextarea()}
                onMouseLeave={() => this.resizeTextarea()}
            >

                <label className="toggle_label">
                    <input 
                        type="checkbox" 
                        onChange={this.handleCompletionToggle}
                        checked={isCompleted}
                    />
                </label>

                <textarea 
                    className={`task_text ${isCompleted ? 'completed' : ''}`} 
                    value={isGettingEdit ? this.props.taskGettingEdit.currentValue : task }
                    readOnly={!isGettingEdit}
                    onInput={this.handleInputChange}
                    rows={1}
                    ref={this.textareaRef}
                    onClick={!isGettingEdit ? this.handleCompletionToggle : null}
                ></textarea>

                <div className="controls">
                    {!isGettingEdit ? (
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