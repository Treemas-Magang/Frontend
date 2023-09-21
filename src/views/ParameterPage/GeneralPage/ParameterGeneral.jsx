import "./general.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const ParameterGeneral = () => {
    return <div className="general__container">
        <Sidebar/>
        <Content navbarText="Parameter / General" informationText="General"/>
    </div>
}

export default ParameterGeneral