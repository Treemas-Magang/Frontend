import "./generalform.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const ParameterGeneralForm = () => {
    return <div className="generalform__container">
        <Sidebar/>
        <Content navbarText="Parameter / GeneralForm" informationText="GeneralForm"/>
    </div>
}

export default ParameterGeneralForm 