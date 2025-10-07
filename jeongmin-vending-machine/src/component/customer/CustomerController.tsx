import { useEffect } from "react";
import { useMachineHook } from "../../hooks/useMachineHook";
import { Price, Product, PurchaseProcess, PurchaseType } from "../../type/type";
import Title from "../common/Title";
import Button from "../common/Button";

export default function CustomerController() {
    const { insertCash, selectProduct, insertCard, returnCash, purchaseProcess, selectedProduct, cash, purchase, coffeeCount, waterCount, cokeCount } = useMachineHook();

    // 상품 선택 및 현금 투입 후, 조건 충족 시 구매 진행
    useEffect(() => {
        if (purchaseProcess === PurchaseProcess.PRODUCT_SELECTED && !!selectedProduct && cash >= Price[selectedProduct]) {
            purchase({ product: selectedProduct, purchaseType: PurchaseType.CASH });
        }
    }, [selectedProduct, cash])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <Title title="Customer Controller" />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <Button title="Insert Cash 100" onClick={() => insertCash(100)} />
                <Button title="Insert Cash 500" onClick={() => insertCash(500)} />
                <Button title="Insert Cash 1,000" onClick={() => insertCash(1000)} />
                <Button title="Insert Cash 5,000" onClick={() => insertCash(5000)} />
                <Button title="Insert Cash 10,000" onClick={() => insertCash(10000)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <Button title={`Select Coffee (${Price[Product.COFFEE]})`} onClick={() => selectProduct(Product.COFFEE)} disabled={coffeeCount <= 0} />
                <Button title={`Select Water (${Price[Product.WATER]})`} onClick={() => selectProduct(Product.WATER)} disabled={waterCount <= 0} />
                <Button title={`Select Coke (${Price[Product.COKE].toLocaleString()})`} onClick={() => selectProduct(Product.COKE)} disabled={cokeCount <= 0} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <Button title="Insert Card (Success)" onClick={() => insertCard('1')} disabled={purchaseProcess !== PurchaseProcess.PRODUCT_SELECTED || !selectedProduct} />
                <Button title="Insert Card (Failed)" onClick={() => insertCard('2')} disabled={purchaseProcess !== PurchaseProcess.PRODUCT_SELECTED || !selectedProduct} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <Button title="Return Cash" onClick={() => returnCash()} disabled={cash <= 0} />
            </div>
        </div>
    );
}