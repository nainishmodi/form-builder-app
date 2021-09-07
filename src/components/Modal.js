import { createPortal } from 'react-dom'

const BackDrop = (props) => {
    return <div className="back-drop" onClick={props.hideModal}></div>
}

const ModalContain = (props) => {
    return <div className="modal-container">{props.children}</div>
}

const Modal = (props) => {
    const modalElm = document.getElementById('modal-area');
    return (
        <>
            {createPortal(
                <BackDrop hideModal={props.hideModal}/>,
                modalElm
            )}

            {createPortal(
                <ModalContain>
                    {props.children}
                </ModalContain>,
                modalElm
            )}
        </>
    )
}

export default Modal;
