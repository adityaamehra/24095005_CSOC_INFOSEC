# CTF Write-Up: Challenge 2

---

## 📁 1. Information

* **Initial file**: `cat.jpg`
* **Technique**: Metadata analysis via `exiftool`
* **Observation**: Noticed a suspicious Base64 string in the **License** field.
* **Next step**: Hexdump to validate the complete string using `xxd`.
* **Decoded string**:

  ```
  cGljb0NURnt0aGVfbTN0YWRhdGFfMXNfbW9kaWZpZWR9
  ```
* **Decoded output using base64**:

  ```
  picoCTF{the_m3tadata_1s_modified}
  ```

![photo](https://github.com/adityaamehra/24095005_CSOC_INFOSEC/blob/main/Week%201/challenge%202/information.png)

---

## 🪆 2. Matryoshka Doll

* **Initial file**: `dolls.jpg`
* **Clue**: Name "Matryoshka" implies nested structure, like Russian nesting dolls.
* **Tool used**: `binwalk` in recursive extraction mode
* **Command**:

  ```
  binwalk -e -M dolls.jpg
  ```
* **Extracted**: Multiple layers of embedded data
* **Final artifact**: `flag.txt`
* **Flag**:

  ```
  picoCTF{bf6acf878dcbd752f4721e41b1b1b66b}
  ```
  ![photo](https://github.com/adityaamehra/24095005_CSOC_INFOSEC/blob/main/Week%201/challenge%202/Matryoshka%20doll.png)
  
---

## 3. tunn3l v1s10n

* **Issue**: File appeared unreadable and corrupted
* **Used**: `hexedit` to manually inspect and edit file headers
* **Discovered**: [A hidden reference to a BMP file format tutorial](https://www.donwalizerjr.com/understanding-bmp/)
* **Fix**:

  * Set byte at offset 0x0E to `28`
  * Set bytes at offsets 0x16 and 0x17 to `6E 04`
* **Intermediate flag**: `notaflag{sorry}`
* **Final Flag**:

  ```
  picoCTF{qu1t3_a_v13w_2020}
  ```
This is the intermediate file :-
![photo](https://raw.githubusercontent.com/adityaamehra/24095005_CSOC_INFOSEC/refs/heads/main/Week%201/challenge%202/tunn3l_v1s10n(intermediate).bmp)

The final file being:-

![photo](https://raw.githubusercontent.com/adityaamehra/24095005_CSOC_INFOSEC/refs/heads/main/Week%201/challenge%202/tunn3l_v1s10n.bmp)

---

## 💾 4. MacroHard WeakEdge

* **File type**: `.pptm` (Macro-enabled PowerPoint)
* **Identified as**: ZIP archive via `binwalk`
* **Steps**:

  * Renamed and extracted archive
  * Explored content hierarchy: `ppt/hidden`
  * Found hidden base64 encoded string
* **Decoded using**:

  ```bash
  echo "<base64_string>" | base64 -d
  ```
* **Flag**:

  ```
  picoCTF{D1d_u_kn0w_ppts_r_z1p5}
  ```
  
---

## 🔍 5. Enhance!

* **File type**: `.svg` vector graphic
* **Opened in**: Google Chrome
* **Technique**:

  * Right-click → Inspect → Navigate DOM tree
  * Text node inside the SVG reveals flag directly
* **Flag**:

  ```
  picoCTF{3nh4nc3d_d0a757bf}
  ```

![Flag in inspect element](https://github.com/adityaamehra/24095005_CSOC_INFOSEC/blob/main/Week%201/challenge%202/Enhance!.png)

---

## 🧪 6. advanced-potion-making

* **Issue**: File signature (magic bytes) of PNG corrupted
* **Fix**:

  * Used hex editor to replace invalid header with standard PNG bytes `89 50 4E 47 0D 0A 1A 0A`
  * Image opened successfully
  * Used GIMP to adjust contrast and view hidden flag
* **Flag**:

  ```
  picoCTF{w1z4rdry}
  ```

---

## 🗃️ 7. File types

* **Initial file**: Shell archive (shar)
* **Step-by-step decompression**:

  * `chmod +x a && sh a`
  * `ar x flag`
  * `cpio -ivd < flag`
  * `bunzip2 a`
  * `gzip -d a.gz`
  * `lzip -d a`
  * `lz4 -d a`
  * `lzma -d a.lzma`
  * `lzop -d a.lzop`
  * `xz -d a.xz`
* **Final output**: Hex-encoded string, decoded using `xxd -r -p`
* **Decoded flag**:

  ```
  picoCTF{f1len@m3_m@n1pul@t10n_f0r_0b2cur17y_3c79c5ba}
  ```

---

## 🖼️ 8. hideme

* **Technique**: Recursively extract embedded data from PNG
* **Command used**:

  ```
  binwalk -e -M flag.png
  ```
* **Second-layer PNG** revealed flag visually embedded in image
* **Flag**:

  ```
  picoCTF{Hiddinng_An_imag3_within_@n_ima9e_82101824}
  ```

![photo](https://github.com/adityaamehra/24095005_CSOC_INFOSEC/blob/main/Week%201/challenge%202/hideme.png)

---

## 🧠 9. MSB

* **Tool**: `sigbits.py` from GitHub
* **Concept**: Extracting most significant bits from image pixels to uncover hidden messages
* **Method**:

  * Clone repo
  * Run script on image
  * Grep through output
* **Flag**:

  ```
  picoCTF{15_y0ur_que57_qu1x071c_0r_h3r01c_3a219174}
  ```

---

## 📎 10. Extensions

* **Initial file**: `.txt`
* **Observation**: Header contained PNG magic bytes
* **Solution**:

  * Rename file extension from `.txt` to `.png`
  * Open image viewer
* **Flag**:

  ```
  picoCTF{now_you_know_about_extensions}
  ```
