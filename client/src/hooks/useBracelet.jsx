import { getBracelet } from "@/apis/controllers/braceletController.js"
import { useEffect, useState, useMemo } from "react"

let cacheBracelet = null

export default function useBracelet() {
    const [bracelet, setBracelet] = useState(cacheBracelet || [])
    const [loading, setLoading] = useState(!cacheBracelet)

    useEffect(() => {
        if (!cacheBracelet) {
            fetchBracelet()
        }
    }, [])

    const fetchBracelet = async () => {
        try {
            setLoading(true)
            const res = await getBracelet()
            cacheBracelet = res?.data?.bracelets || []
            setBracelet(res?.data?.bracelets || [])
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const memoizedBracelet = useMemo(() => bracelet, [bracelet])

    return { bracelet: memoizedBracelet, refetchBracelet: fetchBracelet, loading }
}
