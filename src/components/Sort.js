import React, { Component } from "react";
import { connect } from 'react-redux'
import * as actions from './../actions/index'


class Sort extends Component {

  onClick = (sortBy, sortValue) => {
    this.props.onSort({
      by: sortBy, 
      value: sortValue
    })
  }
  
  render() {

    return (
     
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenu1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
            >
              Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li onClick={ () => this.onClick('name', 1) }>
                <button 
                    className={(this.props.sort.by === 'name' && 
                    this.props.sort.value === 1) ? 'sort_selected' : ''}  >
                  <span className="fa fa-sort-alpha-asc pr-5 mr-5">
                    Tên A-Z
                  </span>
                </button>
              </li>
              <li onClick={ () => this.onClick('name', -1) }>
                <button 
                    
                    className={(this.props.sort.by === 'name' && 
                    this.props.sort.value === -1) ? 'sort_selected' : ''} >
                    
                  <span className="fa fa-sort-alpha-desc pr-5">Tên Z-A</span>
                </button>
              </li>
              <li role="separator" className="divider"></li>
              <li onClick={ () => this.onClick('status', 1) }>
                <button
                    className={(this.props.sort.by === 'status' && 
                    this.props.sort.value === 1) ? 'sort_selected' : ''}   >
                  Trạng Thái Kích Hoạt
                </button>
              </li>
              <li onClick={ () => this.onClick('status', -1) }>
                <button
                    className={(this.props.sort.by === 'status' && 
                    this.props.sort.value === -1) ? 'sort_selected' : ''} >
                  Trạng Thái Ẩn
                </button>
              </li>
            </ul>
          </div>
        </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sort: state.sort
  };
}
const mapDisPatchToProps = (dispatch, props) => {
  return{
      onSort: (sort) => {
          dispatch(actions.sortTask(sort));
      }
  }
};

export default connect(mapStateToProps, mapDisPatchToProps)(Sort);

