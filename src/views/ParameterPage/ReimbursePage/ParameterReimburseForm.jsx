import "./reimburseform.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const ParameterReimburseForm = () => {
    return <div className="reimburseform__container">
        <Sidebar/>
        <Content navbarText="Parameter / ReimburseForm" informationText="ReimburseForm"/>
    </div>
}

export default ParameterReimburseForm