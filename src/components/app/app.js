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
        ]
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
    onChangeInput = (e) => {
        console.log(e.target.value);
        const regInput = new RegExp(e.target.value, 'i');
        const arrSearch  = [];
        let oldData;
        this.setState(({todoData}) => {

            if(oldData==[]){
                console.log(todoData);
                todoData= oldData
            }else{
                oldData = todoData;
            }

            console.log(oldData);
            let newArray =[]
            oldData.forEach(item=>{
               if(regInput.test(item.label)){
                   arrSearch.push(item.id);
               }

           })
            arrSearch.forEach(id=>{
                const idx = todoData.findIndex((el)=>el.id===id);
                console.log(idx);
                newArray=[
                  todoData[idx]
                ]


            })
            console.log(newArray);
            return{
                todoData:newArray
            }
        })

    }

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
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }

        })
    }
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


    render() {
        const doneCount = this.state.todoData
            .filter((el) => el.done).length;
        const todoCount = this.state.todoData.length - doneCount;

        return (
            <div>
                <AppHeader todo={todoCount} done={doneCount}/>
                <SearchPanel onChangeInput = {this.onChangeInput}/>
                <ItemStatusFilter/>0
                <TodoList
                    todos={this.state.todoData}
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