// Force server restart to clear cache
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const md = require("markdown-it")();

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/styles.css": "styles.css" });
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/main.js": "main.js" });

  // Add a "where" filter for arrays. This version is more robust.
  eleventyConfig.addFilter("where", (array, key, value) => {
    if (!Array.isArray(array)) {
      return [];
    }
    return array.filter(item => {
      const itemValue = item.data?.[key];
      console.log(`Filtering: key='${key}', expectedValue='${value}' (${typeof value}), actualItemValue='${itemValue}' (${typeof itemValue})`);
      return itemValue == value;
    });
  });

  eleventyConfig.addNunjucksGlobal("getChapters", function(bookSlug) {
    const dir = path.join("src", bookSlug);
    const files = fs.readdirSync(dir);
    const chapters = files
      .filter(file => file.endsWith(".md"))
      .map(file => {
        const filePath = path.join(dir, file);
        const content = fs.readFileSync(filePath, "utf8");
        const { data, content: templateContent } = matter(content);
        const html = md.render(templateContent);
        return { data, templateContent: html };
      });
    return chapters.sort((a, b) => a.data.chapter - b.data.chapter);
  });

  // Tell Eleventy to use the `src` directory for everything
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    pathPrefix: "/textbook-notes-website/"
  };
};