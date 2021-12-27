import {Link} from 'react-router-dom'

const Menu = () => {
    return (
        <nav>
            <ul className="menu bgd">
                <li><Link to='/'>Пользователи</Link></li>
                <li><Link to='/projects'>Проекты</Link></li>
                <li><Link to='/todos'>Заметки</Link></li>
            </ul>
        </nav>
    )
}

export default Menu;