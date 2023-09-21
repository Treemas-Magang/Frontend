import "./libur.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Content from "../../../components/Content/Content"

const MasterDataLibur = () => {
    return <div className="libur__container">
        <Sidebar/>
        <Content navbarText="MasterData / Libur" informationText="Libur"/>
    </div>
}

export default MasterDataLibur