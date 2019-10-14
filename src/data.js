import React, { Component } from 'react';
import axios from 'axios'
// export const data = {
//     baseurl : 'http://34.66.149.252/',
//     username:'admin1234',
//     password:'admin123'
//    }
const baseurl = "http://34.66.149.252"

// const baseurl = "http://192.168.0.101:8000"

// export function baseurl(){
//     axios.get(`http://34.66.149.252/snit/get-IpAddress/`,{
//         headers: {
//             'Content-type': 'multipart/form-data',
//             // 'Authorization': 'Token '+ this.state.token
//         }
//     })
//     .then(response => {
//         console.log("GOT IP",response.data["local meachine IP :"])
//         return `http://${response.data["local meachine IP :"]}`
//     })
//     .catch(error => {
//         console.warn("GOT IP ERROR", error.response.data)
//     });
// }

// const baseurl = this.baseurl()

export default baseurl

// export function baseurl() {
//         axios.get(`http://34.66.149.252/snit/get-IpAddress/`,{
//         headers: {
//             'Content-type': 'multipart/form-data',
//             // 'Authorization': 'Token '+ this.state.token
//         }
//     })
//     .then(response => {
//         console.log("GOT IP",response.data["local meachine IP :"])
//         return `http://${response.data["local meachine IP :"]}`
//     })
//     .catch(error => {
//         console.warn("GOT IP ERROR", error.response.data)
//     });
//  }
 
//  import * as Myfn from './test'
//  Myfn.fn1()

