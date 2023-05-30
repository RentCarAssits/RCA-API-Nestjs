import { AggregateRoot } from "@nestjs/cqrs";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn,ManyToOne } from "typeorm";
import { SubscriptionId } from "../values/subscription-id.value";
import { Period } from "../values/period.value";
import { Plan } from "./plan.entity";
import { Account } from "./account.entity";

@Entity('Subscriptions')
export class Subscription extends AggregateRoot{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    private id: SubscriptionId;
    
    @ApiProperty()
    @ManyToOne(()=> Account, (Account)=> Account.Subscriptions,{
        onDelete:'CASCADE',
    })
    Account: Account;

    @OneToOne(()=>Plan)
    @JoinColumn()
    private readonly Plan:Plan;
    
    @ApiProperty()
    @Column()
    private readonly UnitPrice: number;

    @ApiProperty()
    @Column()
    private readonly Frequency:String;

    @ApiProperty()
    @Column(()=>Period,{prefix:false})
    private readonly Period: Period;

    public constructor(
        id:SubscriptionId,
        Account:Account,
        Plan:Plan,
        UnitPrice:number,
        Frequency: string,
        Period: Period) {
        super();
        
        this.id=id;
        this.Plan=Plan;
        this.UnitPrice=UnitPrice;
        this.Frequency=Frequency;
        this.Period=Period;
    }

    public getId(): SubscriptionId{
        return this.id;
    }
}