# 🔑 CSOC INFOSEC Week 0 Writeup

---

## Level 0

**Command:**

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

**Explanation:**

* This connects to the Bandit game server over SSH on a non-standard port `2220` using the credentials for level 0.

---

## Level 0 ➔ 1

**Steps:**

```bash
ls
cat readme
```

**Explanation:**

* `ls`: Lists files in the directory. Reveals `readme`.
* `cat readme`: Displays the content of the `readme` file, which contains the password.

**Password:** `ZjLjTmM6FvvyRnrb2rfNWOZOTa6ip5If`

---

## Level 1 ➔ 2

**Steps:**

```bash
ls -la
cat ./-   # or: cat < -
```

**Explanation:**

* `ls -la`: Shows hidden files and files with strange names.
* `cat ./-` or `cat < -`: `-` is interpreted as stdin; hence we escape it.

**Password:** `263JGJPfgU6LtdEvgfWU1XP5yac29mFx`

---

## Level 2 ➔ 3

**Steps:**

```bash
ls
cat spaces\ in\ this\ filename
```

**Explanation:**

* Filename has spaces. Escape them using `\` to read it with `cat`.

**Password:** `MNk8KNH3Usiio41PRUEoDFPqfxLPlSmx`

---

## Level 3 ➔ 4

**Steps:**

```bash
ls
cd inhere
ls -la
cat .hidden-file-name
```

**Explanation:**

* The flag is inside the `inhere` directory.
* `ls -la` shows hidden files like `...Hiding-From-You`.
* Use `cat` to reveal contents.

**Password:** `2WmrDFRmJIq3IPxneAaMGhap0pFhF3NJ`

---

## Level 4 ➔ 5

**Steps:**

```bash
cd inhere
ls -la
cat ./-file07
```

**Explanation:**

* Another file with a leading hyphen. Escape with `./` to avoid interpreting it as an argument.

**Password:** `4oQYVPkxZOOEOO5pTW81FB8j8lxXGUQw`

---

## Level 5 ➔ 6

**Steps:**

```bash
find inhere -type f -size 1033c ! -executable -readable
```

**Explanation:**

* Search for a file with specific size, readable but not executable.
* `! -executable`: filters non-executable files.

**Password:** `HWasnPhtq9AVKe0dmk45nxy20cvUa6EG`

---

## Level 6 ➔ 7

**Steps:**

```bash
cd ..
cd ..
find / -user bandit7 -group bandit6 -size 33c 2>/dev/null
```

**Explanation:**

* Search system-wide for files owned by `bandit7` and group `bandit6`, of size 33 bytes.
* Suppress errors with `2>/dev/null`.

**Password:** `morbNTDkSW6jIlUc0ymOdMaLnOlFVAaj`

---

## Level 7 ➔ 8

**Steps (Approach 1):**

```bash
grep -r millionth .
```

**Explanation:**

* Recursively search for the string "millionth" in the current directory.

**Password:** `dfwvzFQi4mU0wfNbFOe9RoWskMLg7eEc`

**Alternate Approach:**

```bash
sort -g data.txt | uniq -u
```

**Explanation:**

* Sort numerically and print unique value(s), likely to be the flag.

**Password:** `4CKMh1JI91bUIZZPXDqGanal4xvAg0JM`

---

## Level 8 ➔ 9

**Steps:**

```bash
strings data.txt
```

**Explanation:**

* `strings`: extract printable characters from a binary file.

**Password:** `FGUW5ilLVJrxX9kMYMmlN4MgbpfMiqey`

---

## Level 9 ➔ 10

**Steps:**

```bash
cat data.txt | base64 -d
```

**Explanation:**

* Decode base64 encoded contents of `data.txt`.

**Password:** `dtR173fZKb0RRsDFSGsg2RWnpNVj3qRr`

---

## Level 10 ➔ 11

**Steps:**

```bash
cat data.txt | tr 'A-Za-z' 'N-ZA-Mn-za-m'
```

**Explanation:**

* ROT13 cipher. `tr` command translates each character using a Caesar shift.

**Password:** `7x16WNeHIi5YkIhWsfFIqoognUTyj9Q4`

---

## Level 11 ➔ 12

**Process:**

1. Rename and reverse hex:

```bash
mv a.hec a.hex
xxd -r a.hex a.bin
```

2. Identify and decompress repeatedly:

```bash
file a.bin  # gzip
mv a.bin a.gz
gunzip a.gz
file a      # bzip2
mv a a.bz2
bunzip2 a.bz2
... (repeat through tar, gzip, bzip2...)
```

3. Final extraction reveals:

```bash
cat b
```

**Password:** `FO5dwFsc0cbaIiH0h8J2eUks2vdTDwAn`

---

## Level 13 ➔ 14

**Password:** `MU4VWeTyJk8ROof1qqmcBPaLh7lDCPvS`

(No steps shown in original log)

---

## Level 14 ➔ 15

**Steps:**

```bash
nc localhost 30000
```

**Explanation:**

* `nc` (netcat) connects to a local TCP service to read the next password.

**Password:** `8xCjnmgoKbGLhHFAZlGE5Tmu4M2tKJQo`

---

## Level 15 ➔ 16

**Steps:**

```bash
openssl s_client -connect localhost:30001
```

**Explanation:**

* Use OpenSSL to connect to a TLS-encrypted service.

**Password:** `kSkvUpMQ7lBYyCM4GBPvCvT1BfWRy0Dx`

---