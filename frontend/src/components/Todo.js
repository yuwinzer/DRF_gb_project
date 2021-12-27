import {Link} from "react-router-dom";

function activity(obj){
    if (obj.is_active === true){return 'активна'}else{return 'закрыта'}
}

const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.name}</td>
            {/*<td>{todo.related_project.name}</td>*/}
            <td><Link to={`/project/${todo.related_project.id}`}>{todo.related_project.name}</Link></td>
            <td>{todo.author.username}</td>
            <td>{todo.task}</td>
            {/*<td><Link to={`/author/${todo.author.id}`}>{todo.author.username}</Link></td>*/}
            {/*<td><Link title={todo.task} to={`/todo/${todo.id}`}>{todo.name}</Link></td>*/}
            <td>{activity(todo)}</td>
        </tr>
    )
}

const TodoList = ({todos}) => {
    return (
        <table className="win bgd">
            <thead>
                <tr>
                    <th>Заметка</th>
                    <th>К проекту</th>
                    <th>Автор</th>
                    <th>Текст</th>
                    <th>Статус</th>
                </tr>
            </thead>
            <tbody>
                {todos.map((todo) => <TodoItem todo={todo}/>)}
            </tbody>
        </table>
    )
}


export default TodoList