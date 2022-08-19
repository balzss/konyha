const fetch = require("node-fetch");

const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");

const configOptions = {
  baseUrl: '/demo',
  title: 'Konyha Demo',
  recipes: [
    {
      Title: 'Test 3',
      Slug: 'test-1',
      Description: 'ddd',
      Ingredients: [
        'ez',
        'az'
      ],
      Instructions: [
        'egy',
        'ketto'
      ],
      Tags: ['tag1', 'tag6', 'ttt'],
    },
    {
      Title: 'Test 4',
      Slug: 'test-2',
      Tags: ['tag1', 'tag3'],
    }
  ],
};

function getTags(recipes) {
  return [...new Set(recipes.reduce((acc, r) => [...r.Tags, ...acc], []))];
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/static');

  const Recipes = configOptions.recipes.map(r => ({
    Title: r.Title,
    Slug: r.Slug,
    Description: r.Description,
    Ingredients: r.Ingredients,
    Instructions: r.Instructions,
    Tags: r.Tags,
  }));

  const Tags = getTags(Recipes);

  eleventyConfig.addGlobalData('DemoData', {
    Site: {
      BaseUrl: configOptions.baseUrl,
      Title: configOptions.title,
    },
    Recipes,
    Tags,
  });

  // Add plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.addFilter("filterattr", (inputArray, filterKey, filterValue) => {
    return inputArray.filter((item) => item.data[filterKey] === filterValue);
  });

  eleventyConfig.addFilter("includeTag", (inputArray, tag) => {
    return inputArray.filter((item) => item.Tags.includes(tag));
  });

  function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
  }

  // Create an array of all tags
  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });

    return filterTagList([...tagSet]);
  });

  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "direct-link",
      symbol: "#"
    }),
    level: [1,2,3,4],
    slugify: eleventyConfig.getFilter("slugify")
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    templateFormats: [
      "njk",
    ],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don't worry about leading and trailing slashes, we normalize these.

    // If you don't have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: "/src",
    // -----------------------------------------------------------------

    // These are all optional (defaults are shown):
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "public/demo"
    }
  };
};
