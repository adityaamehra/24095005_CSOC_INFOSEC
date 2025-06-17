def atas(task):
    with open("todo.txt", "a") as f:
        f.write(task + "\n")

def vitas():
    with open("todo.txt", "r") as f:
        print(f.read())

# Example usage:
atas("Buy milk")
atas("Study for test")
vitas()
