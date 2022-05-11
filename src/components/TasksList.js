import React, { Component, Fragment } from 'react';
import TaskItem from './TaskItem';
import './TasksList.css';

class TasksList extends Component {
    
    render() { 
        return (
            <ul className="tasks_list">
                {this.props.taskList.map(taskItem => (
                    <Fragment key={taskItem.id}>
                        <TaskItem
                            taskItem={taskItem}
                            onDelete={this.props.onDelete}
                            onUpdate={this.props.onUpdate}
                            onEditStart={this.props.onEditStart}
                            onEditStop={this.props.onEditStop}
                            onUpdateCurrentValue={this.props.onUpdateCurrentValue}
                            taskGettingEdit={this.props.taskGettingEdit}
                        /> 
                    </Fragment>
                ))}
            </ul>
        );
    }
}
 
export default TasksList;