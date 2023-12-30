
# Implementing Wordpress Web Solution

## Step-1 Prepare Web Server

- Create an Ec2 Instance server using AWS Provider
- Under **EBS**: Elastic Block Store create 3 storage volumes and `attach` to the Instance. This will serve as an additional external storage for our EC2 Instance.
- The EBS should be under the same availability zone.

![1 Ec2_Project6](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/d5639ba8-fd8c-4080-b9d6-b16082ee2ccd)

![12 EBS_Volume](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/6f844661-de18-4596-8e0b-c385478b121b)

- Log into EC2 instance via SSH, view the additional disk that have been attached to the instance by running `lsblk` command.
  
  ![Uploading 2.Show_Of_Device.png…]()

To see all the mounts and free space on the server run `df -h` 

![13 List_free_space](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/de02a373-ce32-4ee0-a209-f0d1e9c2c126)

- Create partitions on each EBS volume on the server using `gdisk`

![3 LVM_Set_Up](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/1fcdebb6-93b8-4f50-abb4-7e464661bf9c)
