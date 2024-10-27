export function valueReturner(className: string) {
  const el = document.querySelector(`.${className}`) as HTMLInputElement;
  return el ? el.value : null;
}
