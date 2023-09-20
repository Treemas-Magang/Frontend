/* eslint-disable react/prop-types */
import "./informationTop.css"
import Filter from "../../../../images/filter.png"
import Sort from "../../../../images/sort.png"

const InformationTop = (props) => {
    return <div className="information__top">
        <div className="information__top__top">
            <div className="information__top__left">
                <h1>{props.informationText}</h1>
            </div>
            <div className="information__top__right">
                <div className="sort">
                    <img src={Sort} alt="sort" />
                    <h1>Sort</h1>
                    </div>
                <div className="filter">
                    <img src={Filter} alt="filter" />
                    <h1>Filter</h1>
                </div>
            </div>  
        </div>
        <div className="information__top__bottom">
            <div className="information__top__bottom__fields">
                <p>ID</p>
                <p>Nama Karyawan</p>
                <p>Tanggal</p>
                <p>Nominal</p>
                <p>Keterangan</p>
                <p>Absen</p>
            </div>
            <div className="horizontal__line"></div>
        </div>
    </div>
}

export default InformationTop