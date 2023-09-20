import "./summary.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const ReportDataSummary = () => {
    return <div className="summary__container">
        <Sidebar/>
        <Content navbarText="Report Data / Summary" informationText="Summary"/>
    </div>
}

export default ReportDataSummary