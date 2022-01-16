import {Link, useParams} from "react-router-dom";

function activity(obj){
    if (obj.is_active === true){return 'активен'}else{return 'закрыт'}
}
const Project = ({proj, todo}) => {
    let users = proj.involved_users
    return (
        <table className="win bgd">
            <thead>
                <tr>
                    <th>Название</th>
                    <th>Участники</th>
                    <th>Заметки</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{proj.name} ({activity(proj)})</td>
                    <td>
                        {users.map((proj) => <li>{proj.username}</li>)}
                    </td>
                    <td>{todo.map((proj) => <li title={proj.task}>{proj.name}</li>)}</td>
                </tr>
            </tbody>
        </table>
    )
}

const ProjectItem = ({proj}) => {
    return (
        <tr>
            <td><Link to={`/project/${proj.id}`}>{proj.name}</Link></td>
            <td>{proj.repo_link}</td>
            <td>{activity(proj)}</td>
        </tr>
    )
}

const ProjectList = ({projs}) => {
    return (
    <table className="win bgd">
        <thead>
            <tr>
                <th>Название</th>
                <th>Репозиторий</th>
                <th>Состояние</th>
            </tr>
        </thead>
        <tbody>
            {projs.map((proj) => <ProjectItem proj={proj}/>)}
        </tbody>
    </table>
)
}
const ProjectPage = ({projs, todos}) => {
    // console.log('1:', typeof(projs), projs)
    // console.log('2:', typeof(todos), todos)
    let { id } = useParams()
    if (projs.length === 0){return <div/>}
    id = parseInt(id)
    if (id){
        let proj = projs.find(x => x.id === id)
        let todo = todos.filter(x => x.related_project.id === id)
        // console.log('3:', typeof(proj), proj)
        // console.log('4:', typeof(todo), todo)
        return Project({proj, todo})
    }else{
        return ProjectList({projs})
    }
}


export default ProjectPage