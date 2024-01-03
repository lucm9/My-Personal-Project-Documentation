# Introduction

Jenkins is an open-source Continuous Integration server written in Java for orchestrating a chain of actions to achieve the Continuous Integration process in an automated fashion. Jenkins supports the complete development life cycle of software from building, testing, documenting the software, deploying, and other stages of the software development life cycle.

## Jenkins Web Architecture For CI Builds

![7 Jenkins_architecture_diagram](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/438c9ef3-0318-4b2c-9780-b1dba4adfaac)

## Installing Jenkins Server
Spun up a web server on AWS cloud and SSH into it.

Installing JDK which is an important Java based package required for Jenkins to run.
```
sudo apt update
sudo apt install default-jdk-headless
```

```
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > \
    /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt-get install jenkins

sudo systemctl enable jenkins
sudo systemctl start jenkins
sudo systemctl status jenkins
```
![1 Jenkins_Status](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/86d27f9f-a96e-4c47-b090-09896f9ebb6b)

## Security group

Since Jenkins runs on default port 8080, open this port on the Security Group inbound rule of the jenkins server on AWS
![10 Jenkins_SG](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/8f442057-9912-4447-aae5-c6132baed374)

Jenkins is up and running, copy and paste jenkins server public ip address appended with port 8080 on a web server to gain access to the interactive console. <jenkins_server_public_ip_address>:8080

The admin password can be found in the '/var/lib/jenkins/secrets/initialAdminPassword' path on the server.
![2 Jenkins_Websie](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/5373a504-d058-4c4a-b503-5c7eb2ed29f9)

![3 Jenkins_Setup](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/bd9f6099-9884-4fca-ada4-52f3673a2a30)

## Attaching WebHook to Jenkins Server
On the github repository that contains application code, create a webhook to connect to the jenkins job. To create webhook, go to the settings tab on the github repo and click on webhooks. Webhook should look like this `<public_ip_of_jenkins_server>:8080/github-webhook/`
![4 b Webhook_Setup](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/b9c15103-6586-4ae9-9df5-adb0ff088198)

## Creating Job and Configuring GIT Based Push Trigger
On the jenkins server, create a new freestyle job

![11 Freestyle_Job](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/9da01f38-938e-4fc9-9fd1-2dd30dbc8975)

In configuration of the Jenkins freestyle job choose Git repository, provide there the link to the GitHub repository and credentials (user/password) so Jenkins could access files in the repository. Also specify the branch containing code

![5 add_git_repo](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/367d084e-f785-4fb3-9c59-b0e73c6e5a8a)

## Configuring Build Triggers
Specify the particular trigger to use for triggering the job. Click "Configure" on the jenkins job and add these two configurations.

## 1. Configure triggering the job from GitHub webhook:
![12 Build_triggers](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/cf053d57-7092-40e4-a1bf-90757e323989)

## 2. Configure "Post-build Actions" to archive all the files – files resulted from a build are called "artifacts".
![13 Post_build](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/752e89fb-d8b0-49b5-ab14-bd8f7fd26ec2)

At this point, our architecture has pretty much been built, lets test it by making a change on any file on the Github repository and then push it to see the triggered job

The console output shows the created job and the successful build. In this case the code on Github was built into an artifact on our Jenkins server workspace. Find the artificat by checking the status tab of the completed job .
![6 first_build](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/bd68798b-27d8-4172-b9b0-ab3aff036602)

![14 Build_Status](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/25b68053-1266-49f6-b2bb-35d91f5b260b)

Our created artifact can be found on our local terminal too at this path /var/lib/jenkins/jobs/tooling_github/builds/<build_number>/archive/

## Configuring Jenkins To Copy Files(Artifact) to NFS Server
To achieve this, we install the Publish Via SSH pluging on Jenkins. The plugin allows one to send newly created packages to a remote server and install them, start and stop services that the build may depend on and many other use cases.

On main dashboard select "Manage Jenkins" and choose "Manage Plugins" menu item.

![15 Plugins_Setup](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/5e910e79-75b1-4998-91ac-5839e23902fe)

On "Available" tab search for "Publish Over SSH" plugin and install it plugin

![16 Publish_Over_SSH](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/735dd5a1-6149-4c25-98ba-75847f720a9e)

Configure the job to copy artifacts over to NFS server. On main dashboard select "Manage Jenkins" and choose "Configure System" menu item.

Scroll down to Publish over SSH plugin configuration section and configure it to be able to connect to the NFS server:

Provide a private key (content of .pem file that you use to connect to NFS server via SSH/Putty)
![17 a Publish_SSH](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/8e01ff00-ded8-437c-8e87-84fd34b69178)

Hostname – can be private IP address of NFS server
Username – ec2-user (since NFS server is based on EC2 with RHEL 8)
Remote directory – /mnt/apps since our Web Servers use it as a mointing point to retrieve files from the NFS server

![17 b Publish_SSH](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/72533c78-83cc-4102-acea-2dd1a3d0e37d)

Test the configuration and make sure the connection returns Success. Remember, that TCP port 22 on NFS server must be open to receive SSH connections.

We specify ** on the send build artifacts tab meaning it sends all artifact to specified destination path(NFS Server).

Now make a new change on the source code and push to github, Jenkins builds an artifact by downloading the code into its workspace based on the latest commit and via SSH it publishes the artifact into the NFS Server to update the source code.

This is seen by the change of name on the web application 
