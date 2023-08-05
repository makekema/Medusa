export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

  export function calculateLeft() {
    const value = `${Math.floor(Math.random() * (window.innerWidth - 300))}px`;
    console.log('VALEU', value);
    return value;
  }

  export function calculateTop() {
    return `${Math.floor(Math.random() * (window.innerHeight - 300))}px`;
  }