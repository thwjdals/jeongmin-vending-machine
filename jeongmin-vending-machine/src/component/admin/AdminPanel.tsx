import { useMachineHook } from "../../hooks/useMachineHook";
import Title from "../common/Title";
import State from "../common/State";

export default function AdminPanel() {
    const { purchaseProcess, coffeeCount, waterCount, cokeCount } = useMachineHook();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <Title title="Admin Panel" />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <State title="Coffee" content={coffeeCount.toLocaleString()} />
                <State title="Water" content={waterCount.toLocaleString()} />
                <State title="Coke" content={cokeCount.toLocaleString()} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <State title="Purchase Process" content={purchaseProcess} />
            </div>
        </div>
    );
}