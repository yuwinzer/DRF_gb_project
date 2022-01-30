import React from 'react';
import {BrowserRouter, Link, Navigate, Route, Routes, useLocation} from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import UserList from "./components/User";
import Footer from './components/Footer';
import TodoList from "./components/Todo";
import ProjectPage from "./components/Project";
import LoginForm from './components/Auth.js';
import ProjectCreateForm from "./components/ProjectCreateForm";
import TodoCreateForm from "./components/TodoCreateForm";

let useranon = 'Пользователь'

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
            'user': useranon,
        }
    }

    set_token(token, user) {
        const cookies = new Cookies()
        cookies.set('token', token)
        cookies.set('user', user)
        this.setState({'token': token}, () => this.load_data())
    }

    is_auth() {
        return !!this.state.token
    }

    logout() {
        this.set_token('', useranon)
        this.state.user = useranon
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        const user = cookies.get('user')
        // console.log('token user' + token, user)
        // console.log('cookie token ' + cookies.get('token'))
        if (!token) {
            this.logout()
        } else {
            this.state.user = user
            this.setState({'token': token}, this.load_data)
        }
    }

    get_token(username, password) {
        axios
            // .post('http://127.0.0.1:8000/api/token/', {"username": username, "password": password})
            .post('http://127.0.0.1:8000/api-token-auth/', {"username": username, "password": password})
            .then(response => {
                this.set_token(response.data.token, username)
                this.state.user = username
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {'Content-Type': 'application/json'}
        if (this.is_auth()) {
            headers['Authorization'] = 'Token ' + this.state.token
            // headers['Authorization'] = 'Bearer ' + this.state.token
            // console.log('POST token ' + this.state.token)
        }
        return headers
    }

    componentDidMount() {
        this.get_token_from_storage()
        // console.log('mount token ' + this.state.token)
    }

    load_projects(search = ''){
        let headers = this.get_headers()
        const requestOne = (search ?
            axios.get('http://127.0.0.1:8000/api/projects/?name=' + search, {headers}) :
            axios.get('http://127.0.0.1:8000/api/projects/', {headers}));
        console.log(search, 'http://127.0.0.1:8000/api/projects&name=' + search)
        const requestTwo = axios.get('http://127.0.0.1:8000/api/todos/', {headers});
        axios
            .all([requestOne, requestTwo])
            .then(axios.spread((...responses) => {
                    // console.log(responses[0].data, responses[1].data)
                    this.setState({
                        projs: responses[0].data.results,
                        todos: responses[1].data.results,
                        del: ''
                    })
                })
            ).catch(error => {
            console.log(error)
            this.setState({projs: []})
            this.setState({todos: []})
        })
    }

    load_data() {
        // console.log('load_data() token ' + this.state.token)
        let headers = this.get_headers()
        axios
            .get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                this.setState({users: response.data.results})
            }).catch(error => {
            console.log(error)
            this.setState({users: []})
        })
        this.load_projects()

        // const requestOne = axios.get('http://127.0.0.1:8000/api/projects/', {headers});
        // const requestTwo = axios.get('http://127.0.0.1:8000/api/todos/', {headers});
        // axios
        //     .all([requestOne, requestTwo])
        //     .then(axios.spread((...responses) => {
        //             // console.log(responses[0].data, responses[1].data)
        //             this.setState({
        //                 projs: responses[0].data.results,
        //                 todos: responses[1].data.results,
        //                 del: ''
        //             })
        //         })
        //     ).catch(error => {
        //     console.log(error)
        //     this.setState({projs: []})
        //     this.setState({todos: []})
        // })

        axios
            .get('http://127.0.0.1:8000/api/todos/', {headers})
            .then(response => {
                this.setState({todos: response.data.results})
            }).catch(error => {
            console.log(error)
            this.setState({todos: []})
        })
    }

    deleteItem(type, id) {
        const headers = this.get_headers()
        if (type === 0) {
            axios
                .delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
                .then(response => {
                    this.setState({
                        projs: this.state.projs.filter((proj) => proj.id !== id)
                    })
                }).catch(error => console.log(error))
        } else {
            this.state.todos.find((todo) => todo.id === id).is_active = false
            axios
                .delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers})
                .then(response => {
                    this.setState({
                        // todos: this.state.todos.filter((todo) => todo.id !== id)
                        // todos: this.state.todos.find((todo) => todo.id === id).is_active = false
                    })
                }).catch(error => console.log(error))
            // window.location.reload(false)
        }
    }

    createItem(type, name, repo_link, involved_users, is_active) {
        console.log('received:', type, name, repo_link, involved_users, is_active)
        const headers = this.get_headers()
        if (type === 0) {
            axios
                .post(`http://127.0.0.1:8000/api/projects/`, {
                    'name': name,
                    'repo_link': repo_link,
                    'involved_users': involved_users,
                    'is_active': is_active
                }, {headers})
                .then(response => {
                    this.load_data()
                    // let new_project = response.data
                    // console.log('new_project', new_project)
                    // new_project.involved_users = this.state.involved_users.filter((item) =>
                    //     item.id === new_project.involved_users)[0]
                    // this.setState({projs: [...this.state.projs, new_project]})
                }).catch(error => console.log(error))
            // console.log('this.state.projs', this.state.projs)
        } else {
            axios
                .post(`http://127.0.0.1:8000/api/todos/`, {
                    'name': name,
                    'task': repo_link,
                    'author': this.state.users.filter((user) => user.username === this.state.user)[0].id,
                    'related_project': involved_users,
                    'is_active': is_active
                }, {headers})
                .then(response => {
                    this.load_data()
                }).catch(error => console.log(error))
            // console.log('name=', name, 'task=', repo_link, 'author=', this.state.user,
            //     'related_project=', involved_users, 'is_active=', is_active,)
            // console.log('this.state.todos', this.state.todos)
            // console.log('index', this.state.users.filter((user) => user.username === this.state.user)[0].id)
        }
    }

    // }
    // this.state.todos.find((todo) => todo.id === id).is_active = false
    // axios
    //     .post(`http://127.0.0.1:8000/api/todos/`, data, {headers})
    //     .then(response => {
    //         this.setState({
    //             // todos: this.state.todos.filter((todo) => todo.id !== id)
    //             // todos: this.state.todos.find((todo) => todo.id === id).is_active = false
    //         })
    //     }).catch(error => console.log(error))
    // window.location.reload(false)


    render() {
        return (
            <div>
                <BrowserRouter>
                    <header>
                        <nav>
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
                        </nav>
                    </header>
                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users}/>}/>
                        <Route path='/user/:id' element={<ProjectPage projs={this.state.projs}/>}/>
                        <Route path='/users' element={<Navigate to='/'/>}/>
                        <Route exact path='/projects/create' element={<ProjectCreateForm
                            users={this.state.users}
                            createItem={(name, repo_link, involved_users, is_active) =>
                                this.createItem(0, name, repo_link, involved_users, is_active)}/>}/>
                        <Route exact path='/projects' element={<ProjectPage
                            projs={this.state.projs}
                            load_projects={(name) => this.load_projects(name)}
                            deleteItem={(id) => this.deleteItem(0, id)}/>}/>
                        <Route path='/project/:id' element={
                            <ProjectPage
                                projs={this.state.projs}
                                todos={this.state.todos}
                                deleteItem={(id) => this.deleteItem(0, id)}/>}/>
                        <Route exact path='/todos/create' element={<TodoCreateForm
                            projs={this.state.projs}
                            createItem={(name, repo_link, involved_users, is_active) =>
                                this.createItem(1, name, repo_link, involved_users, is_active)}/>}/>
                        <Route exact path='/todos' element={<TodoList
                            todos={this.state.todos}
                            deleteItem={(id) => this.deleteItem(1, id)}/>}/>
                        <Route path='/todo/:id' element={<TodoList
                            todos={this.state.todos}
                            deleteItem={(id) => this.deleteItem(1, id)}/>}/>
                        <Route path='/login'
                               element={this.is_auth() ?
                                   <Navigate to='/projects'/> :
                                   <LoginForm get_token={(username, password) =>
                                       this.get_token(username, password)}/>}/>
                        <Route path='*' element={<NotFound404/>}/>
                    </Routes>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;