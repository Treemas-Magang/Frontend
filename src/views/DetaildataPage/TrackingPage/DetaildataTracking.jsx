import "./tracking.css"
import Search from "../../../components/Elements/Search/Search"

const DetaildataTracking = () => {
    return <div className="tracking__container">
        <div className="content__container">
            <Navbar navbarText="Detail Data / Tracking" />
                <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="NIK"/>
                    </div>

                    <div className="right__container__input">
                        <Search text="Tambah" className="add__button" />
                    </div>
                </div>
            <Information informationText="Absen"/>
        </div>
    </div>
}

export default DetaildataTracking