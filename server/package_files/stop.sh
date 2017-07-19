pid=$(cat demc.pid)
kill $pid
rm demc.pid
echo "Process $pid killed"

