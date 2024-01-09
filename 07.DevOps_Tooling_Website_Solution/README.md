# WEBSITE SOLUTION

In previous project Word Press Web Solution I implemented a WordPress based solution that is ready to be filled with content and can be used as a full fledged website or blog. Moving further I will add some more value to my solution so that a member of a DevOps team could utilize.

In this project I will be introducing the concept of file sharing for multiple servers to share the same web content and also a database for storing data related to the website.

## Architectural Design

![16 Web_Architecture](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/927a84c5-0dda-423d-b25e-3804ecabf10d)

On the diagram above we can see a common pattern where several stateless Web Servers share a common database and also access the same files using **Network File Sytem (NFS)** as a shared file storage. Even though the NFS server might be located on a completely separate hardware – for Web Servers it looks like a local file system from where they can serve the same files.

This project consists of the following servers:

- Web server(RHEL)
- Database server(Ubuntu + MySQL)
- Storage/File server(RHEL + NFS server)

## Preparing NFS Server
Create an EC2 instance (Red Hat Enterprise Linux  on AWS) on which we will setup our NFS(Network File Storage) Server.

On this server we attach 3 EBS volumes 10GB each as external storage to our instance and create 3 logical volumes on it through which we will attach mounts from our external web servers.

- 3 logical volumes lv-opt, lv-apps and lv-logs
- 3 mount directory /mnt/opt, /mnt/apps and /mnt/logs
- Webserver content will be stores in /apps, webserver logs in /logs and /opt will be used by Jenkins
  
![2 Partition](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/6a9b8298-46c1-43ac-a7aa-a4b0c97af7b9)

We to make sure our mounts remain intact when the server reboots. This is achieved by configuring the fstab directory.
`sudo vi /etc/fstab`

![12 persist_NFS_Mount](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/1ebf6c26-bc8c-454f-bd80-df4c0cf1766b)

Installing nfs-server on the nfs instance and ensures that it starts on system reboot
```
sudo yum -y update
sudo yum install nfs-utils -y
sudo systemctl start nfs-server.service
sudo systemctl enable nfs-server.service
sudo systemctl status nfs-server.service
```
![1 NFS_Install](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/37af0e46-4285-45fb-a8f0-a2dd2267ad74)

Set the mount point directory to allow read and write permissions to our webserver
```
sudo chown -R nobody: /mnt/apps
sudo chown -R nobody: /mnt/logs
sudo chown -R nobody: /mnt/opt

sudo chmod -R 777 /mnt/apps
sudo chmod -R 777 /mnt/logs
sudo chmod -R 777 /mnt/opt

sudo systemctl restart nfs-server.service
```
![11 Ownership_Modification](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/3608d419-1a70-43f4-a220-d88f70f9975e)

**Note: In this project, we will be creating our NFS-server, web-servers and database-server all in the same subnet**

Next we configure NFS to interact with clients present in the same subnet

We can find the subnet ID and CIDR in the Networking tab of our instances

![17 subnet](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/221de3d6-fc96-4700-bfd4-c2dd2ce3b13c)

```
sudo vi /etc/exports
/mnt/apps <Subnet-CIDR>(rw,sync,no_all_squash,no_root_squash)
/mnt/logs <Subnet-CIDR>(rw,sync,no_all_squash,no_root_squash)
/mnt/opt <Subnet-CIDR>(rw,sync,no_all_squash,no_root_squash)
sudo exportfs -arv
```
On the vim editor add the lines as seen in the image below

![13 NFS_Link_to_other_webserver](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/2fea85c3-1073-4e94-aeed-a4e351663cda)

In order for NFS server to be accessible from your client, we must also open following ports: TCP 111, UDP 111, UDP 2049 in the security group

The following ports are to be open on the NFS server
![14 Security_Group](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/d26a619e-42ee-43a0-88de-bd2f2e1a8997)

## Preparing Database Server
Create an Ubuntu Server on AWS which will serve as our Database. 

Install mysql-server
```
sudo apt -y update
sudo apt install -y mysql-server
```
To enter the db environment run
`sudo mysql`

- Create a database and name it tooling
- Create a database user and name it webaccess
- Grant permission to webaccess user on tooling database to do anything only from the webservers `subnet cidr`

![18 Create_Database](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/36dd9747-538f-498e-9473-e9d9e205d01a)

## Preapare web servers

Create a RHEL EC2 instance on AWS which serves as our web server. Also remember to have in it in same subnet

A couple of configurations will be done on the web servers:

- Configuring NFS client
- Deploying tooling website application
- Configure servers to work with database
  
**Installing NFS-Client**

```
sudo yum install nfs-utils nfs4-acl-tools -y
```
We will be connecting our `/var/www` directory to our webserver with the `/mnt/apps` on nfs server, and `/var/log/httpd` directory `/mnt/logs` This is acheived by mounting the NFS server directory to the webserver directory Mount /var/www/ and target the NFS server’s export for apps and logs. 

![4 Multi_exec](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/2093fd1c-54f4-4856-a02c-0784a576b238)

![19 Mount to NFS](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/c70e6aa7-9729-4e38-8138-1f7b0706ff3a)

After mount we need to persist our mount point in case of reboot under the `/etc/ directory vi into `/fstab` file -`sudo vi /etc/fstab`

add the following line `<NFS-Server-Private-IP-Address>:/mnt/apps /var/www nfs defaults 0 0`

![7 Persis_mount_point](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/277668ef-240a-4016-87bd-b2634f557ad4)

## Installing Apache and Php

```
sudo yum install httpd -y

sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm -y

sudo yum install dnf-utils http://rpms.remirepo.net/enterprise/remi-release-9.rpm -y

sudo yum module reset php -y

sudo yum module enable php:remi-8.0 -y

sudo yum install php php-opcache php-gd php-curl php-mysqlnd -y

sudo systemctl start php-fpm

sudo systemctl enable php-fpm

sudo setsebool -P httpd_execmem 1
```

Check permissions to the `/var/www/html` folder and also disable SELinux `sudo setenforce 0` To make this change permanent – open following config file `sudo vi /etc/sysconfig/selinux` and set `SELINUX=disabled` then restrt httpd.

## Run Tooling Script 

Install git - `sudo yum install git` 
`git clone from git repository` https://github.com/darey-io/tooling.git
`cp -R html/. /var/www/html/`

Once the file is in the `/var/www/html` directory which has been `/mnt/app` wit will be distributed on the rest of the servers. 

In the /var/www/html directory , edit the already written php script to connect to the database sudo vi /var/www/html/functions.php
![8 Config_php](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/27947c19-0db2-4cfb-9ae1-9c89dddd8aa5)

Run the below comand to import into the mysql database. 

![6 Run_Script](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/fcb86b4f-3ec6-45f2-a746-be9ecfb8d0dd)


![5 Import_into_mysql](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/f352bf47-73c9-439b-b03c-8f050f775175)

Run `<public_ip_address>/index.php` on a web browser to access the site. Use public_ip_address of the web server. **TCP port 80** should be open on the web broswer.

![9 website](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/f0f15d45-6a7c-4a20-9b7b-56b6a09ee121)
