import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from './../actions/index'

class TaskForm extends Component {

    constructor(props){
      super(props);
      this.state = ({
          id: '',
          name: '',
          status: true
      });
    }

    onCloseForm = () => {
        this.props.onCloseForm()
    }

    onChange = (e) => {
      var target = e.target;
      var name = target.name;
      var value = target.value;
      if(name === 'status'){
        value = target.value === 'true' ? true : false;
      }
        
      this.setState({
        [name]: value, //sử dụng [key]
      });
    }

    onSave = (e) => {
      e.preventDefault();
      this.props.onSaveTask(this.state)
      this.onClear();
      this.onCloseForm();
    }

    onClear = () => {
      this.setState({
        name: '',
        status: false
      })
    }


    // <TaskForm task={taskEditing} />
    //Click <button>Sửa sẽ được gọi 
    componentDidMount(){
      if(this.props.itemEditing && this.props.itemEditing.id !== null){
        this.setState({
          id: this.props.itemEditing.id,
          name: this.props.itemEditing.name,
          status: this.props.itemEditing.status
        });
      }else{
        this.onClear();
      }
    }

    static getDerivedStateFromProps(props, state) {
      if (props.itemEditing) {
        if(props.itemEditing.id !== state.id){
          return {
            id: props.itemEditing.id,
            name: props.itemEditing.name,
            status: props.itemEditing.status
          }
        }
      }else{
        if(state.id){
          return {
            id: '',
            name: '',
            status: true
          }
        }
      }
      return null
    }



  render() {
    

    var { id } = this.state

    if(!this.props.isDisplayForm) return null;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 onClick={this.onCloseForm} className="panel-title">
          { id !== '' ? 'CẬP NHẬT CÔNG VIỆC' : 'THÊM CÔNG VIỆC' }
          <span className="fa fa-times-circle ml-188" ></span> </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={ this.onSave }>
            <div className="form-group">
              <label>Tên :</label>
              <input type="text" className="form-control" 
                name="name"
                value={ this.state.name }
                onChange={ this.onChange }
              />
            </div>
            <label>Trạng Thái :</label>
            <select className="form-control" 
                required="required" 
                name="status"
                value={ this.state.status }
                onChange={ this.onChange }
            >
              <option value={ true }>Kích Hoạt</option>
              <option value={ false }>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
              { id !== '' ? 'Lưu' : 'Thêm' }
              </button>
              &nbsp;
              <button type="button" className="btn btn-danger"
              onClick={ this.onClear }>
                Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return{
    isDisplayForm : state.isDisplayForm,
    itemEditing : state.itemEditing
  }
};

const mapDisPatchToProps = (dispatch, props) => {
  return{
      onSaveTask: (task) => {
        dispatch(actions.saveTask(task));
      },
      onCloseForm : () => {
        dispatch(actions.closeForm())
      }
  }
};

export default connect(mapStateToProps, mapDisPatchToProps )(TaskForm);
