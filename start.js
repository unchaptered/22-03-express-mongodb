import "dotenv/config";

import express from "express";

// express 인스턴스 생성
const app = express();

// 정크 데이터
const baseUsers=[
    { name: "unchaptered", age: 27 },
    { name: "kalog", age: 39 },
    { name: "dialog", age: 14 },
];
const emptyUser=[];

let users=baseUsers.slice();


app.get("/", (req,res)=>{
    return res.status(200).send({
        success: true,
        server:
        {
            message: "hello, this is first server"
        }
    });
});


// /users
// Read
app.get("/users", (req, res)=>{
    return res.status(200).send({
        success: true,
        server: { message: `${req.method} / ${req.url.substring(1)}` },
        datas: { users }
    });
})

// Create
app.post("/users", (req, res)=>{
    users = baseUsers.slice();

    return res.status(200).send({
        success: true,
        server: { message: `${req.method} / ${req.url.substring(1)}` },
        datas: { users }
    });
})

// Update
app.put("/users", (req, res)=>{
    users.forEach((value, key)=>{
        value.name=value.name + "fixed#";
        value.age=value.age + 10;
    });

    return res.status(200).send({
        success: true,
        server: { message: `${req.method} / ${req.url.substring(1)}` },
        datas: { users }
    });
})

// Delete
app.delete("/users", (req, res)=>{
    users = emptyUser;

    return res.status(200).send({
        success: true,
        server: { message: `${req.method} / ${req.url.substring(1)}` },
        datas: { users }
    });
})

// /user

// Read
app.get("/user", (req, res)=>{
    const { targetName }=req.query;

    let user = null;
    users.forEach(value => {
        if (value.name === targetName) return user = value;
    });

    return res.status(200).send({
        success: true,
        server: { message: `${req.method} / ${req.url.substring(1)}` },
        datas: { users:[ user ] }
    });
})

// Create
app.post("/user", (req, res)=>{
    const { name, age } = req.query;

    let existsUser = false;
    users.forEach(value=>{
        if (value.name === name) return existsUser = true;
    });

    const sendData = {
        success: true,
        server: { message: `${req.method} / ${req.url.substring(1)}` },
        users: []
    };

    let user = null;
    if (existsUser) {
        sendData.success = false;
    } else {
        user = { name, age };
        users.push(user)
    }
    sendData.users = [ user ];

    res.send(sendData);
})

// Update
app.put("/user", (req, res)=>{
    const { targetName, name, age } = req.query;

    let existsUser = false;
    let existsUserIndex = null;

    users.forEach((value, key) => {
        if (value.name === targetName) {
            existsUser = true
            return existsUserIndex = key;
        };
    });

    const sendData = {
        success: true,
        server: { message: `${req.method} / ${req.url.substring(1)}` },
        users: []
    };


    if (!existsUser) {
        sendData.success = false;
    } else {
        users[existsUserIndex] = { name, age };
        sendData.users = users[existsUserIndex];
    }

    res.send(sendData);
})

// Delete
app.delete("/user", (req, res)=>{
    const { targetName } = req.query;

    let existsUser = false;

    let userReplacer = [];
    users.forEach(value => {
        if (value.name !== targetName) {
            userReplacer.push(value);
        } else {
            // 대상을 찾았을 경우
            existsUser = true;
        }
    });

    users = userReplacer

    const sendData = {
        success: true,
        server: { message: `${req.method} / ${req.url.substring(1)}` },
        users: []
    };


    if (existsUser) {
        // 삭제 성공
        sendData.success = true;
    } else {
        // 삭제 실패
        sendData.success = false;
    }

    console.log(users);

    res.send(sendData);
})

// Reset Junk Datas
app.post("/reset", (req, res)=>{
    const { resetToken }=req.query;

    const sendData = {
        success: true,
        server: { message: `${req.method} / ${req.url.substring(1)}` },
        users: []
    };

    if (token === process.env.RESET_JUNK_TOKEN) {
        users = baseUsers.slice();

        sendData.users = users;
        return res.send(sendData);
    } else {
        sendData.success = false;

        sendData.users = users;
        return res.send(sendData);
    }
})
// express 인스턴스 실행
app.listen(process.env.TCP_PORT, ()=>console.log(`Server is running on TCP/IP PORT`));