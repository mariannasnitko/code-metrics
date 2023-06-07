const sampleCode = "./test";

const path = require("path");
const fs = require("fs");
const { logicalRgx } = require("./utils/logicalRgx");

let directories = [{ path: sampleCode }];

// Read all files in the specified directories
const readAllFiles = () => {
  let allFiles = [];
  const regex = /\.js$/;

  while (directories.length) {
    const dirArr = [...directories];
    directories = [];

    dirArr.map((item) => {
      fs.readdirSync(item.path).forEach((file) => {
        
        if (fs.lstatSync(path.resolve(item.path, file)).isDirectory()) {
          directories.push({ path: path.resolve(item.path, file) });
        }
        else if (file.match(regex)) {
          allFiles.push({ path: path.resolve(item.path, file) });
        }
      });
    });
  }
  return allFiles;
};

// Get the text content of all files
const getAllText = (files) => {
  let allText = [];
  files.map((item) => {
    allText = allText.concat(fs.readFileSync(item.path, "utf8").split("\n"));
  });
  return allText;
};

// Сheck lines for matches with provided regular expressions
const checkLinesByRegex = (str, regexSet) => {
  return regexSet.reduce((count, regexStr) => {
    const regex = new RegExp(regexStr, "g");
    const matches = str.match(regex);
    return count + (matches ? matches.length : 0);
  }, 0);
};

const getMetrics = (text) => {
  let metrics = {
    linesOfCode: 0,
    emptyLines: 0,
    physicalLines: 0,
    logicalLines: 0,
    comments: {
      inlineComments: 0,
      blockComments: 0,
    },
    commentLevel: 0,
  };

  metrics.linesOfCode = text.length;
  let commentFlag = false;

  // Remove all BLOCK comments and count them
  let strWithoutBlockComments = text
    .join("\n")
    .replace(/(\/\*[^*]*\*\/)/g, function (x) {
      metrics.comments.blockComments += 1;
      return ".";
    });

  // Remove all INLINE comments and count them
  let strWithoutLineComments = strWithoutBlockComments.replace(
    /(\/\/[^* \n]*)/g,
    function (x) {
      metrics.comments.inlineComments += 1;
      return ".";
    }
  );

  text = strWithoutLineComments.split("\n");

  for (let i = 0; i < text.length; i++) {
    if (!text[i]) {
      metrics.emptyLines++;
    } else {
      metrics.logicalLines += checkLinesByRegex(text[i], logicalRgx);
    }
  }

  // Calculate physical lines (considering empty lines if they don't exceed 25% of LOC)
  metrics.physicalLines =
    metrics.emptyLines / metrics.linesOfCode <= 0.25
      ? metrics.linesOfCode
      : metrics.linesOfCode - metrics.emptyLines;

  // Calculate the comment level (percentage ratio of comments to LOC)
  metrics.commentLevel = (
    (metrics.comments.blockComments + metrics.comments.inlineComments) /
    metrics.linesOfCode
  ).toFixed(3);

  return metrics;
};

let text = getAllText(readAllFiles());
let metrics = getMetrics(text);

console.log("Total lines of code: ", text.length);
console.log("Metrics: ", metrics);