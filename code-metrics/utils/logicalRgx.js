const logicalRgx = [
  /typeof/g,
  /=[^\>]/g,
  /for\(/g,
  /if/g,
  /else/g,
  /while/g,
  /do/g,
  /switch/g,
  /case/g,
  /return/g,
  /break/g,
  /continue/g,
  /console/g,
  /\?/g,
  /try/g,
  /catch/g,
  /([a-zA-z0-9]*\.[a-zA-z]*[(])/g,
];

module.exports = { logicalRgx };
