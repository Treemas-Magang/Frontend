/* eslint-disable react/prop-types */
import "./information.css"
import InformationTop from "./information_top/informationTop"
import InformationMiddle from "./information_middle/InformationMiddle"
import InformationBottom from "./information_bottom/InformationBottom"

const Information = (props) => {
    return <div className="information__container">
        <InformationTop informationText={props.informationText} />
        <InformationMiddle />
        <InformationBottom />
    </div>
}

export default Information