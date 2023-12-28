# Deploying a MEAN Stack Application on AWS Cloud

We create an aws EC2 instance, named `MEAN_Project`. This will serve as the backbone of our application deployment.

![1 Ec2_Instance_Mean](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/d1679955-71ee-4739-a8de-faf7f11bd4fb)

We then update and upgrade core dependencies on our linux backbone

```
sudo apt update -y

sudo apt upgrade -y
```

![2 Sudo_apt_update](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/86ab1ce7-6b0c-4970-b7a7-e3cc73ef0fd2)

## Applying certificates and installing nodejs
```
sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates

curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
```
![3 Certificate](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/a06afc4b-05a9-4a71-839d-20899cbfca90)

## Installing MongoDB Database

If you're using Ubuntu 22 and up then please follow this: [Mongodb](https://www.cherryservers.com/blog/install-mongodb-ubuntu-22-04). 

We then proceed to install mongodb which is a non-relational database which we will use to store our applications data.
```
- sudo apt install software-properties-common gnupg apt-transport-https ca-certificates -y
- curl -fsSL https://pgp.mongodb.com/server-7.0.asc |  sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
- sudo nano /etc/apt/sources.list.d/mongodb-org-7.0.list
- sudo apt update
- sudo apt install mongodb-org -y
```
![4 Mongo_db_Install](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/afaf2358-b849-42c0-ba57-6652adc3dc9a)

Check the following status on `MongoDB`

```
- sudo systemctl status mongod
- sudo systemctl start mongod
- sudo systemctl enable mongodb
```
![5 Mongodb_Status](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/52446b78-9aa2-439a-8d8d-160ea1f90d65)

Install nodejs and npm which is the default package manager for JavaScript's runtime Node.js.

```
sudo apt install nodejs

sudo apt install npm
```
Install body-parser
`sudo apt install body-parser`

![6 Body-Parser](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/cce93cc0-48a8-4205-b397-9166500390bb)

We create a `Books` directory and we initialize it as a npm project using `npm init`. Then create a `server.js` file and setup the server.

![7 npm_init](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/042d4c9e-780b-49a9-b420-7a9d088ae73f)

Installing express and mongoose which is a package which provides a straight-forward, schema-based solution to model your application data. We will use Mongoose to establish a schema for the database to store data of our book register.

![8 Install_Moongose](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/2a6ef4c2-35fa-41f8-8214-b9d81ab949fb)

## All The Codes Are Located In The Repo
In the books directory create a directory `apps` and create a `routes.js` file then append the code to it

Create a direcotry `models` in the boos directory and add a file `books.js` and append the code which contains the schema model

In the book directory create a `public` directory and create a `script.js` file which will contain our angular frontend code 

Create a `index.html` in the `public` directory and append the code
![10 Directory_Setup](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/32063d2b-a585-4e89-8b0a-f9042adbd9b5)

## Configure security group 

Inbound rules to allow our application to be accessible via the internet via our server port

![9 Security_Group](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/6e2bc782-aca8-4e31-8883-4154c5fe5e42)

We move into the books directory and spin up the express server using `node server.js`
![11 Node_Server_Js](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/7c892f17-0ba5-4d0d-8d9c-1fb8bb2fbbfd)

## Errors

The error message indicates that the version of `npm` you're trying to install (latest) is not compatible with your current version of `Node.js (v12.22.9)`. The required Node.js version for the installed npm version is ^18.17.0 || >=20.5.0.

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

source ~/.bashrc

nvm install 18.17.0

nvm use 18.17.0

npm update
```
![12 Npm_update](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/cd93cda2-c875-4c43-b2ac-4fa52a7fd043)

On a browser, paste the public ip address of our instance to view the site

![image](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/ed65bd43-c03a-480f-828a-d3ef14181612)


