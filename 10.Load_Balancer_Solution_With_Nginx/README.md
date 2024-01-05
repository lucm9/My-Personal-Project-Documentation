`## LOAD BALANCER SOLUTION WITH NGINX AND SSL/TLS

Configure Nginx As A Load Balancer
Create an Nginx WebServer which will be configured as loadbalancer 

![1 Nginx_Instance](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/15fae6f5-1e9a-4c87-964b-1781a0eb3844)

Update /etc/hosts file for local DNS with Web Servers names (e.g. Web1 and Web2) and their local IP addresses just like it was done with the apache load balancer.

![4 etc_hosts](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/ccf1c353-3cd1-44ca-95f6-27a67df82e2a)

Configure Nginx as a load balancer to point traffic to the resolvable DNS names of the webservers

`sudo vi /etc/nginx/nginx.conf`
```
#insert following configuration into http section

 upstream myproject {
    server Web1 weight=5;
    server Web2 weight=5;
  }

server {
    listen 80;
    server_name www.domain.com;
    location / {
      proxy_pass http://myproject;
    }
  }

#comment out this line
#       include /etc/nginx/sites-enabled/*;
```
```
Restart Nginx and verify server status.
sudo systemctl restart nginx
sudo systemctl status nginx
```
## REGISTER A NEW DOMAIN NAME AND CONFIGURE SECURED CONNECTION USING SSL/TLS CERTIFICATES
Register a new domain name with any registrar EX `godaddy`

## Assign an Elastic IP to Nginx LB server and associated domain name with the Elastic IP.

![3 Elastic_IP](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/a7601d0b-0bd4-4ab9-9768-473ff1af0600)

- Open the Amazon EC2 console at https://console.aws.amazon.com/ec2/.
- In the navigation pane, choose Elastic IPs.
- Select the Elastic IP address to associate and choose Actions, Associate Elastic IP address.
- For Resource type, choose Instance.

For instance, choose the instance with which to associate the Elastic IP address. You can also enter text to search for a specific instance.

(Optional) For Private IP address, specify a private IP address with which to associate the Elastic IP address.

Choose Associate. 

Update A record in your registrar to point to Nginx LB using Elastic IP address

![7 Update_A_Record](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/ff3f95f1-4400-473e-8bb2-4c260c2cead3)

Configure Nginx to recognize the new domain name. This was done by Updating the /etc/nginx/nginx.conf file with

`server_name www.<your-domain-name.com>
instead of server_name www.domain.com`
![2 Script_Update](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/5472db4e-c1e6-4ced-ae69-40a962e51ae5)


## Install certbot and request for an SSL/TLS certificate for the domain name. N.B: `Make sure snapd is running on the server.
```
   sudo systemctl status snapd
   sudo apt install certbot -y
   sudo apt install python3-certbot-nginx -y
   sudo nginx -t && sudo nginx -s reload
   sudo vi /etc/nginx/nginx.conf - verify the server names 
   sudo certbot --nginx -d lucdevops.online -d www.lucdevops.online
```
![Cert_creation](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/dda4dab3-cfbc-4c08-a4bf-db0cd962930f)

## Encrypt renews every 90 days and you can renew your certificate manually by running the following command.
`sudo certbot renew --dry-run`
We can also create a cron job to do this same thing at a stipulated time.
![8 Dry_Run](https://github.com/lucm9/My-Personal-Project-Documentation/assets/96879757/b3ed69cc-7e19-4316-8f64-7e99a47a0e56)

Edit cron file
`crontab -e`
Add the following line to the crontab file
` */12 * */2 *   root /usr/bin/certbot renew > /dev/null 2>&1`
Save the crontab file

