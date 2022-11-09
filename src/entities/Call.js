class Call {
    
    constructor(
        time,
        triggerId,
        txHash,
        callId,
        fees,
        gasUsed,
        status     
    ) {
       
        this.time = time;
        this.triggerId = triggerId;
        this.txHash = txHash;
        this.callId = callId;
        this.fees= fees;
        this.gasUsed = gasUsed;
        this.status = status;
    }
}

module.exports = Call;