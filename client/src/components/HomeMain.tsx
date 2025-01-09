import HomeTopBar from "./HomeTopBar";
import HomeImage from "./HomeImage";
import "../styles/HomeMain.css"
function HomeMain() {
  return (
    <div className="main">
        <HomeTopBar />
        <HomeImage />
    </div>
  );
}
export default HomeMain;