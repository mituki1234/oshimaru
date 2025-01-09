import "../styles/TopBarMenu.css"

function TopBarMenu( { label, url }: { label: string, url: string }) {
    return (
        <a href={url}>{label}</a>
    )
}
export default TopBarMenu;