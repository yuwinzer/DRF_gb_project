import {Link, useParams} from "react-router-dom";
import React from "react";

let filter = []

function activity(obj) {
    if (obj.is_active === true) {
        return 'Активен'
    } else {
        return 'Закрыт'
    }
}

const handleSubmit = (event, load_projects) => {
    if (event.key === 'Enter') {
        console.log(event.target.value)
        load_projects(event.target.value);
    }
    // console.log(event.target.value)
    // console.log(load_projects)
    // event.preventDefault()
}

const Project = ({proj, todo}) => {
    let users = proj.involved_users
    return (
        <table className="win bgd w">
            <thead>
            <tr>
                <th>Название</th>
                <th>Участники</th>
                <th>Заметки</th>
                <th>Управление</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{proj.name}</td>
                <td>
                    {users.map((proj) => <li>{proj.username}</li>)}
                </td>
                <td>{todo.map((proj) => <li title={proj.task}>{proj.name}</li>)}</td>
                <td>
                    {activity(proj)}
                    {/*<button type='button'>{activity(proj)}</button>*/}
                    {/*<button onClick={()=>deleteProject(proj.id)} type='button'>Удалить</button>*/}
                </td>
            </tr>
            </tbody>
        </table>
    )
}

const ProjectItem = ({proj, deleteItem}) => {
    return (
        <tr>
            <td><Link to={`/project/${proj.id}`}>{proj.name}</Link></td>
            <td>{proj.repo_link}</td>
            <td>
                {activity(proj)}
                {/*<button type='button'>{activity(proj)}</button>*/}
            </td>
            <td>
                <button onClick={() => deleteItem(proj.id)} type='button'>Удалить</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projs, load_projects, deleteItem}) => {
    return (
        <div>
            <table className="win bgd w">
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Репозиторий</th>
                    <th>Состояние</th>
                    <th>Управление</th>
                </tr>
                </thead>
                <tbody>
                {projs.map((proj) => <ProjectItem proj={proj} deleteItem={deleteItem}/>)}
                </tbody>

            </table>
            <nav>
                <div className="menu bgd">
                    <li><input className="txtb" type="text" placeholder="Найти"
                               onKeyUp={(event) => handleSubmit(event, load_projects)}/></li>
                    {/*onChange={(event) => this.handleChange(event)}/></li>*/}
                    <li><Link to='/projects/create'>Создать</Link></li>
                </div>
            </nav>
        </div>
    )
}
const ProjectPage = ({projs, todos, load_projects, deleteItem}) => {
    let {id} = useParams()
    if (projs.length === 0) {
        return <div/>
    }
    id = parseInt(id)
    if (id) {
        let proj = projs.find(x => x.id === id)
        let todo = todos.filter(x => x.related_project.id === id)
        return Project({proj, todo, deleteItem})
    } else {
        return ProjectList({projs, load_projects, deleteItem})
    }
}


export default ProjectPage