// export  function checkheading(str){
//     return /^(\*)(\*)|(.*)\*$/.test(str);
// }

// export function replaceheading(str){
//     return str.replace(/^(\*)(\*)|(\*)$/g,'');
// }

export function checkheading(str) {
  return /^\*{1,2}.+\*{1,2}$/.test(str.trim());
}

export function replaceheading(str) {
  return str.trim().replace(/^\*{1,2}|\*{1,2}$/g, '');
}
