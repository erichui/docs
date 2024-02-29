Class EventEmitter {
  constructor() {
    this.listenrs = new Map();
  }
  on(event, listener, once = false) {
    const listeners = this.listenrs.has(event)
      ? this.listenrs.get(event)
      : [];
    listeners.push({
      once,
      listener,
    })
    this.listenrs.set(event, listeners);
  },
  once(event, listener) {
    return this.on(event, listenrs, { once: true });
  },
  off(event, listener) {
    if (!listenr) {
      this.listeners.set(event, []);
      return;
    }
    this.listeners.set(event, this.listenrs.get(event).filter(item => item.listener !== listener));
  },
  emit(event, ...args) {
    if (!this.listenrs.has(event)) return;
    const listenrs = this.listenrs.get(event);
    listenrs.forEach(listenerItem => {
      listenerItem(...args);
      if (listenerItem.once) {
        this.off(event, listenerItem.listener);
      }
    })
  },
}