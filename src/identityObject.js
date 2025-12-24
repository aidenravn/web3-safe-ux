const crypto = require('crypto');

class IdentityObject {
  constructor(address, name, avatar, verified, trustScore, lastTransactions = []) {
    this.addressHash = crypto.createHash('sha256').update(address).digest('hex'); // hashed address
    this.name = name;
    this.avatar = avatar;
    this.verified = verified;
    this.trustScore = trustScore;
    this.lastTransactions = lastTransactions;
    this.badges = verified ? ['Verified'] : [];
  }

  isTrustedAddress(address) {
    const hash = crypto.createHash('sha256').update(address).digest('hex');
    return this.addressHash === hash && this.verified;
  }

  summary() {
    return `${this.name} (${this.badges.join(', ') || 'Unverified'}) - Trust Score: ${this.trustScore}%`;
  }

  addTransaction(amount, currency, verified = false) {
    this.lastTransactions.push({ amount, currency, verified });
  }

  transactionHistory() {
    return this.lastTransactions.map(
      (tx, i) => `#${i + 1} Sent ${tx.amount} ${tx.currency} (${tx.verified ? 'Verified' : 'Unverified'})`
    ).join('\n');
  }

  addBadge(badge) {
    if (!this.badges.includes(badge)) this.badges.push(badge);
  }
}

// Example
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
console.log(alice.transactionHistory());

module.exports = IdentityObject;
