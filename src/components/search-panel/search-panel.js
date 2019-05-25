import React, {Component} from 'react';
import "./search-panel.css";

export default class SearchPanel extends Component {
    state = {
        filter: ""
    };
    onChangeInput = (e) => {
        const filter = e.target.value;
        this.setState({filter});
        this.props.onChangeInput(filter)
    };

    render() {
        const searchText = 'type here to search';
        return <input type="text" placeholder={searchText}
                      onChange={this.onChangeInput}
                      autoComplete=""
                      className="foo"
                      disabled={false}
                      value={this.state.filter}
        />;
    }

};
