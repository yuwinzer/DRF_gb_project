import React from 'react';
import {BrowserRouter, Route, Routes, Navigate, useLocation, Link} from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
// import Menu from './components/Menu';
import UserList from "./components/User";
import Footer from './components/Footer';
import TodoList from "./components/Todo";
import ProjectPage from "./components/Project";
import LoginForm from './components/Auth.js';

let username = 'Пользователь'

const NotFound404 = () => {
    let loc = useLocation()
    return (
        <div className="msg win txtb">404<p/>Page not found:<p/>"{loc.pathname}"</div>
    )
}

class App extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            'users': [],
            'projs': [],
            'todos': [],
            'token': '',
            'user': 'Вы не вошли'
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_auth() {
        // return this.state.token != ''
        return !!this.state.token
    }

    logout() {
        this.set_token('')
        this.state.user = 'Вы не вошли'
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, this.load_data)
    }

    get_token(username, password) {
        axios
            // .post('http://127.0.0.1:8000/api/token/', {"username": username, "password": password})
            .post('http://127.0.0.1:8000/api-token-auth/', {"username": username, "password": password})
            .then(response => {
                // const token = response.data.token
                // console.log(token)
                this.set_token(response.data.token)
                this.state.user = username
                // console.log('token ' + this.state.token)
                // console.log('response.data ' + response.data)
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {'Content-Type': 'application/json'}
        if (this.is_auth()) {
            headers['Authorization'] = 'Token ' + this.state.token
            // headers['Authorization'] = 'Bearer ' + this.state.token
            console.log('POST token ' + this.state.token)
        }
        return headers
    }

    componentDidMount() {
        this.get_token_from_storage()

    }

    load_data() {
        let headers = this.get_headers()
        axios
            .get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                this.setState({users: response.data.results})
            }).catch(error => {
                console.log(error)
                this.setState({users: []})
            })

        const requestOne = axios.get('http://127.0.0.1:8000/api/projects/', {headers});
        const requestTwo = axios.get('http://127.0.0.1:8000/api/todos/', {headers});
        axios
            .all([requestOne, requestTwo])
            .then(axios.spread((...responses) => {
                    console.log(responses[0].data, responses[1].data)
                    this.setState({
                        projs: responses[0].data.results,
                        todos: responses[1].data.results
                    })
                })
            ).catch(error => {
                console.log(error)
                this.setState({projs: []})
                this.setState({todos: []})
            })

        axios
            .get('http://127.0.0.1:8000/api/todos/', {headers})
            .then(response => {
                this.setState({todos: response.data.results})
            }).catch(error => {
                console.log(error)
                this.setState({todos: []})
            })
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    {/*<Menu/>*/}
                    <header className="bgd w">
                        <div className="menu c z">
                            <li><Link to='/'>Пользователи</Link></li>
                            <li><Link to='/projects'>Проекты</Link></li>
                            <li><Link to='/todos'>Заметки</Link></li>
                        </div>
                        <div className="menu r z">
                            <li><span>{this.state.user}</span></li>
                            <li>{this.is_auth() ?
                            <a className='button' onClick={() => this.logout()}>Выйти</a> :
                            <Link to='/login'>Войти</Link>}</li>
                        </div>
                    </header>
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
                        <Route path='/login' element={<LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>
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