import logo from './assets/logo-placeholder-image.png'
import { getRandomColor } from './utils/utils'

const Header = ({color}) => {
    const style = {
        'background' : `linear-gradient(to bottom, ${color}, black)`
    }

    return (
        <header style={style}>
            <p>Flixster</p>
        </header>
    )
}

export default Header