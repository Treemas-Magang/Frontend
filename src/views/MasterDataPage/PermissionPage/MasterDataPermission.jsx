import "./permission.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const MasterDataPermission = () =>{
    return <div className="permission__container">
        <Sidebar/>
        <Content navbarText="Master Data / Permission" informationText="Permission"/>
    </div>
}

export default MasterDataPermission