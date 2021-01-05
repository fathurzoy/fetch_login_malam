import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const [same, setSame] = useState(false);

  //check apakah password sama
  useEffect(() => {
    if (inputData.password === inputData.password2) {
      setSame(true);
    } else {
      setSame(false);
    }
  }, [inputData]);

  const handleRegister = (e)=>{
    // sebuah method yang berfungsi untuk mencegah terjadinya event bawaan dari sebuah DOM, misalnya tag "a href" jika kita klik, maka halaman browser akan melakukan reload, atau sebuah form jika kita klik tombol submit maka akan melakukan reload pula.
    e.preventDefault();
    fetch('http://localhost:5000/register', {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type" : "application/json"
      },
      // body: JSON.stringify(inputData),
      body: JSON.stringify({
        email: inputData.email,
        password: inputData.password,
      })
    })
    .then(res => res.json())
    .then(data => {
      // alert(data);
      if(data.accessToken){
        alert("berhasil register");
        window.location.href = '/login'
      }else{
        alert(data);
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
    <form className="register" onSubmit={handleRegister}>
      <h1 className="register_title">register</h1>

      <label htmlFor="email">email</label>
      <input
        type="email"
        placeholder="masukan email"
        id="email"
        onChange={(e) => {
          setInputData({
            ...inputData, //copy semua property yang ada
            email: e.target.value, //edit property yang di inginkan
          });
          // console.log(inputData);
        }}
      />

      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        placeholder="masukan password"
        onChange={(e) => {
          setInputData({
            ...inputData,  //copy semua property yang ada
            password: e.target.value, //edit property yang di inginkan
          });
          // console.log(inputData);
        }}
      />

      <label htmlFor="password2">ulangi password</label>
      <input
        type="password"
        id="password2"
        placeholder="ulangi password"
        onChange={(e) => {
          setInputData({
            ...inputData, //copy semua property yang ada
            password2: e.target.value, //edit property yang di inginkan
          });
          // console.log(inputData);
        }}
      />
      {same === false ? (
        <small style={{ color: "red" }}>password harus sama</small>
      ) : null}

      {/* <button className="submit" disabled={!same} onClick={()=>{
        handleRegister()
      }}>
        signup
      </button> */}
      <button className="submit" type="submit">
        signup
      </button>
      <small>
        Already Have Account, <Link to="/login">Login Here..</Link>
      </small>
    </form>
  );
};

export default Register;
