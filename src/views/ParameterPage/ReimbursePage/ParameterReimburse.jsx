import "./reimburse.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const ParameterReimburse = () => {
    return <div className="reimburse__container">
        <Sidebar/>
        <Content navbarText="Parameter / Reimburse" informationText="Reimburse"/>
    </div>
}

export default ParameterReimburse