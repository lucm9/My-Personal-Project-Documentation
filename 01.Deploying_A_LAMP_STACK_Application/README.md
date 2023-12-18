# First Project Web stack Implementation
***

## Web stack technology implementation (LAMP stack) in AWS!

A technology stack, often referred to as a tech stack, is a combination of software tools, programming languages, frameworks, libraries, and other technologies that are used together to build a complete software solution or application. It`s essentially a set of technologies that work cohesively to enable the development, deployment, and functioning of a particular software system. There are generally two main components to a technology stack: the frontend (client-side) and the backend (server-side).

## Deploying a LAMP Stack Web Application on AWS Cloud

The LAMP stack is a popular and traditional open-source web development stack used for building dynamic web applications. LAMP is an acronym representing four key components of the stack:

Together, these components form a stack that supports the development and deployment of web applications. Here`s a brief overview of each component:

**Linux**:  Provides a stable and secure operating environment for the web server and other software components.

**Apache**:  Handles incoming HTTP requests, serves static and dynamic content, and can be configured to support various programming languages.

**MySQL**:  Manages the relational database, allowing applications to store and retrieve data efficiently.

**P=(Python,PHP or Perl)**:  Processes server-side logic and generates dynamic content based on user requests. It`s often used in combination with MySQL to create dynamic web pages.

## Creation of EC2 Instance

First we log onto AWS Console and launch an EC2 ubuntu VM Instance. Steps to create EC2 instance will be listed below. When creating an EC2 instance remember to create .pem keypair authentication. `Download private key(*.pem)` on your local computer in order to ssh.

![1 Ec2_Creation](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/9c12e5f7-4008-4b0b-b629-1b7e471ee715)

## SSH

The primary purpose of SSH is to provide a secure and encrypted way to access and manage devices, servers, and networks remotely. SSH into a server on Windows using a `PEM file`. On Windows `cd` into the direction or location of the pem file. 
Run the below command to log into the instance via ssh:
![2 Pem_Key](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/228b4838-6228-4215-a463-692bf240d43e)

```
ssh -i <private_keyfile.pem> username@ip-address
```
- Successful login

![3 Logged_Onto_Ec2_Instance](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/465373d3-fda2-4fe8-848f-3f9ad81ac3e4)

## Setting Up Apache Web Server

To install apache on the ubuntu server we need to ulitzie the `apt` package manager

```
# Ensure that the local package index is up to date
$ sudo apt update

# Install apache server
$ sudo apt install apache2
```
![4 Apache_Installation](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/e204201b-2316-45f1-bd3b-0c3315d31bf3)

```
# To Start the apache server
$  sudo systemctl start apache2

# To verify the apache is running on our OS use the following command
$ sudo systemctl status apache2

# To Enable apache to automatically reboot upon system reboot
$ sudo systemctl enable apache2
```
![4 b Successsful_Apache_Installation](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/6659708e-e204-4f64-9888-849dccc3c880)

Looking at the status it`s green, it states the apache is active and running

## Configuring Security Groups on The EC2 Instance

A security group acts as a virtual firewall for your EC2 instances, controlling inbound and outbound traffic. It essentially defines a set of rules that determine what type of traffic is allowed to and from an EC2 instance.
- Inbound rules: traffic that are coming in
- Outbound Rules: By default, all outbound traffic is allowed from an EC2 instance. You can, however, define outbound rules to restrict the types of traffic that can leave the instance.

When the instance is created, we have a default TCP rule on port 22 opened which is useful for SSH connection to a terminal. In order to ensure that our webpage are being acccessed on the internet, we need to open a TCP port 80 inbound rule.

![5 Security_Group](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/4dbce4b0-3509-44d1-90a7-f96f96544154)

To check the accessiblity of our web server on the internet, we `curl` the IP address/DNS name of our localhost. Curl is used for making requests.
```
curl http://127.0.0.1:80  or curl http://localhost:80 
```
![6 a Checking_Inbound_rule_implementation](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/5fbb67e8-dedf-42d5-8901-dc9b5ce33dd5)

the above output shows are webserver can respond to requests. Now lets connect to our webserver via the webpage.

To see if our web application server can respond to requests , use the public ip address of our instance on a web browser. http://<Public-IP-Address>:80

![6 b checking_rules_config](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/b056a7ba-0b16-4be8-9659-cd838e72ed6a)

## Installing MySQL
MySQL is an open-source relational database management system (RDBMS) that is widely used for building and managing databases. We use mysql to store and retreive data on our site. 

install mysql using `sudo apt install mysql-server` command

![7 Mysql_installation](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/c232b253-c142-4335-b86d-e9dc2cb394e3)

Run the `$ sudo mysql_secure_installation` command after the installation. It is used to enhance the security of a MySQL installation on a Linux system.

![8 mysql_secure_config](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/96c0efde-6e71-4ff7-a6cb-2c64e002c2d2)

Upon successful installation and configuration use `sudo mysql` to enter the mysql to start the mysqld command-line and interact with the database.

![9 Sql_logging](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/8199a25b-a545-4c79-a931-883d17dfa424)

## Installing PHP and it`s modules 

PHP, originally known as `Personal Home Page` is a server-side scripting language widely used for web development. PHP is what will process the code to display dynamic content to end user.

We need to install php alongside its modules, `php-mysql` which is php module that allows php to communicate with the mysql database, `libapache2-mod-php` which ensures that the apache web server handles the php contents properly.
```
$ sudo apt install php php-mysql libapache2-mod-php
```
![10 Installing_php_modules](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/20e53253-b1d4-4354-8f87-aea0213249d1)

```
#After installing, you`ll again need to restart Apache
$ sudo service apache2 restart

#Verify PHP
$ php -v
```
![11 Checking_php_version](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/f44c59b6-91e0-430a-ab40-920b4c075ef2)

## Creating A Virtual Host For Your Website Using Apache
Apache is a web server but it actually need informtion to serve the website that information is what we load into the virtual host. 

Configuring Apache virtual hosts allows you to host multiple websites or applications on a single server, each with its own domain or subdomain. Virtual hosts enable you to partition and manage your web server efficiently. 

![11 b Apache_Virtual_host](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/0b6c3e58-3d23-441e-b667-dfbb3de46d74)

## Creating a web domain for our server 

Apache webserver serves a website by the way of server blocks inside its /var/www/ directory, and it can support multiple of this server blocks to host other websites.

We need to create our own server block under the `/var/www` directory with the following command `sudo mkdir /var/www/projectlamp`

![12 Creating_projectlamp_dir](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/0a5eafdf-dee1-40d5-9dd5-3840423d3306)

after creating we need to change ownership/permission on the newly created direction to the current system user `sudo chown -R $USER:$USER /var/www/projectlamp`

![13 Changing_projectlamp_permissions](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/ffc0d191-8f3f-4406-82e0-561007e6bf10)

The projectlamp directory represents the directory which will contains files related to our website as it represents a new server block on the apache webserver. In order to spin up this server block we need to configure it by creating a `.conf` file.

`sudo vi /etc/apache2/sites-available/projectlamp.conf`
```
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName projectlamp
    DocumentRoot /var/www/projectlamp

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```
![14 Projectlamp_Config](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/6bc29706-f4be-44bb-95e4-d201f2bc0445)

Run esc `:wq`  to save and terminate vi editor.

Run `sudo a2ensite projectlamp` to activate the server block.

Run `sudo a2dissite 000-default` to deactivate the default webserver block that comes with apache on default.

Run `sudo apache2ctl configtest` To make sure your configuration file doesn’t contain syntax errors, run.

Reload the apache2 server `sudo systemctl reload apache2` 

![15 Configured_projectlamp_via_virtualhost](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/fbdc0a3b-e53f-44a6-a9b4-454f139e4d7c)

Create an `index.html` file inside the `/var/www/projectlamp` since Your new website is now active, but the web root `/var/www/projectlamp` is still empty
```
HOSTNAME=$(curl -s http://169.254.169.254/latest/meta-data/public-hostname)
echo "Hello LAMP from hostname $HOSTNAME with public IP $(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)" > /var/www/projectlamp/index.html
```
Go to the broswer and open the webpage http://<public_ip_address>:80

![16 Testing_deployment](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/37069f9a-e663-4316-a5b3-bdb1f81b042a)

## STEP 5 — ENABLE PHP ON THE WEBSITE

By default, the webserver has a preference for serving an index.html file based on the order of precedence by default in the DirectoryIndex settings of Apache.
To serve an `index.php` containing the server-side code, you’ll need to edit the `sudo vi /etc/apache2/mods-enabled/dir.conf` file and change the order in which the index.php file is listed within the DirectoryIndex.

```
<IfModule mod_dir.c>
        #Change this:
        #DirectoryIndex index.html index.cgi index.pl index.php index.xhtml index.htm
        #To this:
        DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm
</IfModule>
```
Now we have the ext `.php` comes first in the order 

![17 Config_directivemod](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/de930230-095a-4bb0-8702-6a33b592cf06)

After saving and closing the file, you will need to reload Apache so the changes take effect:
`sudo systemctl reload apache2`

Run `sudo vi /var/www/projectlamp/index.php` 

This will open a blank file. Add the following text, which is valid PHP code, inside the file:

`<?php
phpinfo();`

When you are finished, save and close the file, Input the instance public ip address on a web browser and you will see a page similar to this:
![18 Php_success](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/91d562cb-56a4-458a-9b82-0219f77e8a1c)















































