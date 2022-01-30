import {Link} from "react-router-dom";

function activity(obj) {
    if (obj.is_active === true) {
        return 'Активна'
    } else {
        return 'Закрыта'
    }
}

const TodoItem = ({todo, deleteItem}) => {
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
            <td>
                <button onClick={() => deleteItem(todo.id)} type='button'>Удалить</button>
            </td>
        </tr>
    )
}

const TodoList = ({todos, deleteItem}) => {
    return (
        <div>
            <table className="win bgd w">
                <thead>
                <tr>
                    <th>Заметка</th>
                    <th>К проекту</th>
                    <th>Автор</th>
                    <th>Текст</th>
                    <th>Статус</th>
                    <th>Управление</th>
                </tr>
                </thead>
                <tbody>
                {todos.map((todo) => <TodoItem todo={todo} deleteItem={deleteItem}/>)}
                </tbody>
            </table>
            <nav>
                <div className="menu r w bgd">
                    <li><Link to='/todos/create'>Создать</Link></li>
                </div>
            </nav>
        </div>
    )
}


export default TodoList