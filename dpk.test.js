const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("should return 1 when partition key is provided as 1", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: 1 });
    expect(trivialKey).toBe("1");
  });
  it("should return 1 when partition key is provided as 1 in string", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "1" });
    expect(trivialKey).toBe("1");
  });
  it("Returns 128 chracter hased code given partitionKey is empty", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "" });
    expect(trivialKey).toBe("b7478342a465088fc33d43a64cd370737e5a3bf6749ca62c1d6db341beb987326b4df3a9f54f67a2f0ee915d4216af2f382fda14dd58dc67794f745e92d7a7f6");
  });
  it("should return 128 chracter hased code when given empty event object", () => {
    const trivialKey = deterministicPartitionKey({});
    expect(trivialKey).toBe(
      "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862"
    );
  });
  it("should return 128 character hased code when given partitionKey with 258 width", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey:
        "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862as",
    });
    expect(trivialKey).toBe(
      "f4ad2456571db37bda295e27abc875b3413f1b7116b18e36efc8d47202da5a97de65136a4b8f3aa8d128f03dcb300e2faa93ec99c7c638614273bcebd2202c87"
    );
  });
  it("should return 255 character hased code when given partitionKey with 255 width", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey:
        "f4ad2456571db37bda295e27abc875b3413f1b7116b18e36efc8d47202da5a97de65136a4b8f3aa8d128f03dcb300e2faa93ec99c7c638614273bcebd2202c87f4ad2456571db37bda295e27abc875b3413f1b7116b18e36efc8d47202da5a97de65136a4b8f3aa8d128f03dcb300e2faa93ec99c7c638614273bcebd2202c8",
    });
    expect(trivialKey).toBe(
      "f4ad2456571db37bda295e27abc875b3413f1b7116b18e36efc8d47202da5a97de65136a4b8f3aa8d128f03dcb300e2faa93ec99c7c638614273bcebd2202c87f4ad2456571db37bda295e27abc875b3413f1b7116b18e36efc8d47202da5a97de65136a4b8f3aa8d128f03dcb300e2faa93ec99c7c638614273bcebd2202c8"
    );
  });
});
