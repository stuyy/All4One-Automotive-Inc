export default interface Profit {
    _id: string;
    type: string;
    cashAmount: number;
    creditAmount: number;
    totalAmount: number;
    taxRate: number;
    description: string;
    createdOn?: Date;
}