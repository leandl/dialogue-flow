export type ObserverListener<T> = (e: T) => void;
export type UnsubscribeFunction = () => void;

export class Observer<T> {
  private subscribers = new Set<ObserverListener<T>>();

  subscribe(listener: ObserverListener<T>): UnsubscribeFunction {
    this.subscribers.add(listener);
    return () => {
      this.subscribers.delete(listener);
    };
  }

  publish(event: T): void {
    for (const listener of this.subscribers) {
      try {
        listener(event);
      } catch (error) {
        console.error("Erro ao notificar ouvinte:", error);
      }
    }
  }
}
