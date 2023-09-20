import "./input.css"
import Button from "../../Elements/Buttons/Button"

const Input = () => {
    return <div className="input__container">
    <Button text="Search" className="search__button" />
    <Button text="Tambah" className="add__button" />
    </div>
}

export default Input