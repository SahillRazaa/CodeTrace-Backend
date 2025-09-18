const getOptimizationPrompt = (code, language) => {
  return `
    **You are an expert code optimizer.** Your task is to analyze the following ${language} code and provide an optimized and refactored version.

    **Instructions:**

    1.  **Think step-by-step:** First, analyze the code for any potential performance bottlenecks, inefficient algorithms, or redundant operations. Then, consider how you can improve the code's readability and maintainability. Finally, generate the optimized code based on your analysis.
    2.  **Ensure correctness:** The optimized code must produce the exact same output as the original code. Do not introduce any breaking changes.
    3.  **Add detailed comments:** Explain the changes you've made and why they improve the code.
    4.  **Do not use any external libraries:** The optimized code should not introduce any new dependencies.
    5.  **Handle edge cases:** If the code is already optimized, simply return the original code with a comment explaining that no optimizations were necessary. If the code contains syntax errors, return an error message.
    6.  **Format the output:** Return only the optimized code block, enclosed in markdown, like this:

        \`\`\`${language}
        // Your optimized code here...
        \`\`\`

    **Example of a good optimization:**

    * **Original Code:**
        \`\`\`javascript
        const numbers = [1, 2, 3, 4, 5];
        let sum = 0;
        for (let i = 0; i < numbers.length; i++) {
          sum += numbers[i];
        }
        \`\`\`

    * **Optimized Code:**
        \`\`\`javascript
        // Use the reduce method for a more concise and functional approach.
        const numbers = [1, 2, 3, 4, 5];
        const sum = numbers.reduce((acc, num) => acc + num, 0);
        \`\`\`

    **Code to Optimize:**

    ${code}
    `;
};

module.exports = {
  getOptimizationPrompt,
};