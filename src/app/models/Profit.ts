export default interface Profit {
    quoteId: string;
    type: string;
    cashAmount: number;
    creditAmount: number;
    totalAmount: number;
    taxRate: number;
    description: string;
    createdOn?: Date;
}