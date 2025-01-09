import TopBarMenu from "./TopBarMenu"
import "../styles/HomeTopBar.css"

function HomeTopBar() {
  return (
    <div className="topbar">
        <a href="/"><span>おしまる</span></a>
        <div className="topbar-right">
            <TopBarMenu label="メニュー" url="./menu" />
            <TopBarMenu label="このサイト" url="./about" />
            <TopBarMenu label="ログイン" url="./login" />
        </div>
    </div>
  );
}
export default HomeTopBar;