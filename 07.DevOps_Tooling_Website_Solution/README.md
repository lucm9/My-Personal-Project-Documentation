# WEBSITE SOLUTION

In previous project Word Press Web Solution I implemented a WordPress based solution that is ready to be filled with content and can be used as a full fledged website or blog. Moving further I will add some more value to my solution so that a member of a DevOps team could utilize.

In this project I will be introducing the concept of file sharing for multiple servers to share the same web content and also a database for storing data related to the website.

## Architectural Design

![16 Web_Architecture](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/d5c38a29-1afa-4494-997d-2dc15e415359)

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

Next we configure NFS to interact with clients present in the same subnet.

We can find the subnet ID and CIDR in the Networking tab of our instances

![17 subnet](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/221de3d6-fc96-4700-bfd4-c2dd2ce3b13c)

```
sudo vi /etc/exports
On the vim editor add the lines as seen in the image below
sudo exportfs -arv
```
![13 NFS_Link_to_other_webserver](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/2fea85c3-1073-4e94-aeed-a4e351663cda)

To check what port is used by NFS so we can open it in security group

The following ports are to be open on the NFS server
![14 Security_Group](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/d26a619e-42ee-43a0-88de-bd2f2e1a8997)





