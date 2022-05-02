import React, { Component, Fragment } from 'react';
import TasksItem from './TaskItem';

class TasksList extends Component {
    
    render() { 
        return (
            <div className="TasksList">
                <ul>
                    {this.props.taskList.map(taskItem => (
                        <Fragment key={taskItem.id}>
                            <TasksItem
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
            </div>
        );
    }
}
 
export default TasksList;