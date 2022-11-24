import * as React from 'react';

interface Props {
    children: React.ReactNode
}

const Modal = ({ children }: Props) => {
    const closeModal = (e: React.MouseEvent): void => {
        const modal = document.getElementById('modal')
        modal!.style.display = "none";
    }

  return(
    <div id="modal" style={{display: "none"}}>
        <div></div>
        <div>
            <h2>texto modal</h2>
        </div>
        { children }
        <button  onClick={closeModal}>fechar</button>
    </div>
  ) ;
};

export default Modal;
