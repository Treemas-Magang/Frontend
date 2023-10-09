/* eslint-disable react/prop-types */
import { Dropdown } from 'react-bootstrap';
import "./dropdownmenu.css"

const DropdownMenu = (props) => {
  return (
    <div>
        {/* Dropdown */}
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {props.title}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">{props.item1}</Dropdown.Item>
            <Dropdown.Item href="#/action-2">{props.item2}</Dropdown.Item>
            <Dropdown.Item href="#/action-3">{props.item3}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
  )
}

export default DropdownMenu