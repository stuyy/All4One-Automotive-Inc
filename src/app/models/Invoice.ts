export default interface Invoice {
    invoiceId: string;
    companyName: string;
    checkId: string;
    make: string;
    model: string;
    year: number;
    amount: number;
    description: string;
}