import React from 'react'


// 'name': name,
// 'task': repo_link,
// 'author_id': involved_users,
// 'related_project_id': proj_id,
// 'is_active': is_active
class TodoCreateForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            repo_link: '',
            // author_id: 1,
            involved_users: 1,
            is_active: true
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        // const value = (target.name === 'is_active' ? target.checked : target.value);
        switch (name) {
            case 'is_active':
                this.setState({is_active: target.checked}); break
            case 'involved_users':
                if (target.selectedOptions) {this.setState(parseInt(target.selectedOptions.value))} break
            default:
                this.setState({[event.target.name]: event.target.value}); break
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
                            <input className="txtb" type="text" name="name" placeholder="Название" value={this.state.name}
                               onChange={(event) => this.handleChange(event)}/>
                            <select name="involved_users" className="txtb w300"
                                    onChange={(event) => this.handleChange(event)}>
                                {this.props.projs.map((proj) => <option value={proj.id}>{proj.name}</option>)}
                            </select>
                    </div>
                    <p/>
                    <div className="txtb">
                        {/*<div className="w">*/}
                            <label className="txtb block">Заметка:</label>
                            <textarea className="txtb w600 h600" name="repo_link" placeholder="Текст заметки"
                                   value={this.state.repo_link}
                                   onChange={(event) => this.handleChange(event)}/>
                        {/*</div>*/}
                    </div>
                    <p/>
                    <div>
                        <label className="txtb">Активна </label>
                        <input
                            name="is_active"
                            type="checkbox"
                            checked={this.state.is_active}
                            onChange={this.handleChange}/>
                    </div>
                    <p/>
                    <input className="txtb" type="submit" value="Сохранить заметку"/>
                </form>
            </div>
        )
    }
}

export default TodoCreateForm