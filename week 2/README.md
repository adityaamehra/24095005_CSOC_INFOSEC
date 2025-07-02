# 🛡️ Capture the Flag (CTF) Write‑Up

## **Table of Contents**

1. [Challenge 1 – Introductory Flag Extraction](#challenge-1)
2. [Challenge 2 – Comprehensive Crypto Tasks](#challenge-2)

   * I. Encoding
   * II. XOR
   * III. Mathematics
   * IV. Symmetric Ciphers
   * V. RSA Fundamentals

---

<a name="challenge-1"></a>

## **Challenge 1 – Introductory Flag Extraction**

### 1.1 Sub‑challenge 1 – ASCII Aggregation

* **Methodology**: The ASCII values were converted via *Dcode* to reveal plaintext.
* **Resulting Flag**: `CSOC25{1d3n71fy1ng_d1ff3r3n7_3nc0d1ng5}`

### 1.2 Sub‑challenge 2 – Dual‑Layer Decoding

* **Workflow**:

  * **Base64**‑decode `source.enc` ➔ obtain embedded Python script.
  * **Reverse** script execution logic.
  * Perform **byte‑wise XOR** and **hex‑to‑ASCII** transformation to recover the flag.
* **Solution Script**

  ```python
  with open('output.txt') as f:
      e = f.read().strip()

  flag_bytes = bytearray()
  for i in range(0, len(e), 4):
      a = int(e[i:i+2], 16)
      b = a ^ int(e[i+2:i+4], 16)
      flag_bytes.extend((a, b))

  with open('flag.txt', 'w') as f:
      f.write(flag_bytes.decode())
  ```
* **Recovered Flag**: `CSOC25{y0u_kn0w_X0r_4nd_b45364}`

---

<a name="challenge-2"></a>

## **Challenge 2 – Comprehensive Crypto Tasks**

### I. **Encoding**

#### 1. Great Snakes 🐍

* **Purpose**: Demonstrate XOR decoding with a constant mask.
* **Code**

  ```python
  import sys

  ords = [81, 64, 75, 66, 70, 93, 73, 72, 1, 92, 109, 2, 84, 109, 66, 75, 70, 90, 2, 92, 79]

  print("Here is your flag:")
  print("".join(chr(o ^ 0x32) for o in ords))
  ```
* **Flag**: `crypto{z3n_0f_pyth0n}`

#### 2. ASCII

* **Concept**: Direct conversion from integer list to printable characters.
* **Code**

  ```python
  secret = [99, 114, 121, 112, 116, 111, 123, 65, 83, 67, 73, 73, 95, 112, 114, 49, 110, 116, 52, 98, 108, 51, 125]
  print("".join(chr(i) for i in secret))
  ```
* **Flag**: `crypto{ASCII_pr1nt4bl3}`

#### 3. Hex

* **Mechanism**: Hex‑string converted via `binascii.unhexlify`.
* **Code**

  ```python
  secret = '63727970746f7b596f755f77696c6c5f62655f776f726b696e675f776974685f6865785f737472696e67735f615f6c6f747d'
  import binascii
  print(binascii.unhexlify(secret))
  ```
* **Flag**: `crypto{You_will_be_working_with_hex_strings_a_lot}`

#### 4. Base64

* **Highlight**: Showcases Base64 encoding layered over hex.
* **Code**

  ```python
  secret = '72bca9b68fc16ac7beeb8f849dca1d8a783e8acf9679bf9269f7bf'
  import base64, binascii
  print(base64.b64encode(binascii.unhexlify(secret)))
  ```
* **Flag**: `crypto/Base+64+Encoding+is+Web+Safe/`

#### 5. Bytes & Big Integers

* **Technique**: Convert large integer to bytes using **PyCryptodome** utility.
* **Code**

  ```python
  secret = 11515195063862318899931685488813747395775516287289682636499965282714637259206269
  from Crypto.Util.number import long_to_bytes
  print(long_to_bytes(secret))
  ```
* **Flag**: `crypto{3nc0d1n6_4ll_7h3_w4y_d0wn}`

---

### II. **XOR**

#### 6. XOR Starter

* **Key Insight**: Single‑byte XOR with constant `13`.
* **Code**

  ```python
  from pwn import xor
  print(xor('label', 13))
  ```
* **Flag**: `crypto{aloha}`

#### 7. XOR Properties

* **Principle**: Exploits associativity of XOR to resolve layered keys.
* **Code**

  ```python
  KEY1 = 0xa6c8b6733c9b22de7bc0253266a3867df55acde8635e19c73313
  KEY2 = 0x37dcb292030faa90d07eec17e3b1c6d8daf94c35d4c9191a5e1e ^ KEY1
  KEY3 = 0xc1545756687e7573db23aa1c3452a098b71a7fbf0fddddde5fc1 ^ KEY2

  FLAG = 0x04ee9855208a2cd59091d04767ae47963170d1660df7f56f5faf ^ KEY1 ^ KEY3 ^ KEY2
  print(bytes.fromhex(hex(FLAG)[2:]))
  ```
* **Flag**: `crypto{x0r_i5_ass0c1at1v3}`

#### 8. Favourite Byte

* **Strategy**: Brute‑force every possible single‑byte key (0–255) and locate printable flag format.
* **Code**

  ```python
  secret = '73626960647f6b206821204f21254f7d694f7624662065622127234f726927756d'
  from pwn import xor
  for i in range(256):
      flag = xor(bytes.fromhex(secret), i)
      if b'crypto{' in flag:
          print(flag)
  ```
* **Flag**: `crypto{0x10_15_my_f4v0ur173_by7e}`

#### 9. You Either Know, XOR You Don’t

* **Observation**: Partial‑key leak inside ciphertext (`myXORkey`) enables decryption.
* **Flag**: `crypto{1f_y0u_Kn0w_En0uGH_y0u_Kn0w_1t_4ll}`

---

### III. **Mathematics**

#### 10. Greatest Common Divisor (GCD)

* **Algorithm**: Euclidean GCD.
* **Code**

  ```python
  def euclid_gcd(x, y):
      if x < y:
          return euclid_gcd(y, x)
      while y != 0:
          (x, y) = (y, x % y)
      print("\n[+] GCD: {}".format(x))
      return x

  a = 66528
  b = 52920
  euclid_gcd(a, b)
  ```
* **Flag** (numeric result): `1512`

#### 11. Extended GCD

* **Goal**: Compute Bézout coefficients `(u, v)` satisfying `up + vq = gcd(p, q)`.
* **Code**

  ```python
  def extended_gcd(p, q):
      if p == 0:
          return (q, 0, 1)
      else:
          (gcd, u, v) = extended_gcd(q % p, p)
          return (gcd, v - (q // p) * u, u)

  p = 26513
  q = 32321
  gcd, u, v = extended_gcd(p, q)
  print("[+] GCD: {}".format(gcd))
  print("[+] u,v: {},{}".format(u, v))
  print("\n[*] FLAG: crypto{{{},{}}}".format(u, v))
  ```
* **Flag**: `crypto{-8404,???}`  *(Note: only the integer `-8404` explicitly provided.)*

#### 12. Modular Arithmetic I

* **Insight**: Evaluate equivalence classes modulo `6`.
* **Flag**: `4`

#### 13. Modular Arithmetic II

* **Principle**: Application of **Fermat’s Little Theorem** where base is coprime to prime modulus `p`.
* **Flag**: `1`

#### 14. Modular Inverting

* **Computation**: Solve `3·d ≡ 1 (mod 13)` yielding `d = 9`.
* **Flag**: `9`

---

### IV. **Symmetric Ciphers – Inside AES**

| Sub‑Topic                | Core Idea                                                               | Flag                |
| ------------------------ | ----------------------------------------------------------------------- | ------------------- |
| **Keyed Permutations**   | AES S‑Boxes create a bijective substitution mapping.                    | `crypto{bijection}` |
| **Resisting Bruteforce** | Biclique cryptanalysis highlights AES key‑space resilience.             | `crypto{biclique}`  |
| **Structure of AES**     | State array manipulation shown through `bytes2matrix` / `matrix2bytes`. | `crypto{inmatrix}`  |

```python

def b2m(text):
    return [list(text[i:i+4]) for i in range(0, len(text), 4)]
def m2b(matrix):
    text = ''
    for i in range(len(matrix)):
        for j in range(4):
            text += chr(matrix[i][j])
    return text
matrix = [
    [99, 114, 121, 112],
    [116, 111, 123, 105],
    [110, 109, 97, 116],
    [114, 105, 120, 125],
]
print(m2b(matrix))
```

---

### V. **RSA Fundamentals**

#### 1. Modular Exponentiation

```python
a = pow(101, 17, 22663)
print(a)  # Output: 19801
```

* **Flag**: `19906`

#### 2. Public Keys

```python
N = 17 * 23
e = 65537
ct = pow(12, e, N)
print(ct)
```

* **Flag**: `301`

#### 3. Euler’s Totient (\$\varphi\$‑Function)

```python
p = 857504083339712752489993810777
q = 1029224947942998075080348647219
φ = (p - 1) * (q - 1)
print(φ)
```

* **Flag**: `882564595536224140639625987657529300394956519977044270821168`

#### 4. Private Keys

```python
p = 857504083339712752489993810777
q = 1029224947942998075080348647219
phi = (p - 1) * (q - 1)
e = 65537
d = pow(e, -1, phi)
print(d)
```

* **Flag**: `121832886702415731577073962957377780195510499965398469843281`

#### 5. RSA Decryption

```python
N = 882564595536224140639625987659416029426239230804614613279163
e = 65537
c = 77578995801157823671636298847186723593814843845525223303932
d = 121832886702415731577073962957377780195510499965398469843281
m = pow(c, d, N)
print(m)
```

* **Flag**: `13371337`

#### 6. RSA Signatures

```python
N = 15216583654836731327639981224133918855895948374072384050848479908982286890731769486609085918857664046075375253168955058743185664390273058074450390236774324903305663479046566232967297765731625328029814055635316002591227570271271445226094919864475407884459980489638001092788574811554149774028950310695112688723853763743238753349782508121985338746755237819373178699343135091783992299561827389745132880022259873387524273298850340648779897909381979714026837172003953221052431217940632552930880000919436507245150726543040714721553361063311954285289857582079880295199632757829525723874753306371990452491305564061051059885803
d = 11175901210643014262548222473449533091378848269490518850474399681690547281665059317155831692300453197335735728459259392366823302405685389586883670043744683993709123180805154631088513521456979317628012721881537154107239389466063136007337120599915456659758559300673444689263854921332185562706707573660658164991098457874495054854491474065039621922972671588299315846306069845169959451250821044417886630346229021305410340100401530146135418806544340908355106582089082980533651095594192031411679866134256418292249592135441145384466261279428795408721990564658703903787956958168449841491667690491585550160457893350536334242689
m = "crypto{Immut4ble_m3ssag1ng}"
from Crypto.Util.number import bytes_to_long
from hashlib import sha256
h = sha256(m.encode()).digest()
h_long = bytes_to_long(h)
s = pow(h_long, d, N)
print(s)
```

* **Signature (flag)**: `13480738404590090803339831649238454376183189744970683129909766078877706583282422686710545217275797376709672358894231550335007974983458408620258478729775647818876610072903021235573923300070103666940534047644900475773318682585772698155617451477448441198150710420818995347235921111812068656782998168064960965451719491072569057636701190429760047193261886092862024118487826452766513533860734724124228305158914225250488399673645732882077575252662461860972889771112594906884441454355959482925283992539925713424132009768721389828848907099772040836383856524605008942907083490383109757406940540866978237471686296661685839083475`

#### 7. Salty

```python
from Crypto.Util.number import long_to_bytes
n = 110581795715958566206600392161360212579669637391437097703685154237017351570464767725324182051199901920318211290404777259728923614917211291562555864753005179326101890427669819834642007924406862482343614488768256951616086287044725034412802176312273081322195866046098595306261781788276570920467840172004530873767
 e = 1
ct = 44981230718212183604274785925793145442655465025264554046028251311164494127485
m = pow(ct, e, n)
flag = long_to_bytes(m)
print(flag.decode())
```

* **Flag**: `crypto{saltstack_fell_for_this!}`