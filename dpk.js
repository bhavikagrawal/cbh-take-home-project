const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  if (!event) return TRIVIAL_PARTITION_KEY;
  if (!event.partitionKey) return getHash(JSON.stringify(event));

  return getPKHashByPartitionKey(event.partitionKey);
};

/**
 * get hash for provided partion key
 * @param {string|any} partitionKey partition key
 * @returns hash value
 */
function getPKHashByPartitionKey(partitionKey) {
  let candidate =
    typeof partitionKey !== "string"
      ? JSON.stringify(partitionKey)
      : partitionKey;

  const MAX_PARTITION_KEY_LENGTH = 256;
  return candidate.length > MAX_PARTITION_KEY_LENGTH
    ? getHash(candidate)
    : candidate;
}

/**
 *
 * @param {string} key key to be used for hash
 * @param {string} hash hash algorithm
 * @param {string} digest type of digest
 * @returns hash value
 */
function getHash(key, hash = "sha3-512", digest = "hex") {
  return crypto.createHash(hash).update(key).digest(digest);
}
