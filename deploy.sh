sudo yum update -y

sudo yum install git -y
eco $(git --version)

curl -sL https://rpm.nodesource.com/setup_20.x | sudo -E bash -
sudo yum install -y nodejs
eco $(node --version)
eco $(npm --version)

git clone https://github.com/Vagner8/fractal-client.git
cd ./Fractal-client

npm i
npm install -g @angular/cli
npm run build