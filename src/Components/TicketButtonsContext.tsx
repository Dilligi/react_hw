import { createContext } from "react";

let TicketButtonsContext = createContext({
    id: '',
    openModal: function () {
        
    },
    setModalId: Object()
})

export default TicketButtonsContext;