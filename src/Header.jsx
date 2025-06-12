import logo from './assets/logo-placeholder-image.png'
import { getRandomColor } from './utils/utils'

const Header = () => {
    const style = {
        'background' : `linear-gradient(to bottom, ${getRandomColor()}, black)`
    }

    return (
        <div className="header" style={style}>
            <p>Flixster</p>
        </div>
    )
}

export default Header