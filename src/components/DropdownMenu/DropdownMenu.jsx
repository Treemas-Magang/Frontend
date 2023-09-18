import { Link } from "react-router-dom"

const DropdownMenu = (props) => {
    return <li className="dropdown__item">
        <Link to="">{props.text}</Link>
    </li>
}

export default DropdownMenu