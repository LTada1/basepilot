export async function getPortfolioValue(address: string) {
  try {

    return {
      totalValue: "Coming Soon",
      largestHolding: "Unknown",
      largestHoldingValue: "$0",
      tokenCount: 0,
      diversification: "Unknown",
    };

  } catch (error) {

    console.log(error);

    return {
      totalValue: "Unavailable",
      largestHolding: "Unavailable",
      largestHoldingValue: "Unavailable",
      tokenCount: 0,
      diversification: "Unavailable",
    };

  }
}
