import { useEffect } from "react"

const useSetTitle = title => {
    useEffect(() => {
        document.title = `${title} - The World's Leading Watch Market`
    }, [title])
}

export default useSetTitle