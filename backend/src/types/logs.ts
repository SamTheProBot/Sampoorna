export type Proto_Logs = (
    eventType:string,
    from: string,
    fromName: string,
    transaction_hash: string,
    to: string,
    toName: string,
    amount: number,
 ) => Promise<void>;