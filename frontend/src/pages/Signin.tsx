import { Quote } from "../components/Quotes"
import { Auth } from "../components/Auth"
export const Signin = ()=>{
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <Auth type="signin"/>
        </div>
        <div className="invisible lg:visible">
            <Quote/>
        </div>
    </div>
}