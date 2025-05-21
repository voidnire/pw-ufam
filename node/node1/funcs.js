function createLink(filename) {
  return `<a href="/${filename}">${filename}</a><br>\n`;
}

function createBackLink() {
  return '<br><a href="/"> <h3>Voltar </h3></a>';
}

module.exports = {
  createLink: createLink,
  createBackLink: createBackLink,
};
