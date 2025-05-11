/**
 * @param {number} usdAmount 
 * @returns {string|null} 
 * 
 */
function convertUsdToPhp(usdAmount) {
  const exchangeRateUsdToPhp = 58.50; 

  if (typeof usdAmount !== 'number' || isNaN(usdAmount) || usdAmount < 0) {
    console.error("Invalid input: Please provide a valid non-negative number for the USD amount.");
    return null;
  }

  const phpAmount = usdAmount * exchangeRateUsdToPhp;

  return phpAmount.toFixed(2);
}

export default convertUsdToPhp;