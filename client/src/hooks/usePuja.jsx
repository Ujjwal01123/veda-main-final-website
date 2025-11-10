import { getPuja } from "@/apis/controllers/pujaController"
import { useEffect, useState, useMemo } from "react"

let cachedPuja = null

export default function usePuja() {
    const [puja, setPuja] = useState(cachedPuja || [])
    const [loading, setLoading] = useState(!cachedPuja)

    useEffect(() => {
        if (!cachedPuja) {
            fetchPuja()
        }
    }, [])

    const fetchPuja = async () => {
        try {
            setLoading(true)
            const res = await getPuja()
            setPuja(res)
        } catch (error) {
            console.error("Error fetching puja:", error)
        } finally {
            setLoading(false)
        }
    }

    const memoizedPuja = useMemo(() => puja, [puja])

    return { puja: memoizedPuja, refetchPuja: fetchPuja, loading }
}
