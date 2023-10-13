import "./cutiform.css"
import FormPages from "../../../components/Content/FormPages/FormPages";

const MasterDataCutiForm = () => {
    const boxInput = ["ID", "Nominal"]
    const textArea = ["Keterangan"]
    return <div className="cutiform__container"> 
            <div className="content__container">
            <FormPages formTitle="Cuti Form" boxInput={boxInput} textArea={textArea} showUpload={false} />
        </div>
    </div>
}

export default MasterDataCutiForm