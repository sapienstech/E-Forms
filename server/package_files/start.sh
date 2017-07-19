cd server 
nohup node bundle.js $1 > out.log 2>&1 & echo $! > ../demc.pid
echo "Started pid $(cat ../demc.pid)"
