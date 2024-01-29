## CI/CD PIPELINE FOR PHP BASED APPLICATION
![](CI_CD_Pipeline-1.png)

## Project Description

In this project, I will be setting up a CI/CD pipeline for PHP based application. The CI/CD process looks like the architecture above.

This project consist of two major repositories with each repository containing its own CI/CD pipeline written in a Jenkinsfile.
- **Ansible-Config** : This repository contains Jenkinsfile which is responsible for setting up and configuration infrastructure required to carry out processess required for our application to run. Using ansible roles and playbooks.

- **PHP-todo** : This repository contains Jenkinsfile which is focused on processes which are application build specific such as building, static code analysis, push to arfitact, sonarqube etc.

# Prerequisites

In this project we'll be using AWS ec2 instances/ VM. 

**Nginx Server** : This server will act as our reverse proxy to our site and tool.

**Jenkins Server** : This jenkins server wil host our CI tools. Implement our CI/CD pipeline. Using T2.medium, Security group shoud be 8080

**Sonarqube Server** : To be used for code quality analysis. Using T2.medium, Security group shoud be 9000
 
**Artifactory Server** : To be used for storing our build in a binary format. Using T2.micro, Security group shoud be 8082

**Todo Webserver** : To host our todo web app

**Database Server** : Database server for our todo application

## Environments


Ansible Inventory should look like this
```
├── ci
├── dev
├── pentest
├── pre-prod
├── prod
├── sit
└── uat
```

To automate the setup of `Sonarqube` and `Jfrog Artifactory`, we can use `ansible-galaxy` to install configuration into our ansible roles which will be used and run against the `sonarqube` and `artifactory server`

Configure Ansible For Jenkins Deployment

Create a Jenkins Server with a T2.medium specification because we need more compute power to run builds.

## Prepare The Jenkins Server 

Connect to the Jenkins server using ssh via ssh and gitbash using windows. 

On gitbash using ssh-agent to connect to all the other servers.

```
eval $(ssh-agent -s)
ssh-add private-pem-key-file
```
On Gitbash use `code .` When you run  `code .` it tells Visual Studio Code to open the current directory as a project.


# Install the following packages and dependencies on the Jenkins Server

- Install git : `sudo yum install git -y`

- Clone repository: `git clone` https://github.com/lucm9/Ansible-Config.git

- Java will be needed before installing Jenkins modify with Bash_profile and reload and input Java Path

- Install jenkins and its dependencies from this link : https://www.jenkins.io/doc/book/installing/linux/

- Download and configure ansible

- Log onto jenkins Server using the `public-ip:8080`






