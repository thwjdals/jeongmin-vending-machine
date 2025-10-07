import { useMachineState } from "../state/useMachineStore";
import positiveNumberFuction from "../util/positiveNumberFuction";
import { Product, PurchaseProcess, PurchaseType, Price, CardError } from "../type/type";

export const useMachineHook = () => {
  const machineState = useMachineState();
  const {
    selectedProduct,
    setSelectedProduct,
    setCoffeeCount,
    setWaterCount,
    setCokeCount,
    purchaseProcess,
    setPurchaseProcess,
    cash,
    setCash,
    message,
    returnCash,
  } = machineState;

  // action 현금 투입
  // idle 또는 productSelected 상태에서만 현금 투입 가능
  // 20000원 이상 투입 불가
  const insertCash = (_cash: number) => {
    if (purchaseProcess === PurchaseProcess.IDLE || purchaseProcess === PurchaseProcess.PRODUCT_SELECTED) {
      if(cash + _cash > 20000) {
        alert('Cash is too much');
        return;
      }
      setCash(cash + _cash);
    }
  };

  // action 상품 선택
  // idle 또는 productSelected 상태에서만 상품 선택 가능
  // 이미 선택된 상품을 다시 선택하면 선택 취소
  const selectProduct = (product: Product) => {
    if (purchaseProcess === PurchaseProcess.IDLE || purchaseProcess === PurchaseProcess.PRODUCT_SELECTED) {
      if(selectedProduct === product) {
        setSelectedProduct(undefined);
        setPurchaseProcess(PurchaseProcess.IDLE);
        return;
      }

      if(machineState[product] <= 0) {
        alert(`${product} is out of stock`);
        return;
      }

      setSelectedProduct(product);
      setPurchaseProcess(PurchaseProcess.PRODUCT_SELECTED);
    }
  };

  // action 카드 투입
  // 상품이 선택된 경우 카드 결제 시도
  const insertCard = async (cardId: string) => {
    if (!!selectedProduct && (purchaseProcess === PurchaseProcess.PRODUCT_SELECTED)) {
      await purchase({product: selectedProduct, purchaseType: PurchaseType.CARD, cardId: cardId});
    }
  };

  // action 현금 반환
  const _returnCash = () => {
    if (purchaseProcess === PurchaseProcess.IDLE || purchaseProcess === PurchaseProcess.PRODUCT_SELECTED) {
      returnCash();
    }
  };

  // 내부로직(구매)
  // 2가지 타입으로 나눠서 진행(현금, 카드)
  // 카드 결제의 경우 투입된 현금 결제 후 카드 결제 진행(현금이 상품 가격보다 높은 경우는 없음)
  const purchase = async (purchaseInfo: {product: Product, purchaseType: PurchaseType, cardId?: string}) => {
    const { product, purchaseType, cardId } = purchaseInfo;
    
    try {
      if (purchaseType === PurchaseType.CASH) {
        payWithCash(Price[product]);
      } else if (purchaseType === PurchaseType.CARD) {
        if(!cardId) {
          setPurchaseProcess(PurchaseProcess.CARD_ERROR);
          setTimeout(() => {
            setPurchaseProcess(PurchaseProcess.PRODUCT_SELECTED);
          }, 1000);
          return;
        }
        const balance = Price[product] - cash;
        await payWithCard(balance, cardId);
        payWithCash(cash);
      }

      switch (product) {
        case Product.COFFEE:
          setCoffeeCount(machineState[Product.COFFEE] - 1);
          break;
        case Product.WATER:
          setWaterCount(machineState[Product.WATER] - 1);
          break;
        case Product.COKE:
          setCokeCount(machineState[Product.COKE] - 1);
          break;
      }

      setPurchaseProcess(PurchaseProcess.PRODUCT_DISPENSING);
    } catch (error) {
      if(error instanceof CardError) {
        console.log('Card payment failed');
        setPurchaseProcess(PurchaseProcess.CARD_ERROR);
        setTimeout(() => {
          setPurchaseProcess(PurchaseProcess.PRODUCT_SELECTED);
        }, 3000);
      } else {
        console.log('Purchase failed');
      }
    }
  };

  // 내부로직(현금 결제)
  const payWithCash = (balance: number) => {
    setCash(cash - balance);
    console.log(`${balance} paid with cash`);
  };

  // 내부로직(카드 결제, 비동기로 진행)
  const payWithCard = async (balance: number, cardId: string) => {
    try{
      // 카드 결제 가능 여부 확인
      await checkCard(cardId);
      setPurchaseProcess(PurchaseProcess.CHECKING_CARD);
      // 카드 결제 신청 후 결과 대기
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`${balance} paid with card ${cardId}`);
    } catch (error) {
      console.log('payWithCard failed');
      throw error;
    }
  };

  const checkCard = async (cardId: string) => {
    // 카드 결제와 관련된 로직 진행(VAN사를 통한 일련의 결제 과정)
    if(cardId === '2') {
      throw new CardError('checkCard failed');
    }
  };

  return {
    purchaseProcess,
    message,

    coffeeCount: machineState[Product.COFFEE],
    setCoffeeCount: (_coffeeCount: number) => positiveNumberFuction(_coffeeCount, setCoffeeCount),
    waterCount: machineState[Product.WATER],
    setWaterCount: (_waterCount: number) => positiveNumberFuction(_waterCount, setWaterCount),
    cokeCount: machineState[Product.COKE],
    setCokeCount: (_cokeCount: number) => positiveNumberFuction(_cokeCount, setCokeCount),

    selectedProduct,
    selectProduct,

    cash,
    insertCash,
    returnCash: _returnCash,
    insertCard,

    purchase,
  };
};