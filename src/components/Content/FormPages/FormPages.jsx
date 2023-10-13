/* eslint-disable react/prop-types */
import "./form.css"
import BoxInput from "../../Elements/BoxInput/BoxInput.jsx"
import TextArea from "../../Elements/TextArea/TextArea"
import Button from "../../Elements/Buttons/Button.jsx"
import Form from 'react-bootstrap/Form';

const FormPages = (props) => {
  return (
    <div className="form__container">
        <div className="form__container__top">
            <h1>{props.formTitle}</h1>
            <div className="horizontal__line"></div>
        </div>
        <div className="form__container__middle">
            <div className="form__row">
                <div className="form__row__left">
                    <p>{props.title}</p>
                </div>          
                <div className="form__row__right">
                    <BoxInput placeholder={props.title} />    
                </div>
            </div> 
            <div className="form__row">
                <div className="form__row__left">
                    <p>{props.header}</p>
                </div>          
                <div className="form__row__right">
                    <BoxInput placeholder={props.header} />    
                </div>
            </div>
            <div className="form__row">
                <div className="form__row__left">
                    <p>{props.body}</p>
                </div>          
                <div className="form__row__right">
                    <TextArea placeholder={props.body} />    
                </div>
            </div>
            {props.showUpload && (
                <div className="form__row">
                    <Form.Group class="upload" controlId="formFile">
                        <div className="form__row__left">
                            <Form.Label>{props.image}</Form.Label>
                        </div>
                        <div className="form__row__right">
                            <Form.Control type="file" />
                        </div>
                    </Form.Group>
                </div>
            )}
            <div className="form__row">
                <div className="form__row__left">
                    <p>{props.footer}</p>
                </div>          
                <div className="form__row__right">
                    <TextArea placeholder={props.footer} />    
                </div>
            </div>

        </div>
        <div className="form__row__bottom">
            <Button className="cancel__button" text="Cancel" />
            <Button className="submit__button" text="Submit"/>
        </div>
    </div>
  )
}

export default FormPages