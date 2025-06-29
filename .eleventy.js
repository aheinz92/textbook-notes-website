module.exports = function(eleventyConfig) {
  // === Add this line! ===
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/images");

  // Add a "where" filter for arrays. This version is more robust.
  eleventyConfig.addFilter("where", (array, key, value) => {
    if (!Array.isArray(array)) {
      return [];
    }
    return array.filter(item => {
      const itemValue = item.data?.[key];
      console.log(`Filtering: key='${key}', expectedValue='${value}' (${typeof value}), actualItemValue='${itemValue}' (${typeof itemValue})`);
      return itemValue === value;
    });
  });

  // Create a collection for each book
  eleventyConfig.addCollection("lost-and-founder", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/lost-and-founder/*.md").sort((a, b) => {
      return a.data.chapter - b.data.chapter;
    });
  });
  
  eleventyConfig.addCollection("venture-deals", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/venture-deals/*.md").sort((a, b) => {
      return a.data.chapter - b.data.chapter;
    });
  });

  // Tell Eleventy to use the `src` directory for everything
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};