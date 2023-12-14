# First Project Web stack Implementation
***

## Web stack technology implementation (LAMP stack) in AWS!

A technology stack, often referred to as a tech stack, is a combination of software tools, programming languages, frameworks, libraries, and other technologies that are used together to build a complete software solution or application. It's essentially a set of technologies that work cohesively to enable the development, deployment, and functioning of a particular software system. There are generally two main components to a technology stack: the frontend (client-side) and the backend (server-side).

## Deploying a LAMP Stack Web Application on AWS Cloud

The LAMP stack is a popular and traditional open-source web development stack used for building dynamic web applications. LAMP is an acronym representing four key components of the stack:

Together, these components form a stack that supports the development and deployment of web applications. Here's a brief overview of each component:

**Linux**:  Provides a stable and secure operating environment for the web server and other software components.

**Apache**:  Handles incoming HTTP requests, serves static and dynamic content, and can be configured to support various programming languages.

**MySQL**:  Manages the relational database, allowing applications to store and retrieve data efficiently.

**P=(Python,PHP or Perl)**:  Processes server-side logic and generates dynamic content based on user requests. It's often used in combination with MySQL to create dynamic web pages.

## Creation of EC2 Instance

First we log onto AWS Console and launch an EC2 ubuntu VM Instance. Steps to create EC2 instance will be listed below. When creating an EC2 instance remember to create .pem keypair authentication. `Download private key(*.pem)` on your local computer in order to ssh.

![image](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/d058111d-43ca-44d3-a7ef-37bb5988c70a)

## SSH

The primary purpose of SSH is to provide a secure and encrypted way to access and manage devices, servers, and networks remotely. SSH into a server on Windows using a 'PEM file'. On Windows 'cd' into the direction or location of the pem file. 
Run the below command to log into the instance via ssh:

![Screenshot 2023-12-14 121208](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/2374e412-ab4d-428b-8441-5e729a848c29)

```
ssh -i <private_keyfile.pem> username@ip-address
```
- Successful login

![image](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/cb6b8a49-d037-4de0-a36b-778565bc9178)

## Setting Up Apache Web Server

To install apache on the ubuntu server we need to ulitzie the 'apt' package manager

```
# Ensure that the local package index is up to date
$ sudo apt update

# Install apache server
$ sudo apt install apache2
```
![Screenshot 2023-12-14 123740](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/c12081ce-7ccf-4520-b07a-54ed57ee550a)

```
# To Start the apache server
$  sudo systemctl start apache2

# To verify the apache is running on our OS use the following command
$ sudo systemctl status apache2

# To Enable apache to automatically reboot upon system reboot
$ sudo systemctl enable apache2
```
![Screenshot 2023-12-14 124134](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/ec09abdf-0b06-4bfa-a17d-e40a188364b6)

Looking at the status it's green, it states the apache is active and running

## Configuring Security Groups on The EC2 Instance

A security group acts as a virtual firewall for your EC2 instances, controlling inbound and outbound traffic. It essentially defines a set of rules that determine what type of traffic is allowed to and from an EC2 instance.
- Inbound rules: traffic that are coming in
- Outbound Rules: By default, all outbound traffic is allowed from an EC2 instance. You can, however, define outbound rules to restrict the types of traffic that can leave the instance.

When the instance is created, we have a default TCP rule on port 22 opened which is useful for SSH connection to a terminal. In order to ensure that our webpage are being acccessed on the internet, we need to open a TCP port 80 inbound rule.

![Screenshot 2023-12-14 130813](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/bab5cbbb-cf48-4f26-afea-5057872c6ab9)

To check the accessiblity of our web server on the internet, we 'curl' the IP address/DNS name of our localhost. Curl is used for making requests.
```
curl http://127.0.0.1:80  or curl http://localhost:80 
```
![Screenshot 2023-12-14 131337](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/05c7e4cc-9430-427e-a6e6-dbb377c1b6f0)

the above output shows are webserver can respond to requests. Now lets connect to our webserver via the webpage.

To see if our web application server can respond to requests , use the public ip address of our instance on a web browser. http://<Public-IP-Address>:80
![Screenshot 2023-12-14 131951](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/c1d3646d-82cb-47e7-837c-5557c97d2fe6)

