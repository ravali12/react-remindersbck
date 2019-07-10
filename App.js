import React , {Component} from 'react';
import Todos from './components/Todos';
import './App.css';
import Header from'./components/layout/Header';
import Add from './components/Add';
import uuid from 'uuid';
import{BrowserRouter as Router, Route} from 'react-router-dom';
import Axios from 'axios';
import About from './components/Pages/About';

class App extends Component {

    state = {
        todos: []
    }

    componentDidMount() {
        Axios.get('')
        .then(res => console.log(res.data))
    }

markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo => {
        if(todo.id === id) {
            todo.completed = !todo.completed
        }
        return todo;
        }) });
    }



//Delete todo 
delTodo = (id) =>{
    this.setState({todos: [...this.state.todos.filter(todo => todo.id !==id)]});
}

//Add
add = (title) => {
    const newTodo = {
        id: uuid.v4(),
        title,
        completed: false

    }
    this.setState({todos: [...this.state.todos, newTodo]});
}

render(){
    return (
        <Router>
        <div className="App">
            <div className="container">
                <Header />
                <Route path="/" render = {props =>
                (
                    <React.Fragment>
                    <Add add = {this.add}/>
                    <Todos todos={this.state.todos} markComplete={this.markComplete}
                    delTodo = {this.delTodo}/>
                    </React.Fragment>
                )}/>
                <Route path ="/about" component = {About}/>
                
            </div>
        </div>
        </Router>
    );
  }
}

export default App;
