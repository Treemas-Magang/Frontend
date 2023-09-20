/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./informationTop.css"
import { useState } from "react"

const InformationTop = (props) => {
    const [active, setActive] = useState(false)

    const handleClick = () => {
        return setActive(!active)
    }

    return <div className="information__top">
        <div className="information__top__top">
            <div className="information__top__left">
                <h1>{props.informationText}</h1>
            </div>
            <div className="information__top__right">
                <div className="sort" onClick={handleClick}>
                    <i className={active ? "fa fa-sort-amount-desc" : "fa fa-sort-amount-asc"} aria-hidden="true"></i>
                    <h1>Sort</h1>
                    </div>
                <div className="filter">
                    <i className="fa fa-filter" aria-hidden="true"></i>
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