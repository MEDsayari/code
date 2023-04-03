import style from "./styles.module.css";
import {FcHome} from "react-icons/fc";
import {IoLogOutSharp} from "react-icons/io5";
import {TbClipboardPlus}from "react-icons/tb";
import {TbClipboardCheck} from "react-icons/tb";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<>
		  <div className={style.main_container}>
			<nav className={style.navbar}>
			  <h1><FcHome />Main</h1>
			  <button className={style.white_btn} onClick={handleLogout}>
				<IoLogOutSharp />Logout
			  </button>
			</nav>
		  </div>
		  <div>
		  <button className={style.green_btn} onClick={handleLogout}>
			 <TbClipboardCheck/>Mes Formulaire
			</button>
			<br/>
			<button className={style.marron_btn} onClick={handleLogout}>
		    <TbClipboardPlus/>Crée Formulaire
		
			</button>
		  </div>
		</>
	  );
	}
	

export default Main;