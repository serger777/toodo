import React, {Component}  from 'react';
import "./search-panel.css";
 export default class SearchPanel extends Component{

     render(){
         const searchText = 'type here to search';
         const { onChangeInput } = this.props;
         return <input placeholder={searchText}
                       onChange={onChangeInput}
                       autoComplete=""
                       className="foo"
                       disabled={false}
         />;
     }

};
