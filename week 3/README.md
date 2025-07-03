# InfoSec CTF Writeup - picoCTF Challenges

---

## 1. Web Gauntlet 1

### Round 1

* **Username:** `admin'--`
* **Password:** `123` (can be anything)
* **Explanation:**

  * The SQL injection works because `--` comments out the rest of the SQL query.
  * `'` closes the open quote in the SQL query.
  * The `admin` user exists, so this bypasses password verification.

* **Video Writeup:**[Here](https://github.com/adityaamehra/24095005_CSOC_INFOSEC/blob/e280e48eb064bd1d9e26af59bfd76a6adee9d639/week%203/web_gaunglet_1.mov)

### Round 2

* **Username:** `admin'/*`
* **Password:** `123`
* **Explanation:**

  * `/*` is an alternative method to comment out SQL code.
  * This again allows the injection to ignore the password check.

### Round 3

* **Username:** `admin'/*`
* **Password:** `123`
* **Explanation:**

  * Same logic as Round 2; filters have not yet blocked this syntax.

### Round 4

* **Username:** `ad'||'min'/*`
* **Password:** `123`
* **Explanation:**

  * The word `admin` is now filtered.
  * Bypass is achieved by splitting it using SQL string concatenation: `'ad'||'min'`
  * The entire injection is then commented using `/*`.

### Round 5

* **Username:** `ad'||'min'/*`

* **Password:** `123`

* **Explanation:**

  * The same concatenation trick works here again as filters still permit it.

* **Flag:** `picoCTF{y0u_m4d3_1t_a5f58d5564fce237fbcc978af033c11b}`

---

## 2. Web Gauntlet 2

* **Username:** `ad'||'min`

* **Password:** `1' IS NOT '2`

* **Explanation:**

  * `admin` is created using concatenation.
  * The password section is crafted using a logic clause (`IS NOT`) to evaluate to `true`.
  * This bypasses filters and results in authentication.

* **Flag:** `picoCTF{0n3_m0r3_t1m3_e2db86ae880862ad471aa4c93343b2bf}`

---

## 3. Web Gauntlet 3

* **Username:** `ad'||'min`

* **Password:** `1' IS NOT '2`

* **Explanation:**

  * Reuse of the logical injection with safe syntax to pass verification.

* **Flag:** `picoCTF{k3ep_1t_sh0rt_eb90a623e2c581bcd3127d9d60a4dead}`

---

## 4. JAWT ScratchPad

* **Procedure:**

  * Used **Burp Suite** to intercept the JWT token.
  * Decoded using [SuperTokens JWT Decoder](https://supertokens.com/jwt-encoder-decoder).
  * Initially attempted manual decoding but could not proceed further due to the encoded signature.
  * Recovered the secret key using **Hashcat**:

    * Hashing type: SHA256 (mode 16500)
    * Command: `hashcat -a 0 -m 16500 a.txt rockyou.txt`
    * Found key: `ilovepico`
  * Generated new JWT with admin as the username.
  * Final token used: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWRtaW4ifQ.gtqDl4jVDvNbEe_JYEZTN19Vx6X9NNZtRVbKPBkhO-s`

* **Flag:** `picoCTF{jawt_was_just_what_you_thought_1ca14548}`

---

## 5. Secrets

* **Procedure:**

  * Inspected HTML using Developer Tools.
  * Initially attempted endpoint fuzzing without success.
  * Discovered hidden directories manually: `secret/hidden/superhidden/`

* **Flag:** `picoCTF{succ3ss_@h3n1c@10n_39849bcf}`

---

## 6. IntroToBurp

* **Procedure:**

  * Sent OTP form request to Burp Repeater.
  * Tried brute-forcing the OTP without success.
  * Ultimately removed the OTP field entirely and discovered server-side mishandling.

* **Flag:** `picoCTF{#0TP_Bypvss_SuCc3$S_9090d63c}`

---

## 7. Client-side-again

* **Procedure:**

  * Found obfuscated JS in the webpage.
  * Attempted deobfuscation using online tools but was unsuccessful.
  * Switched to manual analysis in VS Code.
  * Discovered a left-rotate of the array by 435 positions.
  * Replaced variable names based on the rotated list and identified substring logic used to construct the flag.

* **Flag:** `picoCTF{not_this_again_ef49bf}`

---

## 8. Who Are You?

* **Final Header Used:**

```http
GET / HTTP/1.1
Host: mercury.picoctf.net:52362
Referer: mercury.picoctf.net:52362
Date: Sun, 06 Nov 2018 08:49:37 GMT
DNT: 1
Cache-Control: max-age=0
Accept-Language: sv-SE,sv;q=0.9
Upgrade-Insecure-Requests: 1
User-Agent: PicoBrowser
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br
X-Forwarded-For: 88.80.6.19
Connection: keep-alive
```

* **Procedure:**

  * Attempted modifying individual headers in isolation but failed.
  * Ultimately replicated full PicoBrowser request headers for successful authentication.

* **Flag:** `picoCTF{http_h34d3rs_v3ry_c0Ol_much_w0w_0c0db339}`

---

## 9. Irish-Name-Repo 1

* **Username:** `admin'--`

* **Password:** `123`

* **Procedure:**

  * Tried inspecting the home page but found nothing.
  * Found a reference to SQL in the support page, which hinted at SQL injection.
  * Applied the injection successfully on the login page.

* **Flag:** `picoCTF{s0m3_SQL_c218b685}`

---

## 10. Irish-Name-Repo 2

* **Username:** `admin'--`

* **Password:** `123`

* **Procedure:**

  * Followed the same path as the previous challenge.
  * Filter evasion technique remained effective.

* **Flag:** `picoCTF{m0R3_SQL_plz_fa983901}`

---

## 11. Irish-Name-Repo 3

* **Password:** `' be 1=1 --`

* **Procedure:**

  * Noticed password was transformed via ROT13 cipher (a ↔ n, etc.).
  * Initially struggled with deciphering character transformation.
  * Used Burp Suite to observe debug SQL output and confirm ROT logic.
  * Crafted final injection payload using understanding of cipher.

* **Flag:** `picoCTF{3v3n_m0r3_SQL_06a9db19}`