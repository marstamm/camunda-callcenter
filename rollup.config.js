import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/sipJS.js",
  output: {
    file: "dist/plugin.js"
  },
  plugins: [resolve(), commonjs()]
};