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

### Video Writeup: 
![video](https://github.com/adityaamehra/24095005_CSOC_INFOSEC/blob/main/week%203/assests/web_gaunglet_1.mov)

---

## 2. Web Gauntlet 2

* **Username:** `ad'||'min`

* **Password:** `1' IS NOT '2`

* **Explanation:**

  * `admin` is created using concatenation.
  * The password section is crafted using a logic clause (`IS NOT`) to evaluate to `true`.
  * This bypasses filters and results in authentication.

* **Flag:** `picoCTF{0n3_m0r3_t1m3_e2db86ae880862ad471aa4c93343b2bf}`

### Video Writeup: 
![video](https://github.com/adityaamehra/24095005_CSOC_INFOSEC/blob/main/week%203/assests/web_gaunglet_2.mov)

---

## 3. Web Gauntlet 3

* **Username:** `ad'||'min`

* **Password:** `1' IS NOT '2`

* **Explanation:**

  * Reuse of the logical injection with safe syntax to pass verification.

* **Flag:** `picoCTF{k3ep_1t_sh0rt_eb90a623e2c581bcd3127d9d60a4dead}`

### Video Writeup: 
![video](https://github.com/adityaamehra/24095005_CSOC_INFOSEC/blob/main/week%203/assests/web_gaunglet_3.mov)

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

### Video Writeup: 
![video](https://github.com/adityaamehra/24095005_CSOC_INFOSEC/blob/main/week%203/assests/jawt_scratchpad.mov)

---

## 5. Secrets

* **Procedure:**

  * Inspected HTML using Developer Tools.
  * Initially attempted endpoint fuzzing without success.
  * Discovered hidden directories manually: `secret/hidden/superhidden/`

* **Flag:** `picoCTF{succ3ss_@h3n1c@10n_39849bcf}`

### Video Writeup: 
![video](https://github.com/adityaamehra/24095005_CSOC_INFOSEC/blob/main/week%203/assests/secrets.mov)

---

## 6. IntroToBurp

* **Procedure:**

  * Sent OTP form request to Burp Repeater.
  * Tried brute-forcing the OTP without success.
  * Ultimately removed the OTP field entirely and discovered server-side mishandling.

* **Flag:** `picoCTF{#0TP_Bypvss_SuCc3$S_9090d63c}`

### Video Writeup: 
![video](https://github.com/adityaamehra/24095005_CSOC_INFOSEC/blob/main/week%203/assests/IntroToBurp.mov)

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

### Video Writeup: 
![video](https://github.com/adityaamehra/24095005_CSOC_INFOSEC/blob/main/week%203/assests/Who_are_you%3F.mov)

---

## 9. Irish-Name-Repo 1

* **Username:** `admin'--`

* **Password:** `123`

* **Procedure:**

  * Tried inspecting the home page but found nothing.
  * Found a reference to SQL in the support page, which hinted at SQL injection.
  * Applied the injection successfully on the login page.

* **Flag:** `picoCTF{s0m3_SQL_c218b685}`

### Video Writeup: 
![video](https://github.com/adityaamehra/24095005_CSOC_INFOSEC/blob/main/week%203/assests/irish_man_repo_1.mov)

---

## 10. Irish-Name-Repo 2

* **Username:** `admin'--`

* **Password:** `123`

* **Procedure:**

  * Followed the same path as the previous challenge.
  * Filter evasion technique remained effective.

* **Flag:** `picoCTF{m0R3_SQL_plz_fa983901}`

### Video Writeup: 
![video](https://github.com/adityaamehra/24095005_CSOC_INFOSEC/blob/main/week%203/assests/irish_man_repo_2.mov)

---

## 11. Irish-Name-Repo 3

* **Password:** `' be 1=1 --`

* **Procedure:**

  * Noticed password was transformed via ROT13 cipher (a ↔ n, etc.).
  * Initially struggled with deciphering character transformation.
  * Used Burp Suite to observe debug SQL output and confirm ROT logic.
  * Crafted final injection payload using understanding of cipher.

* **Flag:** `picoCTF{3v3n_m0r3_SQL_06a9db19}`

### Video Writeup: 
![video](https://github.com/adityaamehra/24095005_CSOC_INFOSEC/blob/main/week%203/assests/irish_man_repo_3.mov)

---

## 12. JavaScript Kiddie 1

* **Key:** `5108180345363640`
* **Script Used:**

```python
LEN = 16
expected_bytes = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,
                  0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52]
image_bytes = [...]  # Truncated for brevity
image_bytes = [int(byte) for byte in image_bytes]

key = []
for key_idx in range(LEN):
    for shifter in range(10):
        offset = ((shifter * LEN) % len(image_bytes)) + key_idx
        if expected_bytes[key_idx] == image_bytes[offset]:
            key.append(shifter)
            break
print("Key:", *key, sep="")
```

* **Reasoning:**
  The challenge involved recovering a PNG file header from a scrambled image byte array. The script works by trying all possible decimal digit values (`0-9`) as a shifter applied to each column index of the byte array. The byte shift logic is inferred from JavaScript which scrambles each column of a 16-byte-wide image grid by applying an offset: `offset = (shifter × 16) % total_length + column_index`. By comparing shifted bytes with the standard 16-byte PNG header (`89 50 4E 47 0D 0A 1A 0A 00 00 00 0D 49 48 44 52`), we deduce the `shifter` values forming the key.
The key we got the script is `51081803???63640`.

  During execution, three bytes yielded ambiguous matches—i.e., multiple shifter values aligned correctly with the header. Specifically, positions with `?` had the following shifter options:

  * First `?`: `2`, `3`, `4`
  * Second `?`: `3`, `4`, `5`, `6`
  * Third `?`: `2`, `3`, `4`

  Hence, brute-forcing through all possible combinations of these positions (3×4×3 = 36) allowed reconstruction of the correct key and successful decryption of the PNG file.

* **Flag:** `picoCTF{066cad9e69c5c7e5d2784185c0feb30b}`

![photo](https://github.com/adityaamehra/24095005_CSOC_INFOSEC/blob/main/week%203/assests/java_script_qr.png)

## 13. JavaScript Kiddie 2

* **Key:** `60005030108010709050702060300090`
* **Script Used:**

```python
LEN = 16
expected_bytes = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,
                  0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52]
image_bytes = [...]  # Truncated for brevity
image_bytes = [int(byte) for byte in image_bytes]

key = []
for key_idx in range(LEN):
    for shifter in range(10):
        offset = ((shifter * LEN) % len(image_bytes)) + key_idx
        if expected_bytes[key_idx] == image_bytes[offset]:
            key.append(shifter)
            key.append(0)  # Pattern required 0-padding between actual digits
            break
print("Key:", *key, sep="")
```

* **Reasoning:**
  This problem builds on the previous logic but introduces a slight twist in key encoding. Each shifter digit is now followed by a literal `0`, forming a two-digit token (e.g., `6` becomes `60`). Hence, the full key length becomes 32 instead of 16. The byte shift logic remains unchanged, and matching with the PNG header proceeds in the same manner.

  After retrieving each shifter, a zero was appended to mimic the new key formatting. Using this technique, the key was reconstructed accurately and the image was successfully restored.

* **Flag:** `picoCTF{59d5db659865190a07120652e6c77f84}`

![photo](https://github.com/adityaamehra/24095005_CSOC_INFOSEC/blob/main/week%203/assests/java_script_2_qr.png)

---
