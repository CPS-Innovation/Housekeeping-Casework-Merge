#!/usr/bin/env node

const fs = require("fs").promises;

const getFilesSorted = async (dir) => (await fs.readdir(dir)).sort();

const replaceInFile = async (filePath, fromText, toText) => {
  const content = await fs.readFile(filePath, "utf8");
  await fs.writeFile(filePath, content.replace(fromText, toText), "utf8");
};

(async () => {
  const cssBuildDir = "./build/static/css/";
  const cssDeployDir = "../app/assets/css/";
  const jsBuildDir = "./build/static/js/";
  const jsDeployDir = "../app/assets/javascripts/";

  const [cssFileName, cssMapFileName] = await getFilesSorted(cssBuildDir);

  await replaceInFile(cssBuildDir + cssFileName, cssMapFileName, "pdf.css.map");
  await replaceInFile(cssBuildDir + cssMapFileName, cssFileName, "pdf.css");
  await fs.copyFile(cssBuildDir + cssFileName, cssDeployDir + "pdf.css");
  await fs.copyFile(cssBuildDir + cssMapFileName, cssDeployDir + "pdf.css.map");
  await fs.copyFile(cssBuildDir + cssFileName, "../public/css/pdf.css");
  await fs.copyFile(cssBuildDir + cssMapFileName, "../public/css/pdf.css.map");

  const [jsFileName, , jsFileMapName] = await getFilesSorted(jsBuildDir);

  await replaceInFile(jsBuildDir + jsFileName, jsFileMapName, "pdf.js.map");
  await replaceInFile(jsBuildDir + jsFileMapName, jsFileName, "pdf.js");
  await fs.copyFile(jsBuildDir + jsFileName, jsDeployDir + "pdf.js");
  await fs.copyFile(jsBuildDir + jsFileMapName, jsDeployDir + "pdf.js.map");
  await fs.copyFile(jsBuildDir + jsFileName, "../public/javascripts/pdf.js");
  await fs.copyFile(jsBuildDir + jsFileMapName, "../public/javascripts/pdf.js.map");
})();
