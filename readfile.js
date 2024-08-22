const fs = require('fs').promises;

const parseQuestionFile = async (filePath) => {
  try {
    if (!filePath.endsWith('.txt')) {
      return 'File Type Error';
    }
    const data = await fs.readFile(filePath, 'utf8');
    const lines = data.split('\n').filter(line => line.trim() !== '');

    let questions = [];
    let currentQuestion = {};

    for (const line of lines) {
      if (!line.slice(-2).includes('$')) {
        return "File integrity error";
      }

      if (line.startsWith('$H:')) {
        if (currentQuestion.question) {
          questions.push(currentQuestion);
        }
        currentQuestion = {
          header: line.substring(3, line.length - 2).trim(),
        };
      } else if (line.startsWith('$Q:')) {
        currentQuestion.question = line.substring(3, line.length - 2).trim();
      } else if (line.startsWith('$A:')) {
        const parts = line.substring(3, line.length - 1).split('|');
        if (parts.length < 5) {
          return "File integrity error";
        }
        currentQuestion.choices = parts.slice(0, -1);
        currentQuestion.answer = parseInt(parts[parts.length - 1], 10) - 1;
      }
    }

    if (currentQuestion.question) {
      questions.push(currentQuestion);
    }

    if (questions.length === 0 || questions.length === 1 || (questions.length >= 1 && questions[0].choices.length === 0)) {
      return "File integrity error";
    }

    return questions;

  } catch (error) {
    return 'File Read Error';
  }
};

module.exports = parseQuestionFile;

