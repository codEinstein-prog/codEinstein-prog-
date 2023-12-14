#Author: Nicholai Thomas
#Date: April 22, 2023
#Description: Worksheet 12 & 13 Question 1-

ID_number = []
tution = []
status = []


i = int(0)
tsum = int(0)
tb = int(0)
tT = int(0)


for i in range (0,50) :
    
        student_ID = int(input("Enter ID number or 0 to exit:"))

        if (student_ID != 0) :
            ID_number.append(student_ID)
            tution_amount = int(input("Enter tution amount:"))
            tution.append(tution_amount)
            travel = input("Enter B for boarding or T for travelling:")
            status.append(travel)

            if travel == 'B' or travel == 'b' :
                tb = tb + 1

            else :
                if travel == 'B' or travel == 'b' :
                    tT = tT + 1
    
            tsum = tsum + tution_amount
            continue;


        else: 
            student_ID = 0
            print("You entered 0. Input is stopped.")

        break;


print()
print("Total Students entered:", i)
print("Total Boarding Students: ", tb)
print("Total Travelling Students: ", tT)
print ("Total Tution Collected: ", tsum)







