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



