const getDryRunPrompt = (code) => {
  return `
    **You are a code execution visualizer.** Your task is to perform a dry run of the following code and explain the execution flow step-by-step.

    **Instructions:**

    1.  **Assume a sample input:** If the code requires input, assume a simple, valid sample input to demonstrate the execution. State the assumed input clearly at the beginning.
    2.  **Track variable states:** In each step, describe the action being performed and the state of all relevant variables after that action.
    3.  **Be concise and clear:** Each step should be a short, easy-to-understand description of a single operation.
    4.  **Number the steps:** Start with "Step 1" and increment for each subsequent action.
    5.  **Focus on the logic:** Explain the flow of control, including loops, conditional statements, and function calls.
    6.  **Final Output:** Conclude with the final output or return value of the code.

    **Example:**

    * **Code:**
        \`\`\`javascript
        function factorial(n) {
          let result = 1;
          for (let i = 2; i <= n; i++) {
            result *= i;
          }
          return result;
        }
        factorial(4);
        \`\`\`

    * **Expected Output:**
        
        Assuming an input of \`n = 4\`.

        **Step 1:** The \`factorial\` function is called with \`n = 4\`. The variable \`result\` is initialized to \`1\`.

        **Step 2:** The \`for\` loop starts with \`i = 2\`. The condition \`i <= n\` (2 <= 4) is true.

        **Step 3:** Inside the loop, \`result\` is updated. \`result\` becomes \`1 * 2 = 2\`.

        **Step 4:** The loop continues. \`i\` is incremented to \`3\`. The condition \`i <= n\` (3 <= 4) is true.

        **Step 5:** Inside the loop, \`result\` is updated. \`result\` becomes \`2 * 3 = 6\`.

        **Step 6:** The loop continues. \`i\` is incremented to \`4\`. The condition \`i <= n\` (4 <= 4) is true.

        **Step 7:** Inside the loop, \`result\` is updated. \`result\` becomes \`6 * 4 = 24\`.

        **Step 8:** The loop continues. \`i\` is incremented to \`5\`. The condition \`i <= n\` (5 <= 4) is false. The loop terminates.

        **Step 9:** The function returns the final value of \`result\`.

        **Final Output:** 24

    **Code to Dry Run:**

    ${code}
    `;
};

module.exports = {
  getDryRunPrompt,
};