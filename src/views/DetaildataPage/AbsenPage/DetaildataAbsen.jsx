import "./absen.css"
import Information from "../../../components/Content/Information/Information"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Navbar from "../../../components/Content/Navbar/Navbar"
import Button from "../../../components/Elements/Buttons/Button"
import DropdownMenu from "../../../components/Elements/DropdownMenu/DropdownMenu"

const DetaildataAbsen = () => {
    return <div className="absen__container">
        <div className="content__container">
            <Navbar navbarText="Detail Data / Absen" />
                <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="Tanggal"/>
                        <BoxInput placeholder="NIK"/>
                        <BoxInput placeholder="Nama"/>
                        <DropdownMenu title="Pilih Status" />
                        <DropdownMenu title="Pilih Total Jam"/>
                        <DropdownMenu title="Pilih Project"/>

                    </div>
                    <div className="right__container__input">
                        <Button text="Tambah" className="add__button" />
                    </div>
                </div>
            <Information informationText="Absen"/>
        </div>

        </div>

}

export default DetaildataAbsen
