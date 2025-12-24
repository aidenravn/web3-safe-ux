// src/identityObject.js
// Identity Object class for Web3 Safe UX

class IdentityObject {
  /**
   * @param {string} address - Blockchain address (hex string)
   * @param {string} name - Human-readable name
   * @param {string} avatar - Avatar image path or URL
   * @param {boolean} verified - Is the identity verified?
   * @param {number} trustScore - Risk/trust score (0-100)
   * @param {Array} lastTransactions - List of recent transactions
   */
  constructor(address, name, avatar, verified, trustScore, lastTransactions = []) {
    this.address = address;
    this.name = name;
    this.avatar = avatar;
    this.verified = verified;
    this.trustScore = trustScore;
    this.lastTransactions = lastTransactions;
  }

  // Check if given address matches a verified identity
  isTrustedAddress(address) {
    return this.address.toLowerCase() === address.toLowerCase() && this.verified;
  }

  // Display a human-readable summary of the identity
  summary() {
    return `${this.name} (${this.verified ? 'Verified' : 'Unverified'}) - Trust Score: ${this.trustScore}%`;
  }

  // Add a transaction to the recent history
  addTransaction(amount, currency, verified = false) {
    this.lastTransactions.push({ amount, currency, verified });
  }

  // Display transaction history
  transactionHistory() {
    return this.lastTransactions.map(
      (tx, index) =>
        `#${index + 1} Sent ${tx.amount} ${tx.currency} (${tx.verified ? 'Verified' : 'Unverified'})`
    ).join('\n');
  }
}

// Example usage
const alice = new IdentityObject(
  '0xA1b2C3d4E5f6...',
  'Alice Johnson',
  'alice-avatar.png',
  true,
  98,
  [{ amount: 1000000, currency: 'USDT', verified: true }]
);

console.log(alice.summary());
console.log(alice.isTrustedAddress('0xA1b2C3d4E5f6...')); // true
console.log(alice.isTrustedAddress('0xB2c3D4e5F6g7...')); // false
console.log(alice.transactionHistory());

// Export for Node.js / other modules
module.exports = IdentityObject;
