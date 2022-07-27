class Trigger {
    
    constructor(
        maker,
        contractToCall,
        functionToCall,
        interval,
        inWork,
        lastTick
        
    ) {
        this.maker = maker;
        this.contractToCall = contractToCall;
        this.functionToCall = functionToCall;
        this.interval = interval;
        this.inWork = inWork;
        this.lastTick = lastTick;
    }
}

module.exports = Trigger;