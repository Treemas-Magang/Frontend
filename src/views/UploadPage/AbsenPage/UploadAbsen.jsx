import "./absen.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const UploadAbsen = () => {
    return <div className="absen__container">
        <Sidebar/>
        <Content navbarText="Upload / Absen" informationText="Absen"/>
    </div>
}

export default UploadAbsen