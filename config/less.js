const fs = require('fs');
const path = require('path');
const lessToJS = require('less-vars-to-js');

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './antd-custom.less'), 'utf8')
);

const lessConfig = {
  lessLoaderOptions: {
    javascriptEnabled: true,
    // Mainly for modifying antd's less variables
    modifyVars: themeVariables
  }
};

module.exports = lessConfig;
