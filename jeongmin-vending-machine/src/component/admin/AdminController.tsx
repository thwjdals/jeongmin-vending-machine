import { useMachineHook } from "../../hooks/useMachineHook";
import Button from "../common/Button";
import Title from "../common/Title";

export default function AdminController() {
    const { coffeeCount, waterCount, cokeCount, setCoffeeCount, setWaterCount, setCokeCount } = useMachineHook();
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <Title title="Admin Controller" />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <Button title="Add Coffee" onClick={() => setCoffeeCount(coffeeCount + 1)} />
                <Button title="Add Water" onClick={() => setWaterCount(waterCount + 1)} />
                <Button title="Add Coke" onClick={() => setCokeCount(cokeCount + 1)} />
            </div>
        </div>
    );
}