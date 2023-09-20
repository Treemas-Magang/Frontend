import "./timesheet.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const DetaildataTimesheet = () => {
    return <div className="timesheet__container">
        <Sidebar/>
        <Content navbarText="Master Data / Timesheet" informationText="Timesheet"/>

    </div>
}

export default DetaildataTimesheet