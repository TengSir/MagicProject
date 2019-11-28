package com.oracle.magic;



import java.util.Scanner;

public class PrintStar {
	
	public static void main(String[] args)  {
		int  sn=new Scanner(System.in).nextInt();
		if(sn%2==0){
			if(sn==2|sn==0)
			{
				sn++;
			}else
			{
				sn--;
			}
		}

		int k=1;
		int x=1;
		int h=1;
		boolean  th=true;
		for (;;) {
			if(th)
			{
				int akth=(sn-1)/2-h+1;
				if(k<=akth)
				{
					System.out.print(" ");
					k++;
					continue;
				}
				int asth=(h-1)*2+1;
				if(x<=asth)
				{
					System.out.print("*");
					x++;
					continue;
				}
				System.out.println();
				k=1;
				x=1;
			}else
			{
				int akth=(h-(sn+1)/2);
				if(k<=akth)
				{
					System.out.print(" ");
					k++;
					continue;
				}
				int asth=((sn-1)/2-(h-(sn+1)/2))*2+1;
				if(x<=asth)
				{
					System.out.print("*");
					x++;
					continue;
				}
				System.out.println();
				k=1;
				x=1;
			}
			
			
				if(h==(sn+1)/2)th=false;
				if(h==sn) break;
				h++;
		}
		
	}

}