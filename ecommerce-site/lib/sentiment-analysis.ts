// Simple sentiment analysis utility

// Lists of positive and negative words for basic sentiment analysis
const positiveWords = [
  "amazing",
  "awesome",
  "brilliant",
  "excellent",
  "fantastic",
  "good",
  "great",
  "happy",
  "impressive",
  "love",
  "nice",
  "outstanding",
  "perfect",
  "pleased",
  "quality",
  "recommend",
  "satisfied",
  "superb",
  "terrific",
  "wonderful",
  "worth",
  "beautiful",
  "comfortable",
  "convenient",
  "durable",
  "easy",
  "effective",
  "efficient",
  "enjoyable",
  "exceptional",
  "favorite",
  "helpful",
  "ideal",
  "incredible",
  "innovative",
  "pleasant",
  "powerful",
  "premium",
  "reliable",
  "smooth",
  "sturdy",
  "stylish",
  "superior",
  "valuable",
]

const negativeWords = [
  "awful",
  "bad",
  "broken",
  "cheap",
  "defective",
  "disappointed",
  "disappointing",
  "dislike",
  "expensive",
  "faulty",
  "flimsy",
  "frustrating",
  "hate",
  "horrible",
  "issue",
  "mediocre",
  "overpriced",
  "poor",
  "problem",
  "regret",
  "terrible",
  "uncomfortable",
  "unhappy",
  "useless",
  "waste",
  "worst",
  "annoying",
  "clunky",
  "complicated",
  "confusing",
  "difficult",
  "fragile",
  "inadequate",
  "inconvenient",
  "ineffective",
  "loud",
  "malfunctioning",
  "misleading",
  "noisy",
  "poorly",
  "slow",
  "trouble",
  "unreliable",
  "weak",
  "worthless",
]

// Common product aspects for categorization
export const productAspects = {
  quality: ["quality", "build", "material", "construction", "durability", "durable", "sturdy", "solid", "robust"],
  performance: ["performance", "speed", "fast", "slow", "responsive", "powerful", "efficient", "effective"],
  design: ["design", "look", "style", "aesthetic", "appearance", "beautiful", "elegant", "sleek", "modern", "color"],
  comfort: ["comfort", "comfortable", "ergonomic", "fit", "soft", "lightweight", "heavy", "bulky"],
  usability: ["easy", "simple", "intuitive", "user-friendly", "convenient", "practical", "functional", "useful"],
  value: ["value", "price", "expensive", "cheap", "affordable", "worth", "overpriced", "bargain", "cost"],
  reliability: ["reliable", "consistent", "dependable", "trustworthy", "stable", "issue", "problem", "bug", "glitch"],
  features: ["feature", "functionality", "capability", "option", "setting", "mode", "function"],
  support: ["support", "service", "customer service", "warranty", "help", "assistance", "response"],
}

// Calculate sentiment score for a text
export function analyzeSentiment(text: string): number {
  const words = text.toLowerCase().split(/\W+/)
  let positiveCount = 0
  let negativeCount = 0

  words.forEach((word) => {
    if (positiveWords.includes(word)) positiveCount++
    if (negativeWords.includes(word)) negativeCount++
  })

  // Calculate sentiment score between -1 and 1
  const totalWords = words.length
  if (totalWords === 0) return 0

  const positiveScore = positiveCount / totalWords
  const negativeScore = negativeCount / totalWords

  return positiveScore - negativeScore
}

// Identify aspects mentioned in the text
export function identifyAspects(text: string): Record<string, number> {
  const words = text.toLowerCase().split(/\W+/)
  const aspectMentions: Record<string, number> = {}

  Object.entries(productAspects).forEach(([aspect, keywords]) => {
    aspectMentions[aspect] = 0

    keywords.forEach((keyword) => {
      if (text.toLowerCase().includes(keyword)) {
        aspectMentions[aspect]++
      }
    })
  })

  return aspectMentions
}

// Extract most common words (excluding stop words)
export function extractCommonWords(reviews: string[]): Record<string, number> {
  const stopWords = [
    "i",
    "me",
    "my",
    "myself",
    "we",
    "our",
    "ours",
    "ourselves",
    "you",
    "your",
    "yours",
    "yourself",
    "yourselves",
    "he",
    "him",
    "his",
    "himself",
    "she",
    "her",
    "hers",
    "herself",
    "it",
    "its",
    "itself",
    "they",
    "them",
    "their",
    "theirs",
    "themselves",
    "what",
    "which",
    "who",
    "whom",
    "this",
    "that",
    "these",
    "those",
    "am",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "having",
    "do",
    "does",
    "did",
    "doing",
    "a",
    "an",
    "the",
    "and",
    "but",
    "if",
    "or",
    "because",
    "as",
    "until",
    "while",
    "of",
    "at",
    "by",
    "for",
    "with",
    "about",
    "against",
    "between",
    "into",
    "through",
    "during",
    "before",
    "after",
    "above",
    "below",
    "to",
    "from",
    "up",
    "down",
    "in",
    "out",
    "on",
    "off",
    "over",
    "under",
    "again",
    "further",
    "then",
    "once",
    "here",
    "there",
    "when",
    "where",
    "why",
    "how",
    "all",
    "any",
    "both",
    "each",
    "few",
    "more",
    "most",
    "other",
    "some",
    "such",
    "no",
    "nor",
    "not",
    "only",
    "own",
    "same",
    "so",
    "than",
    "too",
    "very",
    "s",
    "t",
    "can",
    "will",
    "just",
    "don",
    "should",
    "now",
    "would",
    "could",
    "may",
    "must",
    "one",
    "also",
  ]

  const wordCounts: Record<string, number> = {}

  reviews.forEach((review) => {
    const words = review
      .toLowerCase()
      .split(/\W+/)
      .filter((word) => word.length > 2 && !stopWords.includes(word))

    words.forEach((word) => {
      wordCounts[word] = (wordCounts[word] || 0) + 1
    })
  })

  // Sort by count and take top words
  const sortedWords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .reduce(
      (obj, [word, count]) => {
        obj[word] = count
        return obj
      },
      {} as Record<string, number>,
    )

  return sortedWords
}

// Analyze all reviews and return comprehensive data
export function analyzeReviews(reviews: { comment: string; rating: number }[]) {
  // Overall sentiment
  const sentimentScores = reviews.map((review) => analyzeSentiment(review.comment))
  const averageSentiment = sentimentScores.reduce((sum, score) => sum + score, 0) / sentimentScores.length

  // Aspect analysis
  const aspectMentions: Record<string, number> = {}
  Object.keys(productAspects).forEach((aspect) => {
    aspectMentions[aspect] = 0
  })

  reviews.forEach((review) => {
    const reviewAspects = identifyAspects(review.comment)
    Object.entries(reviewAspects).forEach(([aspect, count]) => {
      aspectMentions[aspect] += count
    })
  })

  // Common words
  const reviewTexts = reviews.map((review) => review.comment)
  const commonWords = extractCommonWords(reviewTexts)

  // Sentiment by rating
  const sentimentByRating: Record<number, number> = {}
  reviews.forEach((review) => {
    if (!sentimentByRating[review.rating]) {
      sentimentByRating[review.rating] = 0
    }
    sentimentByRating[review.rating] += analyzeSentiment(review.comment)
  })

  // Calculate average sentiment for each rating
  Object.keys(sentimentByRating).forEach((rating) => {
    const ratingNumber = Number(rating)
    const ratingCount = reviews.filter((r) => r.rating === ratingNumber).length
    sentimentByRating[ratingNumber] /= ratingCount
  })

  return {
    averageSentiment,
    aspectMentions,
    commonWords,
    sentimentByRating,
  }
}

