import "./input.css"
import Button from "../../Elements/Buttons/Button"
import Search from "../../Elements/Search/Search"

const Input = () => {
    return <div className="input__container">
    <Search />
    <Button text="Tambah" className="add__button" />
    </div>
}

export default Input