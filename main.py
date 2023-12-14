#Author: Nicholai Thomas
#Date: April 19, 2023
#Description: Worksheet 12&13 Question 4

IDnumber = []

Tution = []

Status = []

count = 0

i = 0

tsum = 0

tB =0

tT = 0


 

while(i==0):

    c=0

    idno = int(input("\nEnter ID number, and 0 to exit.\n"))

    if(idno!=0):

        if idno>0:

            for j in range(0, len(IDnumber)):

                if(idno==IDnumber[j]):

                    c=1

            if c==0:

                IDnumber.append(idno)

                t = int(input("\nEnter tution amount.\n"))

                if t>0:

                    Tution.append(t)

                    tsum = tsum + t

                    s = input("\nEnter B for boarding or T for travelling.\n")

                    if s=='B' or s=='T' or s=='b' or s=='t':

                        Status.append(s)

                        if s=='B' or s=='b':

                            tB = tB + 1

                        else:

                            tT = tT + 1

                    else:

                        print("\nWrong Entry, please start over again.\n")

                        IDnumber.pop()

                        Tution.pop()

                        tsum = tsum - t

                        continue

                else:

                    print("\nTution amount cannot be negative or zero, please start over again.\n")

                    IDnumber.pop()

                    continue

                count = count + 1

                if(count==50):

                    print("\nLists are full.\n")

                    i = 1

            else:

                print("\nID number already exists, please start over again.\n")

                IDnumber.pop()

                continue

        else:

            print("\nID number cannot be negative. Please start over again\n")

            IDnumber.pop()

            continue

    

    else:

        i=1

        print("\nYou entered 0. Input is stopped.\n")


 

print("\nTotal Students: ",count)

print("\nTotal Boarding Students: ", tB)

print("\nTotal Travelling Students: ", tT)

print ("\nTotal Tution Collected: ", tsum)