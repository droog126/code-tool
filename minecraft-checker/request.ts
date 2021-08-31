import { request as https_request } from 'https';
import {request as http_request } from 'http';



function request(url: string, method: string, header: object = {}, content: string = '', https?: boolean): Promise<object>{
    return new Promise((rsv, rjc) => {
        if (https) {
            var req=https_request(url, { method: method }, (res) => {
                res.setEncoding('utf-8');
                res.on('data', (data) => {
                    try {
                        data = JSON.parse(data);
                        rsv(data);
                    } catch (error) {
                        console.log(data)
                        console.log(error);
                    } 
                })
                
            })
            
            req.write(content);
            req.end();
        } else {
            var req=http_request(url, { method: method }, (res) => {
                res.setEncoding('utf-8');
                res.on('data', (data) => {
                    data = JSON.parse(data);

                    rsv(data);
                })
                
            })
            
            req.write(content);
            req.end();
        }
    })

}

export default request;