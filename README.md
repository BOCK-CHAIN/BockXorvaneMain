
# Xorvane home

## Getting Started

### Deploying Locally

#### 1. Clone the Repository

```bash
git clone repo_link
cd dir*
```

#### 2. Creaate a .env file

```bash
NEXT_PUBLIC_WEBBUILD_MONTHLY=59.99 # whatever s given in the webbuild's .env
NEXT_PUBLIC_WEBBUILD_YEARLY=599.88
NEXT_PUBLIC_WORKMAN_MONTHLY=59.99
NEXT_PUBLIC_WORKMAN_YEARLY=599.88

NEXT_PUBLIC_WEBBUILD_URL= # domain name preferrably ( ip address can also be used )
NEXT_PUBLIC_WORKMAN_URL=

#AWS, this is mostly for profile page
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
AWS_DEFAULT_REGION=

# authentication -> aws cognito
NEXT_PUBLIC_USER_POOL_ID=
NEXT_PUBLIC_USER_POOL_CLIENT_ID=

NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL=
NEXT_PUBLIC_S3_UPLOAD_URL= # the url provided in s3

NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
```

#### 3. 
```bash
npm install
npm run dev
```

#### 4. Check errors for production
```bash 
npm run build
```

#### 5.  ``` npm run start ```

### Deploying in Production

### Configure nginx : 

#### 1. Install nginx
```bash
sudo apt update
sudo apt install nginx -y
```

#### 2. 
```bash
sudo nano /etc/nginx/sites-available/krsyonix
```

#### 3.
```bash
server {
  listen 80;
  server_name yourdomain.com; # add the domain name or the ip address if not applicable.

  location / {
    proxy_pass http://localhost:3000; # since the app is running on 3000
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

#### 4.
```bash
sudo ln -s /etc/nginx/sites-available/krsyonix /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Same steps as development till step 4 ( skip ```npm run dev``` )

### Make sure you change the localhost to the actual domain name

```bash
npm i -g pm2
pm2 start "npm run start" --name krysonix
pm2 save
pm2 logs # check the logs
```
