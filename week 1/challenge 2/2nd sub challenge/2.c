#include<stdio.h>

int main(void)
{
    int n;
    scanf("%d",&n);
    int a[n];
    for(int x=0;x<n;x++)
        scanf("%d",&a[x]);
    for(int x=0;x<n;x++)
    {
        for(int y=0;y<n;y++)
        {
            if(a[x]>a[y])
            {
                int t=a[x];
                a[x]=a[y];
                a[y]=t;
            }
        }
    }
    return 0;
}