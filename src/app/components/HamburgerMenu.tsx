
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
/* Icon 1 */
/** {bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 ...
 * transition-property: transform, translate, scale, rotate;
transition-timing-function: var(--default-transition-timing-function);
 cubic-bezier(0.4, 0, 0.2, 1) 
transition-duration: var(--default-transition-duration); /* 150ms 
    margin: 0;
    padding: 0;
}
#nav - icon1{
    width: 60px;
    height: 45px;
    position: relative;
    margin: 50px auto;
    -webkit - transform: rotate(0deg);
    -moz - transform: rotate(0deg);
    -o - transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit - transition: .5s ease -in -out;
    -moz - transition: .5s ease -in -out;
    -o - transition: .5s ease -in -out;
    transition: .5s ease -in -out;
    cursor: pointer;
}

#nav - icon1 span, {
    display: block;
    position: absolute;
    height: 9px;
    width: 100 %;
    background: #d3531a;
    border - radius: 9px;
    opacity: 1;
    left: 0;
    -webkit - transform: rotate(0deg);
    -moz - transform: rotate(0deg);
    -o - transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit - transition: .25s ease -in -out;
    -moz - transition: .25s ease -in -out;
    -o - transition: .25s ease -in -out;
    transition: .25s ease -in -out;
}

#nav - icon1 span: nth - child(1) {
    top: 0px;
}

#nav - icon1 span: nth - child(2) {
    top: 18px;
}

#nav - icon1 span: nth - child(3) {
    top: 36px;
}

#nav - icon1.open span: nth - child(1) {
    top: 18px;
    -webkit - transform: rotate(135deg);
    -moz - transform: rotate(135deg);
    -o - transform: rotate(135deg);
    transform: rotate(135deg);
}

#nav - icon1.open span: nth - child(2) {
    opacity: 0;
    left: -60px;
}

#nav - icon1.open span: nth - child(3) {
    top: 18px;
    -webkit - transform: rotate(-135deg);
    -moz - transform: rotate(-135deg);
    -o - transform: rotate(-135deg);
    transform: rotate(-135deg);
}
$(document).ready(function(){
    $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
        $(this).toggleClass('open');
    });
});*/