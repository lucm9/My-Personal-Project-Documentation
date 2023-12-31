
# Implementing Wordpress Web Solution

## Step-1 Prepare Web Server

- Create an Ec2 Instance server using AWS Provider
- Under **EBS**: Elastic Block Store create 3 storage volumes and `attach` to the Instance. This will serve as an additional external storage for our EC2 Instance.
- The EBS should be under the same availability zone.

![1 Ec2_Project6](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/d5639ba8-fd8c-4080-b9d6-b16082ee2ccd)

![12 EBS_Volume](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/6f844661-de18-4596-8e0b-c385478b121b)

- Log into EC2 instance via SSH, view the additional disk that have been attached to the instance by running `lsblk` command. 
  
![2 Show_Of_Device](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/e6b0dbdd-7dbb-44f5-8ab7-c42ad642f7d7)

To see all the mounts and free space on the server run `df -h` 

![13 List_free_space](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/de02a373-ce32-4ee0-a209-f0d1e9c2c126)

- Create partitions on each EBS volume on the server using `gdisk`
- Follow the step using `gdisk` for the remainder 2 other volumes.

![3 LVM_Set_Up](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/1fcdebb6-93b8-4f50-abb4-7e464661bf9c)

- Use `lsblk` to view the updated partitions

![4 lsblk](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/b6951000-87fe-442f-a6ff-11e44b794260)

- install `lvm` utility in order to create logical volumes on the linux server. Run `sudo yum install lvm2`
  
![5 Sudo_Install_LVM2](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/da4bc9a5-2391-429f-8fdd-34f3d22b490d)

- To verify `LVM2` package has been installed on the server use `which lvm`
  
![6 To_verify_Installation](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/806da2b9-1501-4510-9269-a4337bd47df5)

Next step is to mark the newly created partitions as physical volumes using `sudo pvcreate /dev/<partition>` 

![7 Pv_create](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/37b07626-6298-483f-a16c-bbc2afdc902d)

- `sudo pvs` to view

![8 Sudo_Pvs](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/5d2ca173-3569-48d6-a754-88cab532b526)

- Next step is to group all the physical volumes into a volume group using `sudo vgcreate <group_name> <pv_path1> <pv_path2>`. 
- `sudo vgs` to view the newly created volume group

![9 Create_Volume_Group](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/379341e3-8734-454b-a0f9-04ff1117eadf)

- Create logical volume for the volume group `sudo lvcreate -n <lv_name> -L <lv_size> <vg_name>`. Example `sudo lvcreate -n <apps-lv> -L <14G> <webdata-vg>`
- `sudo lvs` to view logical volume.

![10 View_logical_Volume](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/2f032e11-6a6c-42f0-9ea1-d873d574b26d)

- Our logical volumes are ready to be used as filesystems for storing application and log data.
- Create filesystems for the logical volumes created. 

![11 Filesystem](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/4543d03b-92ba-446c-a715-e331c0c78ff1)

- The apache webserver uses the `HTML` folder in the `var` directory to store its web content. We create this directory and also a directory for collecting log data of our application.

![14 Apache_Content_Library](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/2208e63b-a278-4e78-a971-d9cb3453d6c5)

- For our filesystem to be used by the user we mount it on the apache directory. We mount the log filesystem to the log directory
```
sudo mount /dev/webdata-vg/apps-lv  /var/www/html/
```
- backup the log directory /var/log/. to the /home/recovery/logs before mounting. Mouting a directory that's not empty will remove everything within that directory.
- Run `sudo rsync -av /var/log/. /home/recovery/logs
  ```
  sudo mount /dev/webdata-vg/logs-lv  /var/log/
  ```
  - Restote run `sudo rsync -av /home/recovery/logs /var/log/
 
 ## Persisting Mount Points

 - To ensure that all of our mounts points are not erased after server restart we need to persist the mount point by configurating the `/etc/fstab` directory
 - `sudo blkid` 
 
    



