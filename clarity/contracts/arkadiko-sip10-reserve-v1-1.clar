(impl-trait .arkadiko-vault-trait-v1.vault-trait)
(use-trait mock-ft-trait .arkadiko-mock-ft-trait-v1.mock-ft-trait)
(use-trait vault-trait .arkadiko-vault-trait-v1.vault-trait)

;; errors
(define-constant ERR-NOT-AUTHORIZED u9401)
(define-constant ERR-TRANSFER-FAILED u92)
(define-constant ERR-DEPOSIT-FAILED u95)
(define-constant ERR-WITHDRAW-FAILED u96)
(define-constant ERR-MINT-FAILED u97)
(define-constant ERR-WRONG-TOKEN u98)
(define-constant ERR-TOO-MUCH-DEBT u99)

(define-read-only (calculate-xusd-count (token (string-ascii 12)) (ucollateral-amount uint) (collateral-type (string-ascii 12)))
  (let ((price-in-cents (contract-call? .arkadiko-oracle-v1-1 get-price token)))
    (let ((amount
      (/
        (* ucollateral-amount (get last-price-in-cents price-in-cents))
        (unwrap-panic (contract-call? .arkadiko-collateral-types-v1-1 get-collateral-to-debt-ratio collateral-type))
      )))
      (ok amount)
    )
  )
)

(define-read-only (calculate-current-collateral-to-debt-ratio (token (string-ascii 12)) (debt uint) (ucollateral uint))
  (let ((price-in-cents (contract-call? .arkadiko-oracle-v1-1 get-price token)))
    (if (> debt u0)
      (ok (/ (* ucollateral (get last-price-in-cents price-in-cents)) debt))
      (err u0)
    )
  )
)

;; (match (print (ft-transfer? token ucollateral-amount sender (as-contract tx-sender)))
(define-public (collateralize-and-mint (token <mock-ft-trait>) (token-string (string-ascii 12)) (ucollateral-amount uint) (debt uint) (sender principal))
  (let (
    (token-symbol (unwrap-panic (contract-call? token get-symbol)))
  )
    (asserts! (is-eq contract-caller .arkadiko-freddie-v1-1) (err ERR-NOT-AUTHORIZED))
    (asserts! (is-eq token-string token-symbol) (err ERR-WRONG-TOKEN))
    (asserts! (not (is-eq token-string "STX")) (err ERR-WRONG-TOKEN))

    ;; token should be a trait e.g. 'SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB.arkadiko-token
    (match (contract-call? token transfer ucollateral-amount sender (as-contract tx-sender))
      success (ok debt)
      error (err ERR-TRANSFER-FAILED)
    )
  )
)

(define-public (deposit (token <mock-ft-trait>) (token-string (string-ascii 12)) (additional-ucollateral-amount uint))
  (let (
    (token-symbol (unwrap-panic (contract-call? token get-symbol)))
  )
    (asserts! (is-eq contract-caller .arkadiko-freddie-v1-1) (err ERR-NOT-AUTHORIZED))
    (asserts! (is-eq token-string token-symbol) (err ERR-WRONG-TOKEN))
    (asserts! (not (is-eq token-string "STX")) (err ERR-WRONG-TOKEN))

    (match (contract-call? token transfer additional-ucollateral-amount tx-sender (as-contract tx-sender))
      success (ok true)
      error (err ERR-DEPOSIT-FAILED)
    )
  )
)

(define-public (withdraw (token <mock-ft-trait>) (token-string (string-ascii 12)) (vault-owner principal) (ucollateral-amount uint))
  (let (
    (token-symbol (unwrap-panic (contract-call? token get-symbol)))
  )
    (asserts! (is-eq contract-caller .arkadiko-freddie-v1-1) (err ERR-NOT-AUTHORIZED))
    (asserts! (is-eq token-string token-symbol) (err ERR-WRONG-TOKEN))
    (asserts! (not (is-eq token-symbol "STX")) (err ERR-WRONG-TOKEN))

    (match (as-contract (contract-call? token transfer ucollateral-amount (as-contract tx-sender) vault-owner))
      success (ok true)
      error (err ERR-WITHDRAW-FAILED)
    )
  )
)

(define-public (mint (token-string (string-ascii 12)) (vault-owner principal) (ucollateral-amount uint) (current-debt uint) (extra-debt uint) (collateral-type (string-ascii 12)))
  (begin
    (asserts! (is-eq contract-caller .arkadiko-freddie-v1-1) (err ERR-NOT-AUTHORIZED))
    (asserts! (not (is-eq token-string "STX")) (err ERR-WRONG-TOKEN))

    (let ((max-new-debt (- (unwrap-panic (calculate-xusd-count token-string ucollateral-amount collateral-type)) current-debt)))
      (if (>= max-new-debt extra-debt)
        (match (as-contract (contract-call? .arkadiko-dao mint-token .xusd-token extra-debt vault-owner))
          success (ok true)
          error (err ERR-MINT-FAILED)
        )
        (err ERR-TOO-MUCH-DEBT)
      )
    )
  )
)

(define-public (burn (token <mock-ft-trait>) (vault-owner principal) (collateral-to-return uint))
  (let (
    (token-symbol (unwrap-panic (contract-call? token get-symbol)))
  )
    (asserts! (is-eq contract-caller .arkadiko-freddie-v1-1) (err ERR-NOT-AUTHORIZED))
    (asserts! (not (is-eq token-symbol "STX")) (err ERR-WRONG-TOKEN))

    (match (as-contract (contract-call? token transfer collateral-to-return (as-contract tx-sender) vault-owner))
      transferred (ok true)
      error (err ERR-TRANSFER-FAILED)
    )
  )
)

(define-public (redeem-collateral (token <mock-ft-trait>) (token-string (string-ascii 12)) (ucollateral uint) (owner principal))
  (let (
    (token-symbol (unwrap-panic (contract-call? token get-symbol)))
  )
    (asserts! (is-eq contract-caller .arkadiko-freddie-v1-1) (err ERR-NOT-AUTHORIZED))
    (asserts! (is-eq token-string token-symbol) (err ERR-WRONG-TOKEN))
    (asserts! (not (is-eq token-string "STX")) (err ERR-WRONG-TOKEN))
    
    (as-contract (contract-call? token transfer ucollateral (as-contract tx-sender) owner))
  )
)

(define-public (mint-xstx (collateral uint))
  (begin
    (asserts! (is-eq contract-caller .arkadiko-freddie-v1-1) (err ERR-NOT-AUTHORIZED))
    (contract-call? .arkadiko-dao mint-token .xstx-token collateral (as-contract tx-sender))
  )
)

;; redeem stx (and burn xSTX)
(define-public (burn-xstx (ustx-amount uint) (sender principal))
  (begin
    (asserts! (is-eq contract-caller .arkadiko-freddie-v1-1) (err ERR-NOT-AUTHORIZED))
    (try! (contract-call? .arkadiko-dao burn-token .xstx-token  ustx-amount sender))
    (ok true)
  )
)

;; ---------------------------------------------------------
;; Admin Functions
;; ---------------------------------------------------------

(define-public (set-tokens-to-stack (new-tokens-to-stack uint))
  (begin
    (asserts! (is-eq contract-caller (contract-call? .arkadiko-dao get-dao-owner)) (err ERR-NOT-AUTHORIZED))

    ;; NOOP
    (ok true)
  )
)

;; this should be called when upgrading contracts
;; SIP10 reserves can contain all SIP10 collateral types
;; so this method should be ran multiple times, once for each token
(define-public (migrate-funds (new-vault <vault-trait>) (token <mock-ft-trait>))
  (begin
    (asserts! (is-eq contract-caller (contract-call? .arkadiko-dao get-dao-owner)) (err ERR-NOT-AUTHORIZED))

    (let (
      (balance (unwrap-panic (contract-call? token get-balance-of (as-contract tx-sender))))
    )
      (contract-call? token transfer balance (as-contract tx-sender) (contract-of new-vault))
    )
  )
)