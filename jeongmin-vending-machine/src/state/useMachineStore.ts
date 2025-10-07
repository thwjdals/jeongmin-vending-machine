import { create } from "zustand";
import positiveNumberFuction from "../util/positiveNumberFuction";
import { Product, PurchaseProcess, Message } from "../type/type";

export const useMachineState = create<{
    selectedProduct?: Product;
    setSelectedProduct: (product?: Product) => void;
    [Product.COFFEE]: number;
    setCoffeeCount: (count: number) => void;
    [Product.WATER]: number;
    setWaterCount: (count: number) => void;
    [Product.COKE]: number;
    setCokeCount: (count: number) => void;
    purchaseProcess: PurchaseProcess;
    setPurchaseProcess: (process: PurchaseProcess) => void;
    cash: number;
    setCash: (cash: number) => void;
    message: string;
    setMessage: (message: string) => void;
    returnCash: () => void;
  }>((set, get) => ({
    selectedProduct: undefined,
    setSelectedProduct: (product?: Product) => set({ selectedProduct: product }),
    [Product.COFFEE]: 0,
    setCoffeeCount: (count: number) => {
      positiveNumberFuction(count, (_count) => set({ [Product.COFFEE]: _count }))},
    [Product.WATER]: 0,
    setWaterCount: (count: number) => {
      positiveNumberFuction(count, (_count) => set({ [Product.WATER]: _count }))},
    [Product.COKE]: 0,
    setCokeCount: (count: number) => {
      positiveNumberFuction(count, (_count) => set({ [Product.COKE]: _count }))},
    purchaseProcess: PurchaseProcess.IDLE,
    setPurchaseProcess: (process: PurchaseProcess) => {
      if(get().purchaseProcess === process) {
        return;
      }
      
      switch (process) {
        case PurchaseProcess.PRODUCT_DISPENSING: {
          if(get().cash > 0) {
            set({ message: Message[process] + ' ' + get().cash.toLocaleString() + '원 ' + Message.returningChanges });
            set({ cash: 0 });
          } else {
            set({ message: Message[process] });
          }

          setTimeout(() => {
            set({ selectedProduct: undefined, purchaseProcess: PurchaseProcess.IDLE, message: Message[PurchaseProcess.IDLE] });
          }, 1000);
          break;
        }
        case PurchaseProcess.CARD_ERROR:
        case PurchaseProcess.CHECKING_CARD:
        case PurchaseProcess.IDLE:
        case PurchaseProcess.PRODUCT_SELECTED:
          set({ message: Message[process] });
          break;
        default:
          set({ message: Message[PurchaseProcess.IDLE] });
          break;
      }

      set({ purchaseProcess: process })
    },
    cash: 0,
    setCash: (cash: number) => set({ cash: cash }),
    returnCash: () => {
      set({ message: get().cash.toLocaleString() + '원 ' + Message.returningChanges })
      set({ cash: 0 })

      setTimeout(() => {
        set({ message: Message[get().purchaseProcess] })
      }, 1000);
    },
    message: Message[PurchaseProcess.IDLE],
    setMessage: (message: string) => set({ message: message }),
  }));