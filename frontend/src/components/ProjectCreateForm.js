import React from 'react'

class ProjectCreateForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            repo_link: '',
            involved_users: [],
            is_active: true
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        // const value = (target.name === 'is_active' ? target.checked : target.value);
        switch (name) {
            case 'is_active': this.setState({is_active: target.checked}); break
            case 'involved_users':
                if(target.selectedOptions){
                    let users = []
                    for (let i=0; i<target.selectedOptions.length; i++){
                        users.push(parseInt(target.selectedOptions.item(i).value))
                    }
                    this.setState({involved_users: users});
                } break
            default: this.setState({[event.target.name]: event.target.value}); break
        }
        // console.log(this.state)
    }

    handleSubmit(event) {
        console.log(this.state.name, this.state.repo_link, this.state.involved_users, this.state.is_active)
        this.props.createItem(this.state.name, this.state.repo_link, this.state.involved_users, this.state.is_active)
        event.preventDefault()
    }

    render() {
        return (
            <div className="win bgd">
                <form className="msg" onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="txtb">
                        {/*<label for="login">name</label>*/}
                        <input className="txtb" type="text" name="name" placeholder="Название" value={this.state.name}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <p/>
                    <div className="txtb">
                        {/*<label for="login">name</label>*/}
                        <input className="txtb" type="text" name="repo_link" placeholder="Репозиторий"
                               value={this.state.repo_link}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <p/>
                    <div>
                        {/*<input className="txtb" type="number" name="involved_users" placeholder="Участники"*/}
                        {/*       value={this.state.involved_users}*/}
                        {/*       onChange={(event) => this.handleChange(event)}/>*/}
                        <select multiple name="involved_users" className="txtb w300 h600"
                                onChange={(event) => this.handleChange(event)}>
                            {this.props.users.map((user) => <option value={user.id}>{user.username}</option>)}
                        </select>
                    </div>
                    <p/>
                    <div>
                        <label className="txtb">Активен </label>
                        <input
                            name="is_active"
                            type="checkbox"
                            checked={this.state.is_active}
                            onChange={this.handleChange}/>
                    </div>
                    <p/>
                    <input className="txtb" type="submit" value="Сохранить проект"/>
                </form>
            </div>
        )
    }
}

export default ProjectCreateForm