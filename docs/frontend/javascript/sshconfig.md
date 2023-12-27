# SSH 配置说明

```bash
ssh user@hostname -p port

```
host 配置区段别名
#hostname 远程主机名
#port 远程主机端口号
#user 登录用户名
#identityFile 指定密钥认证使用的私钥文件路径
#identitiesOnly 只接受 ssh key 登录
#preferredAuthentications 强制使用 public key 验证


HostName github.com
User erichui
IdentitiesOnly yes
PreferredAuthentications publickey

