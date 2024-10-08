export type Proto_Logs = (
    eventType:string,
    from: string,
    transaction_hash: string,
    to: string,
    amount: number,
 ) => Promise<void>;