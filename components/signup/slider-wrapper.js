import { Fragment } from "react";
import Image from "next/image";
function SliderWrapper(props) {
    const background = props.background;
    return (
        <Fragment>
            <div className=" h-full rounded-lg bg-center bg-no-repeat bg-cover justify-center items-center bg-primary-500"  style={{ backgroundImage: `url(${background})` }}>
                {props.children}
            </div> 
        </Fragment>
    )
}
export default SliderWrapper;