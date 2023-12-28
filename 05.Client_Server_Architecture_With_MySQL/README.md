# CLIENT-SERVER ARCHITECTURE WITH MYSQL

Client-Server refers to an architecture in which two or more computers are connected together over a network to send and receive requests between one another.

In their communication, each machine has its own role: the machine sending requests is usually referred as "Client" and the machine responding (serving) is called "Server".


![1 Diagram](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/0989cabb-47ec-49ea-93a1-b9c48925054e)

## Ec2 Instance creation

We get started by setting up two ubuntu instances. Nmae one instane Mysql-Server and the other Mysql-Client

![2 Ec2_Instances](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/de693bf4-f9c0-468f-ac5c-485e0833a48b)

On mysql-server machine install MySQL Server Software.

![3 Mysql_Installation](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/c0b2752b-203f-4785-b35e-043ab2cf6bc6)

On mysql client install MYsql `Client` software.

![4 Mysql_Client](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/7c7abef7-ad9e-4a40-a747-7da117ab26b3)

## Security Group

Open inbound rule on Mysql Server to allow for connection. Both server can communicate using private IPs since they belong in the same subnet.  

![5 Security_Groups](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/c9ad21db-d8df-460d-b94d-ebf663d676a7)

run the following command on the client server to get the private ip. `ip addr show` - This Ip address will be specified when adding to the inbound rule. 

Change the bind-address on Mysql-Server to allow for connection fron any IP address. Set bind-address to `0.0.0.0` using the command below : `sudo vi /etc/mysql/mysql.conf.d/mysql.cnf`

upon changing the bind-address reload mysql services `sudo systemctl restart mysql`

Configure MySql Server password and create a database and user 

- mysql_secure_installatioin to set up the password configuration
- create a databbase
- Create user
- Grant permissions to the user

![7 MySQL-Setup](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/11ae6157-d76e-4c2d-b472-70d6523575e9)

From the client server lets connect to the mysql server without using ssh. We must use mysql utility.

![8 Connect_to_mysql](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/3134e0cc-74bc-475d-9664-2b50087640b1)

# Done.



