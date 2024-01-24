
![image](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/c7f371c0-24db-4fa5-93e7-e102519d2688)

From project 7 to 10 we performed a lot of manual tasks to set up virtual servers, install and configure required software and deploy our web application. In this project we will make use of `Ansible` which is a configuration management tool which makes work easiler for Devops Engineers.

With just a click everything will be configured depending on what we'd like to be achieved. 

 ## Install Ansilbe On Jenkins Server

 We install ansible on our jenkins server from the previous project. 

 The easier way to install ansible is 

```
sudo apt update -y

sudo apt install ansible -y
```
But in order to have all the ansible configuration and packages its better to follow this link. [Ansible_Installation](https://docs.ansible.com/ansible/latest/installation_guide/installation_distros.html)

create a new repository in github called `ansible-config-mgt` and set up a webhook

`<http://<jenkins-ip-address:8080/github-webhook>`

On the jenkins-ansible server we need to create a job  `ansible` to configure automatic builds. When a commit is made to our repository/main branch the jenkins job will trigger `GITScm polling`.

![3 github_webhook](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/1ea3cdef-5475-4805-bd17-3dcf9a9c96c6)

![4 git_hub_job](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/a5f09651-ee43-4988-ada8-4e76f4fae88c)

Test the configuration and take a look at the output console. 

![5 git_hub_job_output](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/3c2ee2d1-e645-4303-82c4-f5902bbfe7d8)

verify the buils using the jenkins-ansible server  `cd /var/lib/jenkins/jobs/ansible/buils/<build-number>/archive`

## Bastion Host

COnfigure bastion host in order to ssh into the ansible server. Bastion server allows us to log onto other EC2 instances sercurely.

On windows start ssh agent by running 

```
eval 'ssh-agent -s'`

ssh-add <path-to-private-key> `.pem-key`
```

Confirm the key has been added with the command 

```ssh-add -l```

SSh into the jenkins-Ansible server using ssh-agent

```ssh -A Username@ip.address```

## Download and Install Vscode

Vscode will be used to write and edit our code. 

Install `remote development`

![2 Bastion_Host](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/91a7cbdc-0c42-4ca9-903a-14e51f061f68)

Clone `ansible-config-mgt` from github using vscode. 

- In your ansible-config-mgt GitHub repository, create a new branch that will be used for development of a new feature.
- Checkout the newly created feature branch to your local machine and start building your code and directory structure.
- Create a directory and name it playbooks – it will be used to store all your playbook files.
- Create a directory and name it inventory – it will be used to keep your hosts organised.
- Within the playbooks folder, create your first playbook, and name it common.yml
- Within the inventory folder, create an inventory file (.yml) for each environment (Development, Staging Testing and Production) dev, staging, uat, and prod respectively.

![6 Dev_Inventory](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/20d78de2-3fa6-46f3-8266-a29710538646)


## Updating our /inventory/dev.yaml

```
[nfs]
<NFS-Server-Private-IP-Address> ansible_ssh_user='ec2-user'

[webservers]
<Web-Server1-Private-IP-Address> ansible_ssh_user='ec2-user'
<Web-Server2-Private-IP-Address> ansible_ssh_user='ec2-user'

[db]
<Database-Private-IP-Address> ansible_ssh_user='ec2-user' 

[lb]
<Load-Balancer-Private-IP-Address> ansible_ssh_user='ubuntu'
```

## Creating a Common Playbook

Update code in /playbooks/common.yaml
```
 ---
- name: update web, nfs and db servers
  hosts: webservers, nfs, db
  remote_user: ec2-user
  become: yes
  become_user: root
  tasks:
    - name: ensure wireshark is at the latest version
      yum:
        name: wireshark
        state: latest

- name: update LB server
  hosts: lb
  remote_user: ubuntu
  become: yes
  become_user: root
  tasks:
    - name: Update apt repo
      apt: 
        update_cache: yes

    - name: ensure wireshark is at the latest version
      apt:
        name: wireshark
        state: latest
```

Next push code into repository and create a pull request to the main branch. Jenkins checksout the code and builds an artifact that is published on the ansible server.

## RUN FIRST ANSIBLE TEST

`ansible-playbook -i /var/lib/jenkins/jobs/ansible/builds/<build-number>/archive/inventory/dev.yml /var/lib/jenkins/jobs/ansible/builds/<build-number>/archive/playbooks/common.yml`








