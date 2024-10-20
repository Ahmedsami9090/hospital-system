import { useEffect, useState } from 'react'

const useWindowWidth = () => {
    const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined)

    useEffect(() => {

        function handleScreenWidth() {
            // if (screenWidth !== undefined) {
                setScreenWidth(window.innerWidth)
            // }
        }
        window.addEventListener('resize', handleScreenWidth)
        handleScreenWidth()
        return ()=> window.removeEventListener('resize', handleScreenWidth)

    }, [])
    return (
        screenWidth
    )
}
export default useWindowWidth