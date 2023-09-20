import "./claimform.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const MasterDataClaimForm = () => {
    return <div className="claimform__container">
        <Sidebar/>
        <Content navbarText="Master Data / ClaimForm" informationText="ClaimForm"/>
    </div>     
}

export default MasterDataClaimForm