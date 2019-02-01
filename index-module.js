function Observable(obj) {
    let handlerStack = {}

    const pushToStack = (key, handler)=> {
        if(!handlerStack[key]){
            handlerStack[key] = [];
            handlerStack[key].push(handler);
        }else {
            handlerStack[key].push(handler)
        }
    }

    const react = (key, newVal) =>{        
        handlerStack[key].forEach((handler) => handler(newVal))
    }

    const observe = (key, handler)=>{
        if(handlerStack[key]){
            return pushToStack(key, handler);
        }

        Object.defineProperty(obj, key, {
            get() {
                return val
            },
            set(newVal) {
                react(key, newVal)
            }
        })
        pushToStack(key, handler);
    }

    return {
        obj,
        observe
    }

}
