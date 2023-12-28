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
Successful login
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

Another way to retrieve your pubic IP address run `curl ifconfig.me`
![7 Pulling_Public-IP](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/701edd60-ae0d-4e3e-8b5d-9eeebea2a5fe)

## Installing MySQL
MySQL is an open-source relational database management system (RDBMS) that is widely used for building and managing databases. We use mysql to store and retreive data on our site. 

install mysql using `sudo apt install mysql-server` command

![8 MySQL_Installation](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/824014b8-bea7-4b05-bf48-6124e5334290)

Run the `$ sudo mysql_secure_installation` command after the installation. It is used to enhance the security of a MySQL installation on a Linux system.

![9 MySQL_Secure_Installation](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/a8adaadd-2c89-407a-b4c3-9381ffc397d0)

Upon successful installation and configuration use `sudo mysql` to enter the mysql to start the mysqld command-line and interact with the database.

![10 MySQL_Login](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/b64e559d-3b27-4d05-ae22-dfde71904edb)

## Install PHP

You have Nginx installed to serve your content and MySQL installed to store and manage your data. Now you can install PHP to process code and generate dynamic content for the web server.

To install these 2 packages at once, run:
```
sudo apt install php-fpm php-mysql
```

![11 PHP_Installation](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/2c4feb98-75f5-4986-b976-3a656ab43318)

## Creating a Web Server Block For our Web Application
To serve our webcontent on our webserver, we create a directory for our project inside the `/var/www/ directory`.

Run `sudo mkdir /var/www/projectlemp` Then we change permissions of the projectlampstack directory to the current user system Run `sudo chown -R $USER:$USER /var/www/projectlemp`

![12 Nginx_Configuration](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/b4c7b8fe-9a93-4189-8039-b84d7a91a94e)

Creating a configuration for our server block
`sudo nano /etc/nginx/sites-available/projectlemp`

The following snippets represents the configuration required for our web server block to be functional
```
#/etc/nginx/sites-available/projectemp

server {
    listen 80;
    server_name projectlemp www.projectlemp;
    root /var/www/projectlemp;

    index index.html index.htm index.php;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
     }

    location ~ /\.ht {
        deny all;
    }

}
```
We then link the configuration file to the sites-enabled directory

`sudo ln -s /etc/nginx/sites-available/projectlemp /etc/nginx/sites-enabled`

To test our configuration for errors we run
`sudo nginx -t`

![13a Nginx_Config_Test_Error](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/6839044f-c5d3-4ab1-9269-0bc6035a8a37) 

With failure double check `/etc/nginx/sites-enabled` location remove anyfile that's not supposed to be there. 

![13b Nginx_Config_Test_Success](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/87f18247-47aa-4f66-ae20-06f52e109629)

We need to disable the default setting 

Currently our new server block has been created and configured but currently the default server block is the default block that comes with nginx install. To unlink it we `sudo unlink /etc/nginx/sites-enabled/default`.

We then reload nginx for all configurations to take effect `sudo reload nginx`.

Create an `index.html` file inside projectlemp directory `/var/www/projeectlemp` and write in contents to be accessed over the internet.
```
sudo sh -c 'echo "Hello LEMP from hostname $(curl -s ifconfig.me) with public IP $(curl -s ifconfig.me)" > /var/www/projectlemp/index.html'
```
![14  Adding content to the website](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/1e32beee-0dcc-4f62-8351-971de5cbe893)

Paste public IP address on a browser to see content. `http://<public-ip>:80`

![15 Website_Content](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/4164e5cf-68cc-4099-9d6d-8a0c268cfa52)

## Serving PHP Using Nginx

Create an `info.php` file inside the `/var/www/projectlemp` directory.

On a browser enter `http://<public-ip>/info.php`

![16 info_php](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/66e2c6c0-6e69-4369-9f09-3c2ac5259794)

## Retrieve Data From Mysql Database with PHP

We will create a "To do list" and configure access to it, so the `NGINX` Website would be able to query data from it.
```
First connect to the Mysql database 
$ `sudo mysql`

Create a new database
mysql> `Create database example_database`;

We need to create a new user with password using `mysql_native_password`
mysql> `create user 'example_user'@'%' Identified with mysql_native_password by 'password'`

We need to give the newly create user permissions to the database
mysql> `grant all on lemp_db.* to 'lemp_user'@'%';`

To exit
mysql> `exit`
```
![17 Mysql_login_executions](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/8c70a2a7-8c39-45d6-bbc6-9fda9501f035)

Test the login and password `mysql -u lemp_user -p`

![18 Mysql_login_thrugh_ubuntu](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/41f44350-1ee8-40fd-9a67-4510875e26b2)

We create a table for the current user inside the lemp_db database and specify content parameters

CREATE TABLE lemp_db.todo_list(
    item_id INT AUTO_INCREMENT,
    content VARCHAR(255),
    PRIMARY KEY (item_id)
);
Push in contents into the table INSERT INTO lemp_db.todo_list(content) VALUES ('enter contents')
![19 Inset_data_into_Mysql](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/2bd64cb0-78c5-4681-8a63-60363f27b74d)

The following PHP script connects to the MySQL database and queries for the content of the todo_list table, displays the results in a list. If there is a problem with the database connection, it will throw an exception.

Copy this content into your todo_list.php script:
```
<?php
$user = "lemp_user";
$password = "password";
$database = "lemp_db";
$table = "todo_list";

try {
  $db = new PDO("mysql:host=localhost;dbname=$database", $user, $password);
  echo "<h2>TODO</h2><ol>";
  foreach($db->query("SELECT content FROM $table") as $row) {
    echo "<li>" . $row['content'] . "</li>";
  }
  echo "</ol>";
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
```
![20 DB_Connection_PHP_Config](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/68c73b68-89a8-474c-b72c-c138ef5dde92)

![image](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/ccdf9881-ca6a-4117-b04e-2fe243c20347)










 





