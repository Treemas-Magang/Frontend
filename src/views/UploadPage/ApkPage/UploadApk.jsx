import "./apk.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const UploadApk = () => {
    return <div className="apk__container">
        <Sidebar/>
        <Content navbarText="UploadPage / Apk" informationText="Apk"/>
    </div>
}

export default UploadApk