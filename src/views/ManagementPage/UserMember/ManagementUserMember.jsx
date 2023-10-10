import "./usermember.css"
import DropdownMenu from "../../../components/Elements/DropdownMenu/DropdownMenu"
import Navbar from "../../../components/Content/Navbar/Navbar"
import Information from "../../../components/Content/Information/Information"


const ManagementUserMember = () => {
    return <div className="usermember__container">
        <div className="content__container">
            <Navbar navbarText="ManagementUserMember / User-Member" />
              
            <div className="left__container__input">
                <DropdownMenu title="Karyawan" />
            </div>
            
            <Information informationText="User Member"/>
        </div>

    </div>
}

export default ManagementUserMember