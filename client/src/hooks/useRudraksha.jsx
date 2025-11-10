import { getRudraksha } from "@/apis/controllers/rudrakshaController"
import { useEffect, useState, useMemo } from "react"

let cachedRudraksha = null

export default function useRudraksha() {
    const [rudraksha, setRudraksha] = useState(cachedRudraksha || [])
    const [loading, setLoading] = useState(!cachedRudraksha)

    useEffect(() => {
        if (!cachedRudraksha) {
            fetchRudraksha()
        }
    }, [])

    const fetchRudraksha = async () => {
        try {
            setLoading(true)
            const res = await getRudraksha()
            cachedRudraksha = res?.data?.rudraksha || []
            setRudraksha(cachedRudraksha)
        } catch (error) {
            console.error("Error fetching rudraksha:", error)
        } finally {
            setLoading(false)
        }
    }

    const memoizedRudraksha = useMemo(() => rudraksha, [rudraksha])

    return { rudraksha: memoizedRudraksha, refetchRudraksha: fetchRudraksha, loading }
}
