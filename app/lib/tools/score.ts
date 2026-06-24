export function getWalletScore(
  balance: number,
  tokens: string
) {
  let score = 100;

  const factors = [];

  if (balance < 0.001) {
    score -= 20;

    factors.push({
      factor: "Low ETH Balance",
      impact: -20,
    });
  }

  if (tokens.includes("UNKNOWN")) {
    score -= 20;

    factors.push({
      factor: "Unverified Assets",
      impact: -20,
    });
  }

  return {
    score,
    risk:
      score > 70
        ? "LOW"
        : score > 40
        ? "MEDIUM"
        : "HIGH",
    factors,
  };
}
