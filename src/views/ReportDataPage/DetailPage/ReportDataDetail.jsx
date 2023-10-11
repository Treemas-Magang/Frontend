import "./detail.css"
import Information from "../../../components/Content/Information/Information"
import Navbar from "../../../components/Content/Navbar/Navbar"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Button from "../../../components/Elements/Buttons/Button"

const ReportDataDetail = () => {
    return <div className="detail__container">
        <div className="content__container">
            <Navbar navbarText="Report Data / Detail" />
                <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="Nama" />
                        <BoxInput placeholder="Tanggal" />
                        <Button text="Pencarian" className="search__button" />
                    </div>
                    <div className="right__container__input">
                        <Button text="Tambah" className="add__button" />
                    </div>
                </div>
            <Information informationText="Detail" showDropdown={false}/>
        </div>
    </div>
}

export default ReportDataDetail