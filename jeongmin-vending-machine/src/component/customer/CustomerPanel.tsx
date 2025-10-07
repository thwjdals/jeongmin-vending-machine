import { useMachineHook } from "../../hooks/useMachineHook";
import State from "../common/State";
import Title from "../common/Title";

export default function CustomerPanel() {
    const { cash, selectedProduct, message } = useMachineHook();
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <Title title="Customer Panel" />
            <State title="Cash" content={cash.toLocaleString()} />
            <State title="Message" content={message} />
            <State title="Selected Product" content={selectedProduct} />
        </div>
    );
}