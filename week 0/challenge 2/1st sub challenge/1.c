#include <stdio.h>
#include <stdlib.h>

int main() {
    int i=rand();
    int b=rand();
    if(i==b)
        printf("Dead");
    else
        printf("Not dead");
}