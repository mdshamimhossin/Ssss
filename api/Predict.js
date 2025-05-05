// ------------------------------
// Predict.js - প্রেডিকশন ফাংশন
// ------------------------------
function predict(numbers) {
  if (!Array.isArray(numbers) || numbers.length !== 4) {
    return { error: "Invalid input" };
  }

  const colorMap = {
    0: 'Red', 1: 'Red', 2: 'Red', 3: 'Red', 4: 'Red',
    5: 'Green', 6: 'Green', 7: 'Green', 8: 'Green', 9: 'Green',
  };

  const total = numbers.reduce((a, b) => a + b, 0);
  const avg = Math.round(total / numbers.length);
  const bigSmall = avg >= 5 ? 'Big' : 'Small';
  const color = colorMap[avg % 10] || 'Violet';

  return {
    input: numbers,
    prediction: {
      bigSmall,
      color,
    }
  };
}

// ------------------------------
// Express API - index.js Part
// ------------------------------
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/predict', (req, res) => {
  const numbers = req.body.numbers;
  const result = predict(numbers);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ------------------------------
// vercel.json - Optional Config
// ------------------------------
/*
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/predict",
      "methods": ["POST"],
      "dest": "index.js"
    }
  ]
}
*/
