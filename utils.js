const colors = [
  "#a5b337",
  "#00a884",
  "#fc9775",
  "#53bdeb",
]

const getRandomColor = () => {
  const selectedColor = Math.floor(Math.random() * 3) + 1
  return colors[selectedColor]
}

module.exports = {
  getRandomColor
}