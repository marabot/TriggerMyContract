class Trigger {
    
    constructor(
        docId,
        label,
        maker,
        chain, 
        contractToCall,
        functionToCall,
        interval,
        inWork,
        lastTick
        
    ) {
        this.id = docId;
        this.label = label;
        this.maker = maker;
        this.chain = chain;
        this.contractToCall = contractToCall;
        this.functionToCall = functionToCall;
        this.interval = interval;
        this.inWork = inWork;
        this.lastTick = lastTick;
    }
}

module.exports = Trigger;