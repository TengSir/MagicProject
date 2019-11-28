package com.oracle.magic;

public class Demo
{
    public static void main(String[] args)
    {
        int[] arr = {21,56,88,195,354,1,35,12,6,7};

        lsd_RadixSort(arr,3);

        for(int i=0;i< arr.length;i++)
        {
            System.out.print(arr[i]+"  ");
        }
    }

    public static void lsd_RadixSort(int[] arr,int max)
    {
        int[] count = new int[arr.length];
        int[] bucket = new int[arr.length];

        for(int k=1;k<=max;k++)
        {
            for(int i=0;i<arr.length;i++)
            {
                count[i] = 0;
            }

            for(int i=0;i<arr.length;i++)
            {
                count[getFigure(arr[i],k)]++;
            }
            for(int i=1;i<arr.length;i++)
            {
                count[i] = count[i] + count[i-1];
            }
            for(int i=arr.length-1;i>=0;i--)
            {
                int j = getFigure(arr[i],k);
                bucket[count[j]-1] = arr[i];
                count[j]--;
            }

            for(int i=0,j=0;i<arr.length;i++,j++)
            {
                arr[i] = bucket[j];
            }

        }
    }

    public static int getFigure(int i,int k)
    {
        int[] a = {1,10,100};
        return (i/a[k-1])%10;
    }
}