import React, {Component} from 'react';
import './todo-list-item.css';

class TodoListItem extends Component {

    render() {
        const { label, onDeleted, onToggleDone, onToggleImportant, important, done } = this.props;
        let classNames = 'todo-list-item';
        if (done) {
            classNames += ' done';
        }
        if (important) {
            classNames += ' important'
        }

        return (
            <span className={classNames}>
        <span className="todo-list-item--label"
              onClick={onToggleDone}>
        {label}
        </span>
        <div className="wrap-btn">
              <button type="button"
                      className="btn btn-sm btn-outline-success red"
                      onClick={onToggleImportant}>
            <i className="fa fa-exclamation"></i>
        </button>
         <button type="button" className="btn btn-sm btn-outline-success red"
         onClick={onDeleted}>
            <i className="fa fa-trash-o"></i>
        </button>
        </div>

    </span>
        )
    }

}


export default TodoListItem