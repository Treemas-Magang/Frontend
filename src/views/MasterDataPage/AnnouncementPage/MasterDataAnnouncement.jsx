import "./announcement.css"
import Information from "../../../components/Content/Information/Information"
import Navbar from "../../../components/Content/Navbar/Navbar"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Button from "../../../components/Elements/Buttons/Button"

const MasterDataAnnouncement = () => {
    const infoTopFields = ["Title", "Header", "Body", "Footer", "Action"]

    return <div className="announcement__container">
         <div className="content__container">
            <Navbar navbarText="Master Data / Announcement" />
                <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="Header" />
                        <Button text="Pencarian" className="search__button" />
                    </div>
                    <div className="right__container__input">
                        <Button text="Tambah" className="add__button" />
                    </div>
                </div>
            <Information informationText="Announcement" showDropdown={false} fields={infoTopFields}/>
        </div>
    </div>
}

export default MasterDataAnnouncement