import "./detail.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const ReportDataDetail = () => {
    return <div className="detail__container">
        <Sidebar/>
        <Content navbarText="Report Data / Detail" informationText="Detail"/>
    </div>
}

export default ReportDataDetail