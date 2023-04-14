import { Fragment } from "react";
import Header from "../Components/layout/Header";
const RootLayout=(props)=>{
  return (
    <Fragment>
    <Header/>
    {props.children}
    </Fragment>
  );

}
export default RootLayout;