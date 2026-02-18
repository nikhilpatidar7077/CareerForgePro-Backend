const express = require("express");
const app = express();

app.use(express.json());

// Route
const analyzeJD = async(req, res) => {
  try {
    const { jdText } = req.body;

    if (!jdText) {
      return res.status(400).json({
        success: false,
        message: "Job Description text is required"
      });
    }

    // Step 1: Clean text
    const cleanedText = jdText
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, "");

    // Step 2: Convert to words
    const words = cleanedText.split(/\s+/);

    // Step 3: Remove common stop words
    const stopWords = [
      "the","is","and","or","for","with","a","an","to","of",
      "in","on","at","we","are","you","will","have","has",
      "be","as","by","from","this","that","it","your"
    ];

    const filteredWords = words.filter(
      word => word.length > 3 && !stopWords.includes(word)
    );

    // Step 4: Count frequency
    const frequency = {};

    filteredWords.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    // Step 5: Sort by frequency
    const sortedKeywords = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({
        word,
        importance: count
      }));

    res.json({
      success: true,
      totalKeywordsFound: sortedKeywords.length,
      keywords: sortedKeywords
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

module.exports = analyzeJD
