# Deploying a LEMP Stack Application On AWS Cloud

A LEMP stack is a software stack typically used for web development. LEMP stands for Linux, Nginx (pronounced "engine-x"), MySQL (or MariaDB), and PHP. Each component plays a specific role in hosting dynamic websites and applications. Here's a brief overview of each component in the LEMP stack:

**Linux**: The operating system, which is the foundation of the stack. Common Linux distributions used in LEMP stacks include Ubuntu, Debian, and CentOS.

**Nginx**: A web server and reverse proxy server. Nginx is known for its performance, scalability, and ability to handle a large number of simultaneous connections. It's often used to serve static content and as a reverse proxy to forward requests to application servers (e.g., PHP-FPM).

**MySQL (or MariaDB)**: A relational database management system (RDBMS) used to store and manage data. MySQL and MariaDB are interchangeable in LEMP stacks, as MariaDB is a fork of MySQL and aims to maintain compatibility.

**PHP**: A server-side scripting language used for web development. PHP is embedded in HTML code and processed by the web server, generating dynamic content. PHP-FPM (FastCGI Process Manager) is a common implementation used with Nginx to handle PHP requests efficiently.

## Creation of EC2 Instance

First we log onto AWS Console and launch an EC2 ubuntu VM Instance. Steps to create EC2 instance will be listed below. When creating an EC2 instance remember to create .pem keypair authentication. `Download private key(*.pem)` on your local computer in order to ssh.
![1 Ec2_Instance_Creation](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/57b11502-9768-4fac-8037-d07457233508)

## SSH

The primary purpose of SSH is to provide a secure and encrypted way to access and manage devices, servers, and networks remotely. SSH into a server on Windows using a `PEM file`. On Windows `cd` into the direction or location of the pem file. 
Run the below command to log into the instance via ssh:

```
ssh -i <private_keyfile.pem> username@ip-address
```
- Successful login
![2 Ec2_login](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/3ce0e118-454f-4f27-b6c9-6259d576a739)

## Setting Up Nginx Web Server

Run `sudo apt update -y`
![3 Update_Ec2_Instance](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/c23c536a-78a9-4d36-bdea-6eb002d3ad30)

Run `sudo apt install nginx` 
![4 Install_Nginx](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/d17c3d66-24bf-4eec-9994-3fedf5426ca5)

Run `systemctl status nginx` to verify installation was successfully completed. 
![5 Checking_Nginx_Status](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/279dac95-797b-49c9-91da-f5dc8fe2fcda)

If it is green and running then installation has been completed successfully. 

## Security Group 

Before we can recieve any traffic by our Web Server, we need to open [TCP port 80](https://www.techtarget.com/searchnetworking/definition/port-number) which is default port.
![6 Security_group](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/09ad9eb8-8960-4de2-8c92-33acc93c7de6)

Verify if the security group implementation was success 
Run `curl http://localhost:80 curl http://localhost:80
or
curl http://127.0.0.1:80`
![6a  Verify_security_group](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/c5c2c9ce-7dd5-4a3d-beac-4287908e0a40)

Verify through the internet, open the web browser and try to access with the the public IP
`htttp://<Public-IP-Address>:80`
![6b Welcome_to_NGINX](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/d963abcc-f6cf-4a91-8e47-10ea26e43fd9)

This page confirms the firewalls were configured correctly

Another way to retrieve your pubic IP address run `curl ifconfig.me'
![7 Pulling_Public-IP](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/701edd60-ae0d-4e3e-8b5d-9eeebea2a5fe)

## Installing MySQL
MySQL is an open-source relational database management system (RDBMS) that is widely used for building and managing databases. We use mysql to store and retreive data on our site. 

install mysql using `sudo apt install mysql-server` command
![8 MySQL_Installation](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/824014b8-bea7-4b05-bf48-6124e5334290)

Run the `$ sudo mysql_secure_installation` command after the installation. It is used to enhance the security of a MySQL installation on a Linux system.
![9 MySQL_Secure_Installation](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/a8adaadd-2c89-407a-b4c3-9381ffc397d0)

Upon successful installation and configuration use `sudo mysql` to enter the mysql to start the mysqld command-line and interact with the database.
![10 MySQL_Login](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/b64e559d-3b27-4d05-ae22-dfde71904edb)

Install PHP





 





