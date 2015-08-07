@echo off

openssl genrsa -out CA.key 2048
openssl req -x509 -new -nodes -key CA.key -days 3650 -out CA.crt -subj "/C=CN/ST=SH/L=SH/O=Nep/OU=Section/CN=Nep SSL Proxy/emailAddress=Nep@Nep"
echo =============
echo CA generated at :
echo %cd%
echo =============

start .

rem exit 0
