import { useMemo } from 'react'

interface Listener<T> {
  func: (data: T) => void
}

export class Observer<T> {
  private listeners: Listener<T>[]

  constructor() {
    this.listeners = []
  }

  subscribe = (listener: Listener<T>) => {
    this.listeners.push(listener)
  }

  notify = (data: T) => {
    // TODO: Add comparison old and new version to notify only changed data
    this.listeners.forEach((listener) => listener.func(data))
  }
}

type UseObserverReturn<T> = [T, Observer<T>]

export const useObserver = <T extends Record<string, unknown>>(
  obj: T
): UseObserverReturn<T> => {
  const observer = useMemo(() => new Observer<T>(), [])
  const proxy = useMemo(
    () =>
      new Proxy(obj, {
        set(target, p, newValue) {
          target[p as keyof T] = newValue
          observer.notify(target)

          return true
        },
      }),
    [obj, observer]
  )

  return [proxy, observer]
}
