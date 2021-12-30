import React from 'react'


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {login: '', password: ''}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        console.log(this.state.login + ' ' + this.state.password)
        this.props.get_token(this.state.login, this.state.password)
        event.preventDefault()
    }

    render() {
        return (
            <div className="win">
                <form className="msg" onSubmit={(event) => this.handleSubmit(event)}>
                    <input className="txtb" type="text" name="login" placeholder="логин"
                           value={this.state.login} onChange={(event) => this.handleChange(event)}/>
                    <p/>
                    <input className="txtb" type="password" name="password" placeholder="пароль"
                           value={this.state.password} onChange={(event) => this.handleChange(event)}/>
                    <p/>
                    <input className="txtb" type="submit" value="Войти"/>
                </form>
            </div>
        );
    }
}

export default LoginForm