import vocabulary, { getTotalDays, getTotalWords, vocabularyDays } from "../src/data/vocabulary/index.js";

const requiredFields = [
  "id",
  "word",
  "pronunciation_vi",
  "meaning_vi",
  "part_of_speech",
  "collocation",
  "example_en",
  "example_vi",
  "level",
  "topic",
  "day_number",
  "quiz",
];

const allowedLevels = new Set(["A1", "A2", "B1", "B2"]);
const errors = [];
const ids = new Set();
const wordCounts = new Map();

if (getTotalWords() !== 3000) {
  errors.push(`Expected 3000 words, received ${getTotalWords()}.`);
}

if (getTotalDays() !== 300) {
  errors.push(`Expected 300 days, received ${getTotalDays()}.`);
}

vocabularyDays.forEach((dayItems, index) => {
  if (dayItems.length !== 10) {
    errors.push(`Day ${index + 1} has ${dayItems.length} words instead of 10.`);
  }
});

vocabulary.forEach((item, index) => {
  requiredFields.forEach((field) => {
    if (!(field in item)) {
      errors.push(`Item at index ${index} is missing field "${field}".`);
    }
  });

  if (ids.has(item.id)) {
    errors.push(`Duplicate id: ${item.id}.`);
  }
  ids.add(item.id);

  if (item.id !== index + 1) {
    errors.push(`Expected id ${index + 1}, received ${item.id}.`);
  }

  if (!allowedLevels.has(item.level)) {
    errors.push(`Invalid level for id ${item.id}: ${item.level}.`);
  }

  const expectedDay = Math.ceil(item.id / 10);
  if (item.day_number !== expectedDay) {
    errors.push(`Item ${item.id} should be day ${expectedDay}, received ${item.day_number}.`);
  }

  const normalizedWord = item.word.toLowerCase();
  wordCounts.set(normalizedWord, (wordCounts.get(normalizedWord) || 0) + 1);

  if (!item.quiz || !Array.isArray(item.quiz.options)) {
    errors.push(`Item ${item.id} has invalid quiz options.`);
  } else {
    if (item.quiz.options.length !== 4) {
      errors.push(`Item ${item.id} quiz has ${item.quiz.options.length} options instead of 4.`);
    }
    if (!item.quiz.options.includes(item.quiz.correct_answer)) {
      errors.push(`Item ${item.id} correct answer is not included in options.`);
    }
  }
});

const repeatedWords = [...wordCounts.entries()].filter(([, count]) => count > 1);
if (repeatedWords.length > 0) {
  errors.push(`Found repeated words: ${repeatedWords.slice(0, 10).map(([word, count]) => `${word} (${count})`).join(", ")}.`);
}

if (errors.length) {
  console.error("Vocabulary validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Vocabulary validation passed.");
console.log(`Total words: ${getTotalWords()}`);
console.log(`Total days: ${getTotalDays()}`);
console.log("Each day has exactly 10 words.");
