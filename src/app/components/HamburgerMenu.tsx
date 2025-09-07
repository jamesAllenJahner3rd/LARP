
type Props = {
    openMenu: boolean;
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};
const HamburgerMenu = ({ openMenu, setOpenMenu }: Props) => {



    const spanCss = "transition-all  duration-1000 ease-in-out block absolute h-[9px] w-full bg-black rounded-[9px]"
    const span1 = openMenu ? "opacity-100 top-[18px] rotate-135" : "opacity-70 top-0 rotate-0";
    const span2 = openMenu ? " opacity-0 left-[-60px]" : "opacity-70 left-0";
    const span3 = openMenu ? "opacity-100 top-[18px] -rotate-135" : "opacity-70 top-[36px] rotate-0"
    return (
        <div id="nav-icon1" className={`fixed top-0 right-0 transition delay-150 duration-50 ease-in-out w-[60px] h-[45px] my-[50px] mx-auto rotate-0 cursor-pointer  md:hidden lg:hidden `} onClick={() => setOpenMenu(toggle => !toggle)}>
            <span className={`${spanCss}  left-0 ${span1}`} ></span>
            <span className={`${spanCss} top-[18px] ${span2}`}></span>
            <span className={`${spanCss}  left-0  ${span3}`}></span>
        </div >
    )
}

export default HamburgerMenu
