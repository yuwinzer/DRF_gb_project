import React from 'react';
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Menu from './components/Menu';
import UserList from "./components/User";
import Footer from './components/Footer';
import TodoList from "./components/Todo";
import ProjectPage from "./components/Project";

const NotFound404 = () => {
    let loc = useLocation()
    return (
        <div className="msg bgd">Page "{loc.pathname}" lost</div>
    )
}

class App extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            'users': [],
            'projs': [],
            'todos': [],
        }
    }

    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                // console.log(response.data)
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            })
            .catch(error => console.log(error))

        const requestOne = axios.get('http://127.0.0.1:8000/api/projects/');
        const requestTwo = axios.get('http://127.0.0.1:8000/api/todos/');

        axios
            .all([requestOne, requestTwo])
            .then(axios.spread((...responses) => {
                console.log(responses)
                const projs = responses[0].data.results
                const todos = responses[1].data.results
                console.log(projs, todos)
                this.setState(
                    {
                        'projs': projs,
                        'todos': todos
                        }
                    )
                })
            )
            // .then(response => {
            //     console.log(response.data)
            //     const projs = response.data.results
            //     this.setState(
            //         {
            //             'projs': projs
            //         }
            //     )
            // })
            .catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8000/api/todos/')
            .then(response => {
                // console.log(response.data)
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Menu/>
                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users}/>}/>
                        <Route path='/user/:id' element={<ProjectPage projs={this.state.projs}/>}/>
                        <Route path='/users' element={<Navigate to='/'/>}/>
                        <Route exact path='/projects' element={<ProjectPage
                            projs={this.state.projs}/>}/>
                        <Route path='/project/:id' element={<ProjectPage
                            projs={this.state.projs}
                            todos={this.state.todos}/>}/>
                        <Route exact path='/todos' element={<TodoList todos={this.state.todos}/>}/>
                        <Route path='/todo/:id' element={<TodoList todos={this.state.todos}/>}/>
                        <Route path='*' element={<NotFound404/>}/>
                    </Routes>
                </BrowserRouter>

                {/*<UserList users={this.state.users}/>*/}
                {/*<ProjectList projs={this.state.projs}/>*/}
                {/*<ProjectList projs={this.state.projs}/>*/}
                {/*<ProjectList projs={this.state.projs}/>*/}
                <Footer/>
            </div>
        )
    }
}

export default App;