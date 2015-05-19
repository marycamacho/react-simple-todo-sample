/** @jsx React DOM */

var TodoInput = React.createClass({

  getInitialState: function(){
    return { val: "" };
  },

  handleChange : function(){
      this.setState({val : event.target.value});

  },

  addTodo : function(e){
    e.preventDefault();
      this.props.addItem(this.state.val);
      this.setState({val:""});
  },

  render: function() {
      return (
        <div className="row">
          <div className="col-lg-6 col-lg-offset-3">
            <form onSubmit ={this.addTodo} >
              <input autofocus type="text"onChange={this.handleChange}
                                          value={this.state.val}
                                          className="form-control"
                                          placeholder="Todo name"/>
            </form>
          </div>
        </div>
      );
  }
});

var TodoItem = React.createClass({

  delete :function(){
    this.props.delete(this.props.idx);
  },
  changeState :function(){
    this.props.change(this.props.idx);
  },

  render : function(){

    var todo = this.props.todo;
    stateClass ="glyphicon glyphicon-ok ";
    stateClassText="list-group-item ";

    if(todo.completed){
      stateClass += "valid";
      stateClassText += "strike";
    }

    return(
      <a className={stateClassText}><i onClick={this.changeState} className={stateClass}></i> {todo.name} <i className="glyphicon glyphicon-remove" onClick={this.delete}></i></a>
    );
  }
});

var TodoList = React.createClass({


  getInitialState : function(){
    return { todos : [
              {name:"buy beer" , completed:false},
              {name:"buy Soda" , completed:true}]
          };
  },

  deleteItem : function(key){
    this.state.todos.splice(key,1);
    this.setState({todos: this.state.todos});
  },

  change : function(key){
    state = this.state.todos[key].completed;
    if(state){
      this.state.todos[key].completed = false ;
    }else{
      this.state.todos[key].completed = true ;
    }

    this.setState({todos: this.state.todos});
  },

  add:function(text){
    this.state.todos.push({name:text,completed:false});
    this.setState({todos: this.state.todos});
  },


  render: function(){
    var that = this ;
    rows = this.state.todos.map(function(todo,i){
        return <TodoItem todo={todo} change={that.change} delete={that.deleteItem} idx={i} />
    });


    return(
      <div>
        <TodoInput addItem={this.add}/>
        <div className="row validation">
            <div className="col-lg-6 col-lg-offset-3">
              <div className="list-group">
                <div className="panel panel-primary">
                  <div className="panel-heading">Todos</div>
                  <div className="panel-body">
                    <div className="list-group">
                        {rows}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
});



var AppComponent  = React.createClass({
  render: function(){
    return (
      <div>
        <TodoList/>
      </div>
    );
  }
});

React.render(
<AppComponent />,
document.getElementById('appView'));
