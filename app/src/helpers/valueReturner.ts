export function valueReturner(className) {
  const el = document.querySelector(`.${className}`);
  return el ? el.value : null;
}
