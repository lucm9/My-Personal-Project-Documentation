# Load-Balancing-with-Apache

In my [previous project](https://github.com/lucm9/Website_Solution_With_Wordpress) , I introduced the concept of file sharing on multiple web servers to access same shared content on an independent external NFS server.

For the website solution implemented, how can we balance users request traffic across the 3 web servers we setup 
([horizontal scaling](https://www.cloudzero.com/blog/horizontal-vs-vertical-scaling#:~:text=Horizontal%20scaling%20(aka%20scaling%20out,server%20may%20be%20your%20solution.))) so as not to put excess load on a single server whilst the others are idle. 

We implement a Load Balancing solution using apache2 so as to handle routing users request to our web servers.

(![9 3_tier_LB](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/94d01cca-3493-414f-ba5d-9d76540addee)

#

# Implementation

Create an ubuntu server which will serve as loadbalancer to the webservers, we need to open TCP port 80 in the load balancers inbound rule as requests are made through it.
![1 LB_SG](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/16b226ef-569c-4231-a4fb-9bea217d7649)

## Installing Packages
Install apache2, libxml and then configure apache for loadbalancing via enabling proxy and proxy_balancer
```
# Installing apache2
sudo apt update
sudo apt install apache2 -y
sudo apt-get install libxml2-dev
```
```
#Enable following modules:
sudo a2enmod rewrite
sudo a2enmod proxy
sudo a2enmod proxy_balancer
sudo a2enmod proxy_http
sudo a2enmod headers
sudo a2enmod lbmethod_bytraffic
```
```
#Restart apache2 service
sudo systemctl restart apache2
sudo systemctl status apache2

```
![2 systemctl_Status](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/229a6aff-5cf0-4d14-ae47-89638ddd74b1)

## Configuring Load Balancer

Edit the `default.conf` file to add the backend web servers into the loadbalancers proxy for routing.
```
sudo vi /etc/apache2/sites-available/000-default.conf

```
```
#Add this configuration into this section <VirtualHost *:80>  </VirtualHost>

<Proxy "balancer://mycluster">
               BalancerMember http://<WebServer1-Private-IP-Address>:80 loadfactor=5 timeout=1
               BalancerMember http://<WebServer2-Private-IP-Address>:80 loadfactor=5 timeout=1
               ProxySet lbmethod=bytraffic
               # ProxySet lbmethod=byrequests
        </Proxy>

        ProxyPreserveHost On
        ProxyPass / balancer://mycluster/
        ProxyPassReverse / balancer://mycluster/
```
**Note:** Only 2 servers were added to the proxy list and also other ways to route traffic aside `bytraffic` includes `byrequests, bybusyness, heartbeats` which can be specified in `ProxySet lbmethod=?` .

![3 Adding_IP](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/182438db-dec9-47ad-bf7b-c463e55e6f5e)


![10 2_Tier_Web](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/26e44e5f-1212-469a-ac1c-24ec5d1021b4)

Restart the apache2 server `sudo systemctl restart apache2`

On the web browser, test the load balancing connection using the public Ip address of our load balancer server.

![8 Website_LB](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/508f3680-610d-466c-9882-07c91f0e5509)

To confirm that traffic is routed evenly to both web servers as the load balancer server is receiving traffic (which in our case is by refreshing the webpage) we can check the logs both servers receive `sudo tail -f /var/log/httpd/access_log`

## Configuring DNS Names (Locally)

In order not to always provide webserver private ip address whenever a new web server needs to be added on the list of loadbalancer proxy, we can specify them on the hosts file and provide a domain name for each which suites us

```
sudo vi /etc/hosts
```
![4 etc_hosts](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/82900d8e-9eec-49e7-8630-8116d201996f)


To see this is play we can curl our dns name on the loadbalancer server. Since the DNS names are local DNS configuration we can only access them locally hence the loadbalancer uses them locally to target the backend web servers

Server1_Web1

![5 curl_web1](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/c87a2d6d-d09d-426c-b43f-f0930f90fa60)


Server2_Web2

![6 curl_web2](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/0d79c970-ecd1-4f3f-b4bf-5933bd45efa5)


