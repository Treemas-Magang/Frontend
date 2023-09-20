import "./claim.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const ReportDataClaim = () => {
    return <div className="claim__container">
        <Sidebar/>
        <Content navbarText="Report Data / Claim" informationText="Claim"/>
    </div>
}

export default ReportDataClaim