# **Cryptographic Challenge Write‑Up**
## **Challenge Compendium**

### Challenge 1

* **Tools Used:** Dcode ASCII code conversion
* **Flag:** `CSOC25{1d3n71fy1ng_d1ff3r3n7_3nc0d1ng5}`

### Challenge 2

* **Procedure:**

  * Base64-decoded `source.enc`
  * Reversed embedded Python code
  * Performed XOR and converted to ASCII

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

* **Flag:** `CSOC25{y0u_kn0w_X0r_4nd_b45364}`

---

## GENERAL CHALLENGES

### I. Encoding

#### 1. Great Snakes

```python
ords = [81, 64, 75, 66, 70, 93, 73, 72, 1, 92, 109, 2, 84, 109, 66, 75, 70, 90, 2, 92, 79]
print("".join(chr(o ^ 0x32) for o in ords))
```

* **Flag:** `crypto{z3n_0f_pyth0n}`

#### 2. ASCII

```python
secret = [99, 114, 121, 112, 116, 111, 123, 65, 83, 67, 73, 73, 95, 112, 114, 49, 110, 116, 52, 98, 108, 51, 125]
print("".join(chr(i) for i in secret))
```

* **Flag:** `crypto{ASCII_pr1nt4bl3}`

#### 3. Hex

```python
import binascii
secret = '63727970746f7b596f755f77696c6c5f62655f776f726b696e675f776974685f6865785f737472696e67735f615f6c6f747d'
print(binascii.unhexlify(secret))
```

* **Flag:** `crypto{You_will_be_working_with_hex_strings_a_lot}`

#### 4. Base64

```python
import base64, binascii
secret = '72bca9b68fc16ac7beeb8f849dca1d8a783e8acf9679bf9269f7bf'
print(base64.b64encode(binascii.unhexlify(secret)))
```

* **Flag:** `crypto/Base+64+Encoding+is+Web+Safe/`

#### 5. Bytes and Big Integers

```python
from Crypto.Util.number import long_to_bytes
secret = 11515195063862318899931685488813747395775516287289682636499965282714637259206269
print(long_to_bytes(secret))
```

* **Flag:** `crypto{3nc0d1n6_4ll_7h3_w4y_d0wn}`

### II. XOR

#### 6. XOR Starter

```python
from pwn import xor
print(xor('label',13))
```

* **Flag:** `crypto{aloha}`

#### 7. XOR Properties

```python
KEY1 = 0xa6c8b6733c9b22de7bc0253266a3867df55acde8635e19c73313
KEY2 = 0x37dcb292030faa90d07eec17e3b1c6d8daf94c35d4c9191a5e1e ^ KEY1
KEY3 = 0xc1545756687e7573db23aa1c3452a098b71a7fbf0fddddde5fc1 ^ KEY2
FLAG = 0x04ee9855208a2cd59091d04767ae47963170d1660df7f56f5faf ^ KEY1 ^ KEY3 ^ KEY2
print(bytes.fromhex(hex(FLAG)[2:]))
```

* **Flag:** `crypto{x0r_i5_ass0c1at1v3}`

#### 8. Favourite Byte

```python
from pwn import xor
secret = '73626960647f6b206821204f21254f7d694f7624662065622127234f726927756d'
for i in range(256):
    flag = xor(bytes.fromhex(secret),i)
    if b'crypto{' in flag:
        print(flag)
```

* **Flag:** `crypto{0x10_15_my_f4v0ur173_by7e}`

#### 9. You either know XOR or you don’t

* **Observation:** Used `crypto{` as partial known plaintext to derive `myXORkey`.
* **Flag:** `crypto{1f_y0u_Kn0w_En0uGH_y0u_Kn0w_1t_4ll}`

### III. Mathematics

#### 10. Greatest Common Divisor

```python
def euclid_gcd(x, y):
    if x < y:
        return euclid_gcd(y, x)
    while y != 0:
        (x, y) = (y, x % y)
    return x

a = 66528
b = 52920
euclid_gcd(a, b)
```

* **Flag:** `1512`

#### 11. Extended GCD

```python
def extended_gcd(p,q):
    if p == 0:
        return (q, 0, 1)
    else:
        (gcd, u, v) = extended_gcd(q % p, p)
        return (gcd, v - (q // p) * u, u)

p = 26513
q = 32321
gcd, u, v = extended_gcd(p, q)
print("[+] GCD: {}".format(gcd))
print("[+] u,v: {},{}".format(u,v))
print("[*] FLAG: crypto{{{},{}}}".format(u,v))
```

* **Flag:** `-8404`

#### 12. Modular Arithmetic 1

* **Explanation:** \$11 ≡ a \pmod{6} \Rightarrow a ≡ 11 \pmod{6} \Rightarrow a = 5\$ and second congruence simplifies to 4.
* **Flag:** `4`

#### 13. Modular Arithmetic 2

* **Fermat’s Little Theorem:** \$a^{p-1} ≡ 1 \pmod{p}\$ for large \$a\$ and prime \$p\$.
* **Flag:** `1`

#### 14. Modular Inverting

* **Equation:** \$3d ≡ 1 \pmod{13} \Rightarrow d = (13m+1)/3\$ for some \$m\$.
* **Solution:** Let \$m = 2 \Rightarrow d = 9\$.
* **Flag:** `9`

---

## SYMMETRIC CIPHERS

### 1. How AES Works

#### Keyed Permutations

* **Flag:** `crypto{bijection}`

#### Resisting Brute Force

* **Flag:** `crypto{biclique}`

#### Structure of AES

```python
def bytes2matrix(text):
    return [list(text[i:i+4]) for i in range(0, len(text), 4)]

def matrix2bytes(matrix):
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

print(matrix2bytes(matrix))
```

* **Flag:** `crypto{inmatrix}`