export class Payment {
    private type!: string;
    private amount!: number;

    /**
     * Payment
     */
    constructor(type: string, amount: number) {
        this.type = type;
        this.amount = amount;
    }


    public getType(): string {
        return this.type;
    }

    public setType(type: string) {
        this.type = type;
    }

    public getAmount(): number {
        return this.amount
    }

    public setAmount(amount: number) {
        this.amount = amount;
    }

    

}