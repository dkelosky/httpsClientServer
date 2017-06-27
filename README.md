
http://ceejbot.tumblr.com/post/39969163196/using-client-certs-in-nodejs
httpceejbot.tumblr.compost39969163196using-client-certs-in-nodejs

openssl genrsa -des3 -out ca.key 4096

openssl req -new -x509 -days 365 -key ca.key -out ca.crt

==================

openssl genrsa -out server.key 1024

openssl req -new -key server.key -out server.csr

	common name -> "localhost"
	
openssl x509 -req -days 365 -in server.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out server.crt


===================


openssl genrsa -out client.key 1024

openssl x509 -req -days 365 -in client.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out client.crt