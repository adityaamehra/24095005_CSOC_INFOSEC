n = int(input())
a = []
for x in range(n):
    a.append(int(input()))
for x in range(n):
    for y in range(n):
        if a[x] < a[y]:
            t = a[x]
            a[x] = a[y]
            a[y] = t
for i in range(n):
    print(a[i], end=' ')
    print()