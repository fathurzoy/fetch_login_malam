import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  //buat sebuah state penampung nilai bernama [inputData, setInputData]
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

   //buat sebuah event listener onChange pada masing masing input
  // dan store data menggunakan state setInputData()

  //buat sebuah hanldeLogin dan fetch ke api login
  const handleLogin = (e)=>{
    // sebuah method yang berfungsi untuk mencegah terjadinya event bawaan dari sebuah DOM, misalnya tag "a href" jika kita klik, maka halaman browser akan melakukan reload, atau sebuah form jika kita klik tombol submit maka akan melakukan reload pula.
    e.preventDefault();
    fetch('http://localhost:5000/login', {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(inputData),
    })
    .then(res => res.json())
    .then(data => {
      // alert(data);
      if (data.accessToken) {
        //kondisi ketika login berhasil
        alert("selamat datang bro..");

        //kita set session storage bernama isLogin
        sessionStorage.setItem("isLogin", true);

        //kita tambahkan data user yang sedang login
        sessionStorage.setItem("user", inputData.email);

        window.location.href = "/home";
      } else {
        alert("silakan check data login anda..");
      }
    })
  }

  useEffect(() => {
    //tampung nilai session storage bernama isLogin
    const isLogin = sessionStorage.getItem("isLogin");

    //apabila nilai isLogin TRUE maka kembalikan dia ke page HOME
    if (isLogin) {
      window.location.href = "/home";
    }
  }, []);


  return (
    <form className="login" onSubmit={handleLogin}>
      <h1 className="login_title">Login</h1>

      <label htmlFor="email">email</label>
      <input type="email" placeholder="masukan email" id="email" 
       onChange={(e) => {
        setInputData({
          ...inputData,
          email: e.target.value,
        });
        // console.log(inputData);
      }}/>

      <label htmlFor="password">password</label>
      <input type="password" id="password" placeholder="masukan password" 
      onChange={(e) => {
        setInputData({
          ...inputData,
          password: e.target.value,
        });
        // console.log(inputData);
      }}/>

      <button className="submit" type="submit">sign-in</button>
      <small>
        Not Have account, <Link to="/register">Register Here..</Link>
      </small>
    </form>
  );
};

export default Login;
