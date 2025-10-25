export default function generateTodos(n = 5000) {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    name: `Todo ${i}`,
    done: Math.random() > 0.5,
  }))
}
