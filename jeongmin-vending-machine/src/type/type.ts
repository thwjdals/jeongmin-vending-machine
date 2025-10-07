export const PurchaseProcess = {
    IDLE: 'idle',
    PRODUCT_SELECTED: 'productSelected',
    CARD_ERROR: 'cardError',
    CHECKING_CARD: 'checkingCard',
    PRODUCT_DISPENSING: 'productDispensing',
  } as const;
  export type PurchaseProcess = typeof PurchaseProcess[keyof typeof PurchaseProcess];
  
  export const Message = {
    [PurchaseProcess.IDLE]: '상품을 선택해주세요.',
    [PurchaseProcess.PRODUCT_DISPENSING]: '상품이 제공되고 있습니다.',
    returningChanges: '거스름돈을 반환합니다.',
    [PurchaseProcess.CARD_ERROR]: '카드 결제 실패하였습니다.',
    [PurchaseProcess.CHECKING_CARD]: '카드 결제 중입니다.',
    [PurchaseProcess.PRODUCT_SELECTED]: '구입하시려면 현금 또는 카드를 투입해주세요.'
  } as const;
  
  export const Product = {
    COFFEE: 'coffee',
    WATER: 'water',
    COKE: 'coke'
  } as const;
  export type Product = typeof Product[keyof typeof Product];
  
  export const PurchaseType = {
    CASH: 'cash',
    CARD: 'card'
  } as const;
  export type PurchaseType = typeof PurchaseType[keyof typeof PurchaseType];
  
  export const Price: Record<typeof Product[keyof typeof Product], number> = {
    [Product.COFFEE]: 700,    
    [Product.WATER]: 600,
    [Product.COKE]: 1100
  }

// 카드 에러 클래스 정의
export class CardError extends Error {
  public readonly name = 'CARD_ERROR';
  public readonly code: string;
  
  constructor(message: string, code: string = 'UNKNOWN') {
    super(message);
    this.code = code;
    
    // Error 클래스의 name 속성을 올바르게 설정
    Object.setPrototypeOf(this, CardError.prototype);
  }
}