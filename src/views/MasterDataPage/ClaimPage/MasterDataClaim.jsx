import "./claim.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const MasterDataClaim = () => {
    return <div className="claim__container">
        <Sidebar/>
        <Content navbarText="Master Data / Claim" informationText="Claim"/>
    </div>
}

export default MasterDataClaim