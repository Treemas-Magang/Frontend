import "./cutisakit.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const DetaildataCutiSakit = () => {
    return <div className="cutisakit__container">
      <Sidebar/>
      <Content navbarText="Master Data / Cuti-Sakit" informationText="Cuti/Sakit"/>
    </div>
}

export default DetaildataCutiSakit