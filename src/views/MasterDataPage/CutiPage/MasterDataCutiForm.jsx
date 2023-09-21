import "./cutiform.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const MasterDataCutiForm = () => {
    return <div className="cutiform__container"> 
    <Sidebar/>
    <Content navbarText="MasterData / Cuti" informationText="Cuti"/>
    </div>
}

export default MasterDataCutiForm