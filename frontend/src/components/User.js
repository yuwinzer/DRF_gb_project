// import {Link} from "react-router-dom";

const UserItem = ({user}) => {
    return (
        <tr>
            {/*<td><Link to={`/user/${user.id}`}>{user.username}</Link></td>*/}
            <td>{user.username}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <table className="win bgd w">
            <thead>
                <tr>
                    <th>User name</th>
                    <th>First name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => <UserItem user={user}/>)}
            </tbody>

        </table>
    )
}


export default UserList