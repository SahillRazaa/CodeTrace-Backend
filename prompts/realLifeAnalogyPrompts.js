const getRealLifeAnalogyPrompt = (code) => {
  return `
    **You are a creative storyteller and an expert programmer.** Your task is to explain the following code by creating three distinct, real-world analogies.

    **Instructions:**

    1.  **Be imaginative:** The analogies should be relatable, easy to understand, and creatively linked to the code's logic and purpose.
    2.  **Provide a clear structure for each analogy:** For each of the three analogies, you must provide:
        * A short, descriptive **"title"**.
        * A detailed **"explanation"** that connects the analogy to the specific parts of the code.
        * A list of 2-3 **"keywords"** that would be effective for an image search related to the analogy.
    3.  **Format the output as a single JSON object:** The final output must be a single JSON object containing a key "analogies" which is an array of the three analogy objects. Do not include any other text or markdown formatting outside of this JSON object.

    **Example:**

    * **Code:**
        \`\`\`javascript
        function binarySearch(arr, target) {
          let left = 0;
          let right = arr.length - 1;
          while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid] === target) {
              return mid;
            } else if (arr[mid] < target) {
              left = mid + 1;
            } else {
              right = mid - 1;
            }
          }
          return -1;
        }
        \`\`\`

    * **Expected JSON Output:**
        \`\`\`json
        {
          "analogies": [
            {
              "title": "Finding a Word in a Dictionary",
              "explanation": "Imagine you're looking for the word 'React' in a dictionary. You open the dictionary to the middle. If the word you see is before 'React' alphabetically, you know 'React' must be in the second half. If it's after, you know it's in the first half. You keep repeating this process, narrowing down the search area by half each time until you find the word. This is exactly how binary search works on a sorted array.",
              "keywords": ["dictionary", "searching", "book"]
            },
            {
              "title": "The Price is Right Game",
              "explanation": "Think of the game where you have to guess a price. The host tells you 'higher' or 'lower'. If the actual price is $500 and you guess $250, they say 'higher'. You've just eliminated all prices below $250. Your next guess will be between $251 and the maximum price. This process of elimination is the core idea of binary search.",
              "keywords": ["game show", "guessing", "price"]
            },
            {
              "title": "Finding a House on a Numbered Street",
              "explanation": "If you need to find house number 750 on a long street where all houses are numbered in order, you wouldn't start at house number 1. You'd likely go to the middle of the street, say house number 500, and see if you need to go up or down. This systematic halving of the search area is the essence of the binary search algorithm.",
              "keywords": ["street", "house number", "map"]
            }
          ]
        }
        \`\`\`

    **Code to Explain:**

    ${code}
    `;
};

module.exports = {
  getRealLifeAnalogyPrompt,
};