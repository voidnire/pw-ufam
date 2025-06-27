import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: { min: 5, max: 10 },
  wordsPerSentence: { min: 5, max: 15 },
});

export const generateLorem = (numParagrafos: number): string => {
  let loremText = '';

  for (let i = 0; i < numParagrafos; i++) {
    const paragraph = lorem.generateParagraphs(1); // Gerar 1 parágrafo de Lorem Ipsum
    loremText += `<p>${paragraph}</p>\n`; // Envolver cada parágrafo em tags <p>
  }

  return loremText;
};
