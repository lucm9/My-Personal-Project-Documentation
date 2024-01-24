# ANSIBLE DYNAMIC ASSIGNMENTS (INCLUDE) AND COMMUNITY ROLES
#

In this project, we introduced the concept of the use of Dynamic assignments. The major difference between static and dynamic assignments is in the use of `import and include ststements.`

Include does similar thing as Imports but differs because it is dynamic. Dynamic in the sense that ansible is able pick changes in playbooks added to a master playbook in real time. In import ansible preprocesses everything runs the playbook with the data it has. Changes made while executing the playbook is ignored.

Created a role-feature branch to implement the dynamic assignments of ansible.

![1 New_Branch](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/e3011144-0b3a-4490-a755-bae94d34b4a7)

Set up environment vars which contains variables perculiar to each environment and apply the following configuration to the env_vars.yaml file in the dynamic ssignments folder.

![2 Env_Vars](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/776dfeeb-c3da-44f6-b748-264796d4fc7f)

Using ansible galaxy, installing configuration roles for apache and nginx. This configurations have been pre-written and referenced inside our static-assignments.

![3 Ansible_Galaxy](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/3f3e7913-72c1-48c7-b1a6-e7e8f8267ff9)

Running ansible-playbook on entry-point site.yml which loops through env_vars.yaml and conditionally applies configurations based on specified variables in each environment.

![7 playbook](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/422f4c01-a7b0-405a-82c8-2f50566b30c6)

