export const generateId = (name: string) => {
  return `${name}_${(Math.random() * 1000).toFixed(0)}`
}
