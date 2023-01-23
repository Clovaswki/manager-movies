import { HomePage, IHomePage } from "./HomePageContext";
import { useContext } from 'react'

const UseHomePage = (): IHomePage => {

    var context = useContext(HomePage) as IHomePage

    return context

}

export default UseHomePage