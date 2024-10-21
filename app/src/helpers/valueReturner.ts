export function valueReturner(className) {
  const el = document.querySelector(`.${className}`) as HTMLInputElement;
  return el ? el.value : null;
}
