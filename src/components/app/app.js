import React, {Component} from 'react';

import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item';


export default class App extends Component {
    maxId = 1;
    state = {
        todoData: [
            this.createTodoItem('Drink coffe'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Drink')
        ],
        filter: "",
        status: 'all'
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            }
        });
    };


    toggleProperty(arr, id, propName) {

        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }

        })
    };
    addItem = (text) => {
        const newItem = this.createTodoItem(text)
        this.setState(({todoData}) => {
            const newArr = [
                ...todoData,
                newItem
            ];
            return {
                todoData: newArr
            };

        });

    };

    search(items, filter) {
        if (filter.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item.label
                .toLowerCase().indexOf(filter.toLowerCase()) > -1;
        })
    }

    status(items, status) {
        switch (status) {
            case "all":
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    onChangeInput = (filter) => {
        this.setState({filter});
    };

    onStatusFilter=(status)=>{
        this.setState({status})
    }

    render() {
        const {todoData, filter, status} = this.state;
        const visibleItems = this.status(
            this.search(todoData, filter), status);
        const doneCount = this.state.todoData
            .filter((el) => el.done).length;
        const todoCount = this.state.todoData.length - doneCount;

        return (
            <div className="todo-wrap">
                <AppHeader todo={todoCount} done={doneCount}/>
                <SearchPanel onChangeInput={this.onChangeInput}/>
                <ItemStatusFilter status={status}
                                  onStatusFilter={this.onStatusFilter}
                />
                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <AddItem
                    onAdd={this.addItem}
                />
            </div>
        )
    }
}