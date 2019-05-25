import React, {Component} from "react";
import "./item-status-filter.css"


class ItemStatusFilter extends Component {
    state = {
        status: 'All'
    };
    btn = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'done', label: 'Done'},

    ];


    render() {
        const {status, onStatusFilter} = this.props;
        const btn = this.btn.map(({name, label}) => {
            const isActive = status === name;
            const classBtn = isActive ? "btn-info" : 'btn-outline-second';
            return (
                <button type="button" className={`btn ${classBtn}`}
                        key={`${name}`}
                        onClick={() => onStatusFilter(name)}
                >
                    {label}
                </button>
            )
        })
        return (
            <div className="btn-group">
                {btn}
            </div>
        );
    }
}


export default ItemStatusFilter;