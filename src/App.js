import React, { Component } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TasksList from './components/TasksList';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

class App extends Component {
    state = {
        taskList: JSON.parse(localStorage.getItem('taskList')) || [],
        taskGettingEdit: {
            id: '',
            originalValue: '',
            currentValue: '',
            isCompleted: false,
        }
    }

    constructor(props) {
        super(props);
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.startEditingTask = this.startEditingTask.bind(this);
        this.stopEditingTask = this.stopEditingTask.bind(this);
        this.updateCurrentValue = this.updateCurrentValue.bind(this);
    }

    addTask(task) {
        const taskList = [
            ...this.state.taskList,
            {
                task: task,
                isCompleted: false,
                id: uuidv4()
            }
        ];

        this.setState({taskList});
    }

    deleteTask(id) {
        const taskList = this.state.taskList.filter(taskItem => taskItem.id !== id);
        this.setState({taskList});
    }

    updateTask(id, task, isCompleted) {
        const taskList = this.state.taskList.map(taskItem => {
            if (taskItem.id === id) {
                return { id, task, isCompleted }
            } else {
                return {...taskItem}
            }
        });

        this.setState({
            taskList,
            taskGettingEdit: {
                id: '',
                originalValue: '',
                currentValue: '',
                isCompleted: false,
            }
        });
    }

    startEditingTask(taskItem) {
        if(this.state.taskGettingEdit.id) {
            this.stopEditingTask();
        }
        const {id, task, isCompleted} = taskItem;
        const taskGettingEdit = { 
            id, 
            originalValue: task, 
            currentValue: task,
            isCompleted,
        };
        this.setState({taskGettingEdit});
    }

    stopEditingTask() {
        const {id, originalValue, currentValue, isCompleted} = this.state.taskGettingEdit;
        const task = currentValue.trim() || originalValue;
        this.updateTask(id, task, isCompleted)
    }

    updateCurrentValue(currentValue) {
        const taskGettingEdit = {...this.state.taskGettingEdit};
        taskGettingEdit.currentValue = currentValue;
        this.setState({taskGettingEdit})
    }

    componentDidUpdate(){
        localStorage.setItem('taskList', JSON.stringify(this.state.taskList))
    }

    componentWillUnmount(){
        localStorage.setItem('taskList', JSON.stringify(this.state.taskList))
    }

    render() {
        return (
            <div className="app">
                <AddTaskForm
                    onAddTask={this.addTask}
                />
                <TasksList
                    taskList={this.state.taskList}
                    onDelete={this.deleteTask}
                    onUpdate={this.updateTask}
                    onEditStart={this.startEditingTask}
                    onEditStop={this.stopEditingTask}
                    onUpdateCurrentValue={this.updateCurrentValue}
                    taskGettingEdit={this.state.taskGettingEdit}
                />
            </div>
        );
    }
}

export default App;