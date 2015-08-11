@echo off

openssl genrsa -out rootCA.key 2048
openssl req -x509 -new -nodes -key rootCA.key -days 3650 -out rootCA.crt -subj "/C=CN/ST=Guangdong/L=Shenzhen/O=Nep/OU=Section/CN=Nep CA/emailAddress=xiaocong.hxc@alibaba-inc.com"
echo =============
echo rootCA generated at :
echo %cd%
echo =============


rem exit 0
