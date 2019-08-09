export function randomPick(arr) {
  if (arr && arr.length) {
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
  } else {
    console.error('randomPick error')
  }
}