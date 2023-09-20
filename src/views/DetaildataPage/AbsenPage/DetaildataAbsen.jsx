import "./absen.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const DetaildataAbsen = () => {
    return <div className="absen__container">
        <Sidebar />
        <Content navbarText="Master Data / Absen" informationText="Absen"/>
    </div>
}

export default DetaildataAbsen
