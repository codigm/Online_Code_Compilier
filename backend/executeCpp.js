const { exec } = require("child_process");
const { error } = require("console");
const fs = require("fs");
const path = require("path");
const { stdout, stderr } = require("process");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outputFilePath = path.join(outputPath, `${jobId}.exe`); // use a different variable name

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${outputFilePath} && cd ${outputPath} && ${jobId}.exe`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject({ stderr });
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executeCpp,
};
