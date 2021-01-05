import Navbar from '../../navbar/Navbar'
import NoteContainer from '../../note_container/NoteContainer'
import "./Home.css";

const Home = () => {
  const isLogin = sessionStorage.getItem("isLogin");

  if (isLogin) {
    return (
      <>
      <Navbar />
      <main className="home">
        <h1>Wellcome Home..</h1>

        <NoteContainer />
      </main>
      </>
    );
  } else {
    window.location.href = "/login";
  }
};

export default Home;
