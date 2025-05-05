/**
 * Converts a USD amount to PHP using a specified exchange rate and formats the result to 2 decimal places.
 * @param {number} usdAmount - The amount in US Dollars (decimal).
 * @returns {string|null} The amount in Philippine Pesos formatted to 2 decimal places as a string,
 * or null if the input is invalid.
 */
function convertUsdToPhp(usdAmount) {
    // IMPORTANT: This is a placeholder exchange rate.
    // In a real application, you should fetch the current rate from an API.
    const exchangeRateUsdToPhp = 58.50; // Example rate (as of early May 2025)
  
    // Validate input
    if (typeof usdAmount !== 'number' || isNaN(usdAmount) || usdAmount < 0) {
      console.error("Invalid input: Please provide a valid non-negative number for the USD amount.");
      return null; // Or throw an error, depending on desired behavior
    }
  
    // Calculate the PHP amount
    const phpAmount = usdAmount * exchangeRateUsdToPhp;
  
    // Format to 2 decimal places and return as a string
    return phpAmount.toFixed(2);
  }

  export default convertUsdToPhp;