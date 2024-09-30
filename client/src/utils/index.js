export const processMarkdownImages = (markdown) => {
  const imgRegex = /!\[.*?\]\((.+?)\)/g;

  const modifiedMarkdown = markdown?.replace(imgRegex, (match, imgSrc) => {
    return `<img src="${imgSrc}" alt="Image" style="max-width: 100%; height: auto;" />`;
  });

  return modifiedMarkdown;
};
