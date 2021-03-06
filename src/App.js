import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      taskEditing : null,
      filter : {
        name: '',
        status : -1
      },
      keyword: '',
      sortBy: 'name',
      sortValue : 1
    }
  }
  onToggolForm = () => {
    this.props.onToggleForm();
  }
  onShowForm = () =>{
    this.setState({
      isDisplayForm : true
    });
  }
  findIndex = (id) => {
    var {tasks} = this.state 
    var result  = -1;
    tasks.forEach((task, index) => { 
      if(task.id === id){
        result = index 
      }
    });
    return result;
  }
  onDelete = (id) => {
    var {tasks} = this.state 
    var index = this.findIndex(id);
    if(index !== -1){
      tasks.splice(index, 1); 
      this.setState({
        tasks : tasks
      });
      localStorage.setItem('tasks',JSON.stringify(tasks)); 
    }
    this.onCloseForm(); 
  }
  onUpdate = (id) => {
    console.log("id ne",id)
    var {tasks} = this.state 
    var index = this.findIndex(id); 
    var taskEditing = tasks[index]; 
    this.setState({
       taskEditing : taskEditing 
    })
    this.onShowForm();
  }
  onFilter = (filterName, filterStatus) => {
    console.log(filterName, '-', filterStatus);
    console.log(typeof filterStatus);
    filterStatus = parseInt(filterStatus,10);
    console.log(typeof filterStatus);
    this.setState({
      filter : {
        name : filterName.toLowerCase(),
        status : filterStatus
      }
    })
  }

  onSearch = (keyword) => {
    console.log(keyword)
    this.setState({
      keyword : keyword
    })
  }

  onSort = (sortBy,sortValue) => {
    this.setState({
      sortBy : sortBy,
      sortValue : sortValue
    });
    console.log(this.state)
  }

  render() {
    var {taskEditing, filter, keyword, sortBy,sortValue} = this.state; // tao mot bien moi chua state
    var  {isDisplayForm} = this.props;
    // if(filter){ 
    //   if(filter.name){
    //     tasks = tasks.filter((task) => {
    //       return task.name.toLowerCase().indexOf(filter.name) !== -1;
    //     });
    //   }
    //   tasks = tasks.filter((task) => {
    //     if(filter.status === -1){
    //       return task;
    //     }else{
    //       return task.status === (filter.status === 1 ? true : false)
    //     }
    //   });
    // }
    // if(keyword){
    //   tasks = tasks.filter((task) => {
    //     return task.name.toLowerCase().indexOf(keyword) !== -1;
    //   });
    // }
    // if(sortBy === 'name'){ // truong hop name
    //   tasks.sort((a,b) => {
    //     if(a.name > b.name){
    //       return sortValue;
    //     }else if (a.name < b.name) {
    //       return -sortValue;
    //     } else {
    //       return 0;
    //     }
    //   });
    // }else{ // truong hop name
    //   tasks.sort((a,b) => {
    //     if(a.status > b.status){
    //       return -sortValue;
    //     }else if (a.status < b.status) {
    //       return sortValue;
    //     } else {
    //       return 0;
    //     }
    //   });
    // }
    var elmTaskForm = isDisplayForm ? <TaskForm task={taskEditing} /> : ''; 

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
        </div>
        <div className="row">
          <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
           {elmTaskForm} 
          </div>
          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button
             type="button"
             className="btn btn-primary"
             onClick={this.onToggolForm}
            >
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
            <TaskControl
             onSearch={this.onSearch}
             onSort={this.onSort}
             sortBy={sortBy}
             sortValue={sortValue}
            />
            <TaskList
             onDelete={this.onDelete}
             onUpdate={this.onUpdate}
             onFilter={this.onFilter}
            /> 
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return{
    isDisplayForm: state.isDisplayForm
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return{
    onToggleForm : () => {
      dispatch(actions.toggleForm());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps) (App);
