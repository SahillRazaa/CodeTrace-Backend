const getBuggyCodePrompt = (difficulty, language, category) => {
  return `
    **You are a programming instructor creating a debugging challenge.** Your task is to generate a ${language} code snippet for a ${difficulty}-level challenge in the ${category} category.

    **Instructions:**

    1.  **Introduce multiple bugs:** The code must contain a mix of subtle logical errors and syntax errors. The number and complexity of bugs should correspond to the difficulty level.
    2.  **Ensure the code is relevant:** The code snippet should be a realistic example from the specified ${category}.
    3.  **Do not include any comments or explanations:** The user's task is to find and fix the bugs themselves.
    4.  **Format the output:** Return only the buggy code block, enclosed in markdown, like this:

        \`\`\`${language}
        // Your buggy code here...
        \`\`\`

    **Example Request:**
    * **Difficulty:** easy
    * **Language:** javascript
    * **Category:** Vanilla JS

    **Example Output:**
        \`\`\`javascript
        function calculateSum(arr) {
          let sum = 0;
          for (let i = 0; i < arr.length; i+) {
            sum = arr[i];
          }
          return sum;
        }
        \`\`\`
    `;
};

const getEvaluationPrompt = (buggyCode, userSolution) => {
  return `
    **You are an automated code grader.** Your task is to evaluate a user's attempt to fix a buggy piece of code.

    **Instructions:**

    1.  **Analyze the user's solution:** Compare the user's solution to the original buggy code and identify the changes made.
    2.  **Assess correctness and completeness:** Determine if all bugs were fixed correctly and if any new bugs were introduced.
    3.  **Provide a score:** Give a score from 0 to 100 based on the quality of the fix.
    4.  **Generate constructive feedback:** Explain what was done correctly and what could be improved.
    5.  **Provide the corrected code:** Include the fully corrected and optimal solution.
    6.  **Format the output as a single JSON object:** The final output must be a single JSON object with the keys "score", "feedback", and "correctedCode".

    **Original Buggy Code:**
    ${buggyCode}

    **User's Solution:**
    ${userSolution}
    `;
};

module.exports = {
  getBuggyCodePrompt,
  getEvaluationPrompt,
};