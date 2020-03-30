exports.config = {
  projectRoot: "./src",
  projectName: "jamgular",
  outDir: "./dist/static",
  routes: {
    "/blog/:title": {
      type: "contentFolder",
      title: {
        folder: "./blog"
      }
    }
  }
};
